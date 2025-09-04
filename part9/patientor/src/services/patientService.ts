import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { newPatient, nonSensitivePatientData, Patient } from '../types';

const getPatients = ():Patient[] => {
  return patientData;
};

const getNonSensitivePatients = ():nonSensitivePatientData[] => {
  return patientData.map(({ id, name, gender, dateOfBirth,occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry:newPatient):Patient => {
  const id:string = uuid();
  const newPatient = {
    id,
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {getPatients,getNonSensitivePatients,addPatient};