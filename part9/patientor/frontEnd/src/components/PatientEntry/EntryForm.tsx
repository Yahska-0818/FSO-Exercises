import { Button, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { HealthCheckEntry, Patient } from "../../types";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";

interface FormProps {
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
}
const extractErrorMessage = (rawErrorString: string): string => {
  try {
    const jsonStartIndex = rawErrorString.indexOf('[');

    if (jsonStartIndex === -1) {
      return rawErrorString;
    }

    const jsonString = rawErrorString.substring(jsonStartIndex);
    const errorArray = JSON.parse(jsonString);

    if (Array.isArray(errorArray) && errorArray.length > 0 && errorArray[0].message) {
      return errorArray[0].message;
    }

    return rawErrorString;
  } catch (error) {
    console.error("Failed to parse error data:", error);
    return rawErrorString;
  }
};

const EntryForm = ({ setPatientData }: FormProps) => {
  const id = useParams().id;
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(0);
  const [codes, setCodes] = useState('');
  const [notification, setNotification] = useState('');

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: Omit<HealthCheckEntry, 'id'> = {
      description,
      date,
      specialist,
      type: "HealthCheck",
      diagnosisCodes: codes.split(",").filter(c => c),
      healthCheckRating: rating
    };

    if (id) {
      try {
        const updatedPatientData = await patients.addEntry(id, newEntry);
        setPatientData(updatedPatientData);
        setShowForm(false);
        setCodes('');
        setDate('');
        setDescription('');
        setRating(0);
        setSpecialist('');
        setNotification('');
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred.';
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data && typeof error.response.data === 'string') {
            const rawError = error.response.data;
            errorMessage = extractErrorMessage(rawError);
          } else if (error.message) {
            errorMessage = error.message;
          }
        }
        setNotification(errorMessage);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      {notification && <Alert severity="error" style={{ marginTop: "10px" }}>{notification}</Alert>}
      <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Entry'}
      </Button>
      {showForm && (
        <div style={{ border: '1px solid lightgray', borderRadius: '5px', padding: '15px', marginTop: '10px' }}>
          <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
            New HealthCheck Entry
          </Typography>
          <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={onFormSubmit}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              required
            />
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
              required
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
              required
            />
            <TextField
              label="HealthCheck Rating (0-3)"
              fullWidth
              value={rating}
              onChange={({ target }) => setRating(Number(target.value))}
              required
            />
            <TextField
              label="Diagnosis Codes"
              placeholder="Separate codes with commas"
              fullWidth
              value={codes}
              onChange={({ target }) => setCodes(target.value)}
            />
            <Button variant="contained" color="primary" style={{ marginTop: "10px" }} type="submit">
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntryForm;