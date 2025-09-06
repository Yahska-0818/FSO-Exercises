import React, { useState } from "react";
import diaryService from "../services/diaryService";
import { Weather, type NewDiaryEntry, type NonSensitiveDiaryEntry, type Visibility } from "../types";

interface EntryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  diaryEntries: NonSensitiveDiaryEntry[]
}

const EntryForm = (props:EntryFormProps) => {
  const [date,setDate] = useState('');
  const [visibility,setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState('');

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry:NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }
    const returnedEntry = await diaryService.addEntry(newEntry);
    props.setDiaryEntries([...props.diaryEntries].concat(returnedEntry));
  }

  return (
    <form onSubmit={() =>submitEntry(event)}>
      <div>
        <label htmlFor="date">date:</label>
        <input type="text" onChange={({target}) => setDate(target.value)} />
      </div>
      <div>
        <label htmlFor="visibility">visibility:</label>
        <input type="text" onChange={({target}) => setVisibility(target.value)} />
      </div>
      <div>
        <label htmlFor="weather">weather:</label>
        <input type="text" onChange={({target}) => setWeather(target.value)} />
      </div>
      <div>
        <label htmlFor="comment">comment:</label>
        <input type="text" onChange={({target}) => setComment(target.value)} />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default EntryForm