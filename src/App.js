import React from "react";
import "./App.css";
import firebase from "./firebase";
import { UserInput } from "./UserInput";

function App() {
  const [spells, setSpells] = React.useState([]); //Establishes initial state and state constructor
  const [newSpellName, setNewSpellName] = React.useState(); //Establishes state for editing database

  //RETRIEVE FIREBASE INFO (using firebase functional component)
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("spells").get();
      setSpells(
        //Loads 'Spells' DB into state
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      ); //last bit retrieves id data form snapshot.
    };
    fetchData();
  }, []);

  //Create a version of a Spell.
  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("spells").add({ name: newSpellName });
  };

  return (
    <ul>
      {/* Input for Inserting new spell records */}
      <input
        value={newSpellName}
        onChange={(e) => setNewSpellName(e.target.value)}
      />
      <button onClick={onCreate}> Create </button>
      {/* List the spell records. */}
      {spells.map((spell) => (
        <li key={spell.name}>
          <UserInput spell={spell} />
        </li>
      ))}
    </ul>
  );
}

export default App;
