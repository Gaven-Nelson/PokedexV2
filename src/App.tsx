import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import {
  Box,
  Flex,
  Container,
  Grid,
  GridItem,
  AspectRatio,
  Image,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import Loader from "./components/Loading";
import SearchIcon from "@chakra-ui/icons";
import pokedexText from "/PokemonText.png";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  interface Pokemon {
    id: number;
    name: string;
    types: string;
  }

  useEffect(() => {
    fetch("https://intern-pokedex.myriadapps.com/api/v1/pokemon")
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => setError(err));
  }, []);

  return (
    <Box className="pageContainer">
      <Box className="pageHeader">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          bg="rgb(0, 128, 128, .4)"
          paddingTop="1.5%"
          paddingBottom="1.5%"
        >
          <Box paddingLeft="5">
            <Button
              bg="teal"
              size={["sm", "md", "lg"]}
              colorScheme="teal"
              variant="solid"
              borderRadius="50%"
              fontSize="1.3em"
            >
              &#10094;
            </Button>
          </Box>
          <Box>
            <Image src={pokedexText} maxW={["20", "100", "250"]} />{" "}
          </Box>
          {/* <Box>
            <Image
              src="https://projectpokemon.org/images/normal-sprite/bulbasaur.gif"
              maxW={["0", "50", "100"]}
            />{" "}
          </Box> */}
          <Box width="60%">
            <InputGroup bg="whiteAlpha.100" justifyContent="center">
              <Input
                flexGrow="1"
                placeholder="Search"
                _placeholder={{ color: "white" }}
                size={["sm", "md", "lg"]}
                width="80%"
                color="white"
                outline="gray"
                fontSize="50"
              ></Input>
            </InputGroup>
          </Box>

          <Box paddingRight="5">
            <Button
              bg="teal"
              size={["sm", "md", "lg"]}
              colorScheme="teal"
              variant="solid"
              borderRadius="50%"
            >
              &#10095;
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box className="pageBody">
        <SimpleGrid
          columns={[2, 3, 4, 5]}
          spacing="10"
          paddingLeft="5"
          paddingRight="5"
          paddingTop="5"
        >
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
          <Box bg="teal" height="150px"></Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default App;

//let pokemonURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`;

// interface Pokemon {
//   id: number;
//   name: string,
//   types: string
// }

// useEffect(() => {
//   fetch("https://intern-pokedex.myriadapps.com/api/v1/pokemon")
//     .then((response) => response.json())
//     .then((res) => console.log(res))
//     .catch((err) => setError(err));
// }, []);
