import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    !persons.some((person) => person.name === newPerson.name)
      ? (setPersons([
          ...persons,
          { name: newPerson.name, number: newPerson.number },
        ]),
        setNewPerson({ name: "", number: "" }))
      : alert(`${newPerson.name} is already added to phonebook`);
  }

  return (
    <div>
      <h2>{`Phonebook`}</h2>filter shown with
      <Filter filter={filter} setFilter={setFilter} />
      <h3>{`add a new`}</h3>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        handleSubmit={handleSubmit}
      />
      <h3>{`Numbers`}</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
}

function Filter({ filter, setFilter }) {
  return (
    <input
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
      placeholder="input name..."
    />
  );
}

function PersonForm({ newPerson, setNewPerson, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {`name:`}{" "}
        <input
          value={newPerson.name}
          onChange={(event) =>
            setNewPerson({ ...newPerson, name: event.target.value })
          }
        />
      </div>
      <div>
        {`number:`}{" "}
        <input
          value={newPerson.number}
          onChange={(event) =>
            setNewPerson({ ...newPerson, number: event.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">{`add`}</button>
      </div>
    </form>
  );
}

function Persons({ persons, filter }) {
  return persons.map((person) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase()))
      return (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      );
  });
}
