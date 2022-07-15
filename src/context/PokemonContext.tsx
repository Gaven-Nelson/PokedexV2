import { createContext, PropsWithChildren, useContext, useState } from "react";
const useValue = () => {
  interface Pokemon {
    id?: number;
    name?: string;
    image?: string;
    types?: Array<string>;
  }

  const [pokemon, setPokemon] = useState<Pokemon>();
  return {
    pokemon,
    setPokemon,
  };
};
const PokemonContext = createContext({} as ReturnType<typeof useValue>);
const PokemonProvider = (props: PropsWithChildren<{}>) => {
  return <PokemonContext.Provider value={useValue()} {...props} />;
};
const usePokemon = () => useContext(PokemonContext);
export { PokemonProvider, usePokemon };
