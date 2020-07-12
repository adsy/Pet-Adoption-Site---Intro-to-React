import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./details";
import ThemeContext from "./ThemeContext";

//Creating an App Component

//Create an App element that returns a function that returns a div which has another createElement function inside of it.
const App = () => {
  // JXS EXAMPLE - most currently used.

  // return (
  //   <div>
  //     <h1 id="something-important">Adopt me!</h1>
  //     <Pet name="Elara" animal="Dog" breed="Cavalier" />
  //     <Pet name="Charlie" animal="Dog" breed="Sausage Dog" />
  //     <Pet name="Otto" animal="Dog" breed="Cavalier" />
  //   </div>
  // );

  const themeHook = useState("black");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};
//Render (overrides original contents of div identified by root) the App 'stamp' at the element identified by 'root'
render(<App />, document.getElementById("root"));
