import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./results";
import ThemeContext from "./ThemeContext";

export default function SearchParams() {
  //Set the state and the default state for the hook. SetLocation is called to change the state.
  //When you use a hook it returns an array of 2 things - current state and updated function for that state.

  //Hooks CANNOT be called an if statement or for loop or conditional statement or unpredictable logic.
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  //async function is guaranteed to return a promise when this function completes.
  async function requestPets() {
    //pet.animals returns a promise itself. 'await' says to wait here at this function until we get back the data.
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    console.log(animals[0]);
    setPets(animals || []);
  }

  //useEffect schedules the function inside to run after the render happens. useEffect is disconnected from when the render happens.
  //Do this first because** - you dont want to slow the first render (what the user sees), or wait for API to return data nefore rending using useState.
  useEffect(() => {
    //re-initialises the setBreeds and setBreed state each time this effect/hook is called.
    setBreeds([]);
    setBreed("");

    // pet.breeds is a function which we can pass the 'animal' variable from the select field into, which will return an object which is breeds. Pass that into a function which uses map function to return name variable in each index into breedStrings.
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      console.log(breeds);
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);

    //Set the dependencies of the useEffect hook so that this hook is only called when animal variable is changed, and it also depends on setBreed and setBreeds even though they do not change by the user.
    //Use an empty array [] if you only want it to load once and not change after.
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      {/* Example of how the location variable is updated each time user types a variable */}
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <b>Location</b>
          <input
            id="location"
            value={location}
            placeholder="Location"
            //Function changes the input field when updated (typed).
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchird</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
