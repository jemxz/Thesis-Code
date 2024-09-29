import React, { useState } from "react";
import { Toast, Form, Button } from "react-bootstrap";
import createClassroom from "../../services/createClassroom";
import * as XLSX from "xlsx";

const NewItemToast = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    students: [],
    grades: {
      attendance: "",
      project: "",
      schoolWork: "",
      participation: "",
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      delete formData.grades;
      console.log(formData);
      await createClassroom(formData);
      onSubmit(formData); // Assuming onSubmit is needed for some other reason
      setFormData({
        name: "",
        color: "",
        students: [],
        grades: {
          attendance: "",
          project: "",
          schoolWork: "",
          participation: "",
        },
      });
      onClose(); // Close the toast after submission
    } catch (error) {
      console.error("Failed to submit the form:", error);
      // Handle error if needed
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const students = parsedData.slice(1).map((row) => ({
        name: row[0],
        dateOfBirth: row[1],
        emergencyContact: row[2],
        grades: { ...formData.grades }, // Use grades from the form state
      }));

      setFormData({ ...formData, students });
    };
    reader.readAsBinaryString(file);
  };

  const handleGradeChange = (key, value) => {
    const newGrades = { ...formData.grades, [key]: value };
    const students = formData.students.map((student) => ({
      ...student,
      grades: newGrades,
    }));
    setFormData({ ...formData, students, grades: newGrades });
  };

  return (
    <Toast show={show} onClose={onClose}>
      <Toast.Header>
        <strong className="mr-auto">New Item</strong>
      </Toast.Header>
      <Toast.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name of Class"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formColor" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload CSV</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          <Form.Group controlId="formGrades" className="mb-3">
            <Form.Label>Grades for All Students</Form.Label>
            <Form.Control
              type="number"
              placeholder="Attendance"
              value={formData.grades.attendance}
              onChange={(e) => handleGradeChange("attendance", e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Project"
              value={formData.grades.project}
              onChange={(e) => handleGradeChange("project", e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="School Work"
              value={formData.grades.schoolWork}
              onChange={(e) => handleGradeChange("schoolWork", e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Participation"
              value={formData.grades.participation}
              onChange={(e) =>
                handleGradeChange("participation", e.target.value)
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
