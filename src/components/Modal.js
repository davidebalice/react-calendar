import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import classes from "./Calendar.module.css";

const ModalWindow = ({
  show,
  handleShow,
  handleClose,
  handleSubmit,
  handleDelete,
  startValue,
  setStartValue,
  titleValue,
  setTitleValue,
  modalType,
  setModalType,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ zIndex: "10000" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add event" : "Edit event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue={startValue}
                onChange={(event) => setStartValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={titleValue}
                onChange={(event) => setTitleValue(event.target.value)}
              />
              <div className={classes.buttonContainer}  style={{justifyContent:'space-between'}}>
                <Button type="submit" className={classes.buttonModal}>
                  {modalType === "add" ? "Create" : "Save"}
                </Button>
                {modalType === "edit" && (
                  <Button
                    type="button"
                    onClick={() => handleDelete(startValue)}
                    className={classes.buttonDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalWindow;
