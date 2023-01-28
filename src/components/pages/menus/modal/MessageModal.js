import React from 'react'
import { Alert, Modal } from 'react-bootstrap'

const MessageModal = ({show, setShow, error, messageToShow}) => {
    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {messageToShow && <Alert variant='success'>{messageToShow}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Modal.Body>
        </Modal>
  )
}

export default MessageModal