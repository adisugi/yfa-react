import React from "react";
import { Modal, Button } from 'bootstrap-4-react';

export const ModalKu = () => {
    return (
        <div>
            {/* Modal */}
            <Modal id="exampleModal" fade>
                <Modal.Dialog centered>
                    <Modal.Content>
                        <Modal.Header>
                            <Modal.Title>Modal title</Modal.Title>
                            <Modal.Close>
                                <span aria-hidden="true">&times;</span>
                            </Modal.Close>
                        </Modal.Header>
                        <Modal.Body>
                            Modal body text goes here.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button secondary data-dismiss="modal">Close</Button>
                            <Button primary>Save changes</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}