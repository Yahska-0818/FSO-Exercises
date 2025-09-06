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
  const [notfication, setNotification] = useState('');

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry: NewDiaryEntry = {
        date,
        visibility,
        weather,
        comment
      };
      const returnedEntry = await diaryService.addEntry(newEntry);
      props.setDiaryEntries([...props.diaryEntries].concat(returnedEntry))
      setNotification('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotification(error.response.data.slice(22));
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <h4 style={{color:"red"}}>{notfication}</h4>
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
    </div>
  )
}

export default EntryForm