import { newPatient, Gender } from "./types";
import z from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const toNewPatient = (object: unknown): newPatient => {
  return NewPatientSchema.parse(object);
};