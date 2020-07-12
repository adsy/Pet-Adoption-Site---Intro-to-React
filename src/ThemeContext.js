import { createContext } from "react";

// empty function is a placeholder, uses particular function if there is nothing above it.
// what a hook likes like - state + updated (in this case doesn't do anything)
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
