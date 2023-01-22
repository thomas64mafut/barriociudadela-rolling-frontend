import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './missing.css';
import Card from './Card';

import notFound from '../../../assets/img/404-img.png';

const cardImages = [
  { "src": "/img/wein-logo.png", matched: false },
  { "src": "/img/red-beer.jpg", matched: false },
  { "src": "/img/blonde-beer.jpg", matched: false },
  { "src": "/img/burgerLechuga.jpeg", matched: false },
  { "src": "/img/burgerQueso.jpeg", matched: false },
  { "src": "/img/burgerXxl.jpeg", matched: false },
]

function Missing() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    // Stop the user from being able to click the first card twice
    if(card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
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

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="main-container">
        <div className='message-container'>
            <h1>Oops!</h1>
            <h4>Page Not Found</h4>
            <div className='img404-container'>
                <img src={ notFound } alt='404'/>
            </div>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </div>
        <div className="game-container">
            <h1>Wanna play?</h1>
            <h4>Memory game, find all matches.</h4>
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
            <div className='stats-container'>
                <div className='turns-container'>
                    <h4>Turns: {turns}</h4>
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
