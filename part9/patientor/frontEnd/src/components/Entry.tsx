import { EntryWithoutId } from "../types";

interface EntryProps {
  entry: EntryWithoutId;
}

const Entry = ({ entry }: EntryProps) => (
  <div>
    <p>{entry.date} <em>{entry.description}</em></p>
    <ul>
      {entry.diagnosisCodes?.map(code => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  </div>
);

export default Entry;