import './missing.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';

import notFound from '../../../assets/img/404-img.png';

const cardImages = [
    { "src": "/img/wein-logo.png", matched: false },
    { "src": "/img/logo-black.png", matched: false },
    { "src": "/img/blonde-beer.jpg", matched: false },
    { "src": "/img/burgerLechuga.jpeg", matched: false },
    { "src": "/img/botled-beer.jpg", matched: false },
    { "src": "/img/burgerXxl.jpeg", matched: false },
]

function Missing() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        if (card.id === choiceOne?.id) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)

            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }

        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="main-container row g-0 w-100">
            <div className="message-container col-lg-6">
                <h1>Oops!</h1>
                <h4>Page Not Found</h4>
                <div className='img404-container'>
                    <img src={notFound} alt='404' />
                </div>
                <div className="flexGrow">
                    <Link to="/">Visit Our Homepage</Link>
                </div>
            </div>
            <div className="game-container col-lg-6">
                <h1>Wanna play?</h1>
                <h4 className='memoria'>Memory game, find all matches.</h4>
                <div className="card-grid">
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled}
                        />
                    ))}
                </div>
                <div className='stats-container '>
                    <div className='turns-container'>
                        <h4 className='turno'>Turns: {turns}</h4>
                    </div>
                    <div>
                        <button className='btn-custom' onClick={shuffleCards}>
                            <span className='btn-custom_top'>
                                Refresh
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Missing;
