import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

interface Character {
  _id: string;
  name: string;
  job: string;
}

function MyApp() {
  const [characters, setCharacters] = useState<Character[]>([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person: Omit<Character, "_id">) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person: Omit<Character, "_id">) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        throw new Error("Failed to create user");
      })
      .then((newUser: Character) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index: number) {
    const character = characters[index];
    fetch(`http://localhost:8000/users/${character._id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters(characters.filter((_c, i) => i !== index));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
