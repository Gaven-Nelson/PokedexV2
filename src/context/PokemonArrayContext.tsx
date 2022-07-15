import { createContext, PropsWithChildren, useContext, useState } from "react";
const useValue = () => {
  interface PokemonArray {
    id?: number;
    name?: string;
    image?: string;
    types?: Array<string>;
  }

  const [pokemonArray, setPokemonArray] = useState<Array<PokemonArray>>([]);
  return {
    pokemonArray,
    setPokemonArray,
  };
};
const PokemonArrayContext = createContext({} as ReturnType<typeof useValue>);
const PokemonArrayProvider = (props: PropsWithChildren<{}>) => {
  return <PokemonArrayContext.Provider value={useValue()} {...props} />;
};
const usePokemonArray = () => useContext(PokemonArrayContext);
export { PokemonArrayProvider, usePokemonArray };
