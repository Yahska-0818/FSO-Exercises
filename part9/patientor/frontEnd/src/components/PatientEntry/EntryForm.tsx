import { Button, TextField, Typography, Alert, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import { Patient, EntryWithoutId, HealthCheckRating, OccupationalHealthcareEntry, HospitalEntry } from "../../types";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import axios from "axios";

interface FormProps {
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";


const extractErrorMessage = (rawErrorString: string): string => {
  try {
    const jsonStartIndex = rawErrorString.indexOf('{');

    if (jsonStartIndex === -1) {
      return rawErrorString;
    }

    const jsonString = rawErrorString.substring(jsonStartIndex);
    const errorData = JSON.parse(jsonString);

    if (errorData && typeof errorData.error === 'string') {
        return errorData.error;
    }

    return rawErrorString;
  } catch (error) {
    console.error("Failed to parse error data:", error);
    return rawErrorString;
  }
};


const EntryForm = ({ setPatientData }: FormProps) => {
  const { id } = useParams<{ id: string }>();
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const resetFormFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setDischargeDate('');
    setDischargeCriteria('');
    setNotification('');
  };
  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(',').map(code => code.trim()).filter(code => code),
    };
    let newEntry: EntryWithoutId;
    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;
      case "OccupationalHealthcare":
        const occupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName,
        };
        if (sickLeaveStartDate && sickLeaveEndDate) {
            occupationalEntry.sickLeave = {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
            };
        }
        newEntry = occupationalEntry;
        break;
      case "Hospital":
        const hospitalEntry: Omit<HospitalEntry, 'id'> = {
            ...baseEntry,
            type: "Hospital",
        };
        if (dischargeDate && dischargeCriteria) {
            hospitalEntry.discharge = {
                date: dischargeDate,
                criteria: dischargeCriteria,
            };
        }
        newEntry = hospitalEntry;
        break;
      default:
        throw new Error(`Unsupported entry type: ${entryType}`);
    }
    try {
      const updatedPatientData = await patients.addEntry(id, newEntry);
      setPatientData(updatedPatientData);
      setShowForm(false);
      resetFormFields();
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          errorMessage = extractErrorMessage(error.response.data);
        } else if (error.message) {
          errorMessage = error.message;
        }
      }
      setNotification(errorMessage);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };
  const renderTypeSpecificFields = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <TextField
            label="HealthCheck Rating (0-3)"
            type="number"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
            required
            InputProps={{ inputProps: { min: 0, max: 3 } }}
          />
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              required
            />
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Sick Leave (Optional)</Typography>
            <TextField
              label="Start Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="End Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        );
      case "Hospital":
        return (
          <>
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Discharge (Optional)</Typography>
            <TextField
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        );
      default:
        return null;
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
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={onFormSubmit}>
            <FormControl fullWidth>
              <InputLabel>Entry Type</InputLabel>
              <Select
                value={entryType}
                label="Entry Type"
                onChange={({ target }) => setEntryType(target.value as EntryType)}>
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
              </Select>
            </FormControl>
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
              label="Diagnosis Codes"
              placeholder="Separate codes with commas (e.g. M24.2, S03.5)"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
            />
            {renderTypeSpecificFields()}
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