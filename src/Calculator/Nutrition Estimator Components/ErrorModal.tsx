// ErrorModal.tsx"
// Highest level component for Nutrition Estimator

import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    isError: boolean;
    onClose: any;
}

const ErrorModal = (Props: Props) => {
    return (
            <Modal show={Props.isError} onHide={Props.onClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Make sure all names and quantity fields are valid.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={Props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default ErrorModal;