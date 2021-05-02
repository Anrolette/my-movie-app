import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

//function to render the title, image and description fetched from Mongo when user clicks on the resultbox view more button
export default function InfoModal(props) {
    const handleClose = () => setShow(false);

    function setShow() {
        props.hide();
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="movie-title">{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Img variant="top" src={props.image} style={{ width: "10em", marginBottom: "15px" }}></Card.Img>
                    <h3 style={{ fontSize: "1em", margin: "auto" }}>{props.description}</h3>
                </Modal.Body>
            </Modal>
        </>
    );
}
