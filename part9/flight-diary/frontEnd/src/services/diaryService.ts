import axios from "axios";
import type { NonSensitiveDiaryEntry } from "../types";

const baseUrl = '/api/diaries';

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data
};

export default {getAll};