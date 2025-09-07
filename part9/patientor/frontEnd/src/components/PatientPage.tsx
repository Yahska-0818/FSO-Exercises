import { useParams } from "react-router-dom";
import patients from "../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
  const id = useParams().id;
  const [patientData, setPatientData] = useState<Patient>();
  useEffect(()=>{
    if (id) {
      patients.getOne(id).then(data=>setPatientData(data));
    }
  },[id]);
  if (patientData) {
    return (
      <div>
        <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        {patientData.name} {patientData.gender === 'male' ? <MaleIcon style={{ marginLeft: '0.2em' }}/> : <FemaleIcon style={{ marginLeft: '0.2em' }}/>}
        </Typography>
        <Typography variant="h6" style={{ marginTop: "0.5em" }}>
          ssn:{patientData.ssn}
          <br />
          occupation: {patientData.occupation}
        </Typography>
      </div>
    );
  } else {
    return (
      <h3>fetching data</h3>
    );
  }
};

export default PatientPage;