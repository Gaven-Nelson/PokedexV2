import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/Router";
import { extendTheme } from "@chakra-ui/react";
import Details from "./components/Details";
import { pokemonColorTheme } from "./theme/theme";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={pokemonColorTheme}>
      <Router />
    </ChakraProvider>
  </React.StrictMode>
);
