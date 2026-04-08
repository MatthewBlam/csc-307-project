import { useState } from "react";
import type { ChangeEvent } from "react";

interface Character {
  name: string;
  job: string;
}

interface FormProps {
  handleSubmit: (person: Character) => void;
}

function Form({ handleSubmit }: FormProps) {
  const [person, setPerson] = useState<Character>({ name: "", job: "" });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "job") setPerson({ name: person.name, job: value });
    else setPerson({ name: value, job: person.job });
  }

  function submitForm() {
    handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
