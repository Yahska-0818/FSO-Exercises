import z from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: string,
  occupation: string
}

export type nonSensitivePatientData = Omit<Patient, 'ssn'>;
export type newPatient = z.infer<typeof NewPatientSchema>;