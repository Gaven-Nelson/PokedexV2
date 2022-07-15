import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/Router";
import { extendTheme } from "@chakra-ui/react";
import Details from "./components/Details";
import { pokemonColorTheme } from "./theme/theme";
import { SearchValueProvider } from "./context/SearchValueContext";
import { ArtStyleProvider } from "./context/ArtStyleContext";
import { MetaValueProvider } from "./context/MetaValueContext";
import { PokemonArrayProvider } from "./context/PokemonArrayContext";
import { PokemonProvider } from "./context/PokemonContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={pokemonColorTheme}>
      <PokemonProvider>
        <MetaValueProvider>
          <PokemonArrayProvider>
            <SearchValueProvider>
              <ArtStyleProvider>
                <Router />
              </ArtStyleProvider>
            </SearchValueProvider>
          </PokemonArrayProvider>
        </MetaValueProvider>
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>
);
