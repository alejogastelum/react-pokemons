/**
 *                Pokemon names List
 * Actions to take:
 * - When start the app should load the pokemons from json file
 * - Add new pokemon names from a textfield
 * - Delete pokemon names with you click the name
 * - Validate no repeat pokemon names and display an error message
 * - The way to call JSON with axios is:
 *      axios.get('pokemons.json')
 */

import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    async function getPokemons() {
      const response = await axios.get("pokemons.json");
      setList(response.data);
    }
    getPokemons();
    console.log(list);
  }, []);

  const submitHandler = () => {
    const search = list.find((_item) => _item.name === value);
    console.log(search);
    if (search) {
      alert("Invalid name");
      return;
    }
    setList([...list, { name: value }]);
    setValue("");
  };

  const deleteHandler = (item) => {
    const updatedList = list.filter((_item) => _item.name !== item);
    console.log(updatedList);
    setList(updatedList);
    console.log(list);
  };
  return (
    <div className="App">
      <input type="text" value={value} onChange={changeHandler} />{" "}
      <button onClick={submitHandler}>Add</button>
      <hr />
      {list.map((pokemon, index) => {
        return (
          <li key={index}>
            {pokemon.name}{" "}
            <span style={{ marginLeft: ".5rem" }}>
              <button onClick={() => deleteHandler(pokemon.name)}>X</button>
            </span>
          </li>
        );
      })}
    </div>
  );
};

export default App;
