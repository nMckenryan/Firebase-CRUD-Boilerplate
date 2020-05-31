import React from "react";
import firebase from "firebase";

export const UserInput = ({ spell }) => {
  //accepts user as prop,
  const [name, setName] = React.useState(spell.name);

  const onUpdate = () => {
    const db = firebase.firestore(); //declares/calls database
    db.collection("spells")
      .doc(spell.id) //doc function takes doc.id.
      .set({ ...spell, name }); //sends all data that was there before, but changes the name
  };

  const onDelete = () => {
    const db = firebase.firestore(); //declares database
    db.collection('spells').doc(spell.id).delete();
  }

  return (
    <>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Purge</button>
    </>
  );
};
