import React from "react";
import Modal from "react-bootstrap/Modal";

const Info = ({
  show,
  handleClose,
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
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-5" style={{ color: "#333" }}>
            This demo use Fullcalendar React package.
            <br />
            I create a events management with modal window.
            <br />
            Click on a day or on the green button to create a
            new event.
            <br />
            Click on an event to show modal, view event information, edit or
            delete it.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Info;
