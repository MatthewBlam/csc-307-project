import { useState } from "react";
import Table from "./Table";
import Form from "./Form";

interface Character {
  name: string;
  job: string;
}

function MyApp() {
  const [characters, setCharacters] = useState<Character[]>([]);

  function removeOneCharacter(index: number) {
    const updated = characters.filter((_character, i) => i !== index);
    setCharacters(updated);
  }

  function updateList(person: Character) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
