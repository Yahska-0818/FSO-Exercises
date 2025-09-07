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

export interface Entry {
  journalText: string
};

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: string,
  occupation: string,
  entries: Entry[]
}

export type nonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type newPatient = z.infer<typeof NewPatientSchema>;