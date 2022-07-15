import {
  useState,
  useEffect,
  createRef,
  RefObject,
  createContext,
  useContext,
} from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/App.css";
import {
  Box,
  Flex,
  Container,
  Image,
  Button,
  Input,
  InputGroup,
  SimpleGrid,
  MenuButton,
  Menu,
  MenuList,
  MenuItemOption,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
  Show,
  Center,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PokemonCard from "./components/PokemonCard";
import ListCardView from "./components/ListCardView";
import pikachu from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/runningPikachu.gif";
import AppHeader from "./components/AppHeader";
import { useSearchValue } from "./context/SearchValueContext";
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
  //const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [pokemonArray, setPokemonArray] = useState<Array<PokemonArrayItem>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { meta, setMeta } = useMetaValue();
  let [searchParams, setSearchParams ] = useSearchParams();

  let pageNumber = searchParams.get('page') ?? 1;
  let searchValue = searchParams.get('name') ?? ""; 

  const { artStyle, setArtStyle } = useArtStyle();
  //const { searchValue, setSearchValue } = useSearchValue();

  interface Meta {
    current_page: number;
    last_page: number;
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${searchValue}&page=${pageNumber}`,{signal: abortController.signal}
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
        <Flex
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
