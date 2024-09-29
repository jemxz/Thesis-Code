import React, { useState, useEffect } from "react";
import fetchSubjects from "../../services/subject";
import { Button } from "react-bootstrap";
import NewItemToast from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./List.css"; // Import the CSS file

const List = ({ onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSubjectsFromApi = async () => {
      try {
        const response = await fetchSubjects();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubjectsFromApi();
  }, []);

  const handleButtonClick = (itemId) => {
    setSelectedItem(itemId);
    if (onSelect) {
      onSelect(itemId);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleNewItemSubmit = (formData) => {
    console.log("Form submitted:", formData);
    setShowToast(false);
  };

  return (
    <div className="sublist">
      <Button
        variant="primary"
        className="float-right mb-2"
        onClick={() => setShowToast(true)}
      >
        New Subject
      </Button>

      <ToastContainer className="toaster" />
      <NewItemToast
        show={showToast}
        onClose={handleToastClose}
        onSubmit={handleNewItemSubmit}
      />
      {data && (
        <div className="button-grid">
          {data.map((item) => (
            <Button
              key={item._id}
              variant={
                selectedItem === item._id ? "primary" : "outline-primary"
              }
              onClick={() => handleButtonClick(item._id)}
              className="toggle-button"
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
