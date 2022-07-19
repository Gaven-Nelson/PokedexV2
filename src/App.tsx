import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/App.css";
import { Box, Flex, Container, Image } from "@chakra-ui/react";
import pikachu from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/runningPikachu.gif";
import AppHeader from "./components/AppHeader";
import { useArtStyle } from "./context/ArtStyleContext";
import AppTools from "./components/AppTools";
import { useMetaValue } from "./context/MetaValueContext";
import AppBody from "./components/AppBody";

interface Pokemon {
  id?: number;
  name?: string;
  image?: string;
  types?: Array<string>;
}

export interface PokemonArrayItem {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
  artStyle: string;
  isLoading: boolean;
}

function App() {
  const [pokemonArray, setPokemonArray] = useState<Array<PokemonArrayItem>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { meta, setMeta } = useMetaValue();
  const { artStyle, setArtStyle } = useArtStyle();

  let [searchParams, setSearchParams] = useSearchParams();
  let pageNumber = searchParams.get("page") ?? 1;
  let searchValue = searchParams.get("name") ?? "";

  interface Meta {
    current_page: number;
    last_page: number;
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${searchValue}&page=${pageNumber}`,
      { signal: abortController.signal }
    )
      .then((response) => response.json())
      .then((data) => {
        setMeta(data.meta);
        setPokemonArray(data.data);
        setIsLoading(false);
      });

    return function cancel() {
      abortController.abort();
    };
  }, [pageNumber, artStyle, searchValue]);

  if (isLoading === true) {
    return (
      <Container maxW="2000" h={["1000", "1200", "1400"]} bg="teal.400">
        <AppHeader />
        <Flex
          paddingTop="20"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Image paddingTop="100" maxH="300" maxW="300" src={pikachu} />
          <Box color="white">Loading...</Box>
        </Flex>
      </Container>
    );
  }

  return (
    <Box className="pageContainer" h="100%" minH="100vh">
      <AppHeader />
      <AppTools />
      <AppBody pokemonArray={pokemonArray} />
    </Box>
  );
}

export default App;
