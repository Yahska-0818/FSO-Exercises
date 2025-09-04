import patientData from '../data/patients';

import { nonSensitivePatientData, Patient } from '../types';

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

export default {getPatients,getNonSensitivePatients};