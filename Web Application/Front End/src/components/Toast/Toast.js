// NewItemToast.js
import React, { useState } from "react";
import { Toast, Form, Button } from "react-bootstrap";
import createSubject from "../../services/createSubject";

const NewItemToast = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await createSubject(formData);
      onSubmit(formData); // Assuming onSubmit is needed for some other reason
      setFormData({});
      onClose(); // Close the toast after submission
    } catch (error) {
      console.error("Failed to submit the form:", error);
      // Handle error if needed
    }
  };

  return (
    <Toast show={show} onClose={onClose}>
      <Toast.Header>
        <strong className="mr-auto">New Item</strong>
      </Toast.Header>
      <Toast.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name of Subject"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name of Symbol"
              value={formData.symbol || ""}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Toast.Body>
    </Toast>
  );
};

export default NewItemToast;
