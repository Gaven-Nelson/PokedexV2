import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  Image,
  Button,
  Stack,
  color,
  Colors,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/progress";
import App from "../App";
import PokemonCard from "./PokemonCard";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/Details.css";

interface pokemon {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
}

function Details({ id, name, image, types }: pokemon) {
  const [pokemon, setPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const pokemonId = useParams().id;
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleHomeButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchApi = async () => {
      const information = await fetch(
        `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonId}`,
        {
          method: "GET",
        }
      );
      const jsonData = await information.json();
      setPokemon(jsonData.data);
      setIsLoading(false);
    };

    fetchApi();
  }, [pokemonId, pokemon.types, isLoading]);

  if (isLoading === true) {
    return (
      <Container>
        <Image src="https://img.pokemondb.net/artwork/pikachu.jpg" />
        <Box alignContent="center">Loading...</Box>
      </Container>
    );
  } else {
    return (
      <Box justifyContent="center" height="1000" className={pokemon.types[0]}>
        <Box w="100%">
          <Flex
            justifyContent="space-between"
            padding={["5", "6", "8"]}
            fontSize={["10", "15", "20"]}
          >
            <Button
              onClick={handleBackButton}
              bg="black"
              size={["sm", "md", "lg"]}
              colorScheme="teal"
              variant="solid"
              borderRadius="50%"
              fontSize="1.3em"
            >
              &#10094;
            </Button>

            <Box color="white" fontSize="40">{pokemon.name}</Box>
            <Button
              onClick={handleHomeButton}
              bg="black"
              size={["sm", "md", "lg"]}
              colorScheme="black"
              variant="solid"
              borderRadius="5"
              fontSize="1.3em"
            >
              Home
            </Button>
          </Flex>
        </Box>
        <Flex justifyContent="center" h={["75%", "80%", "80%"]} w="100%">
          <Box
            bg="gray.100"
            w={["60%", "50%", "40%"]}
            borderRadius="10"
            padding="4"
          >
            <Flex justifyContent="space-between" paddingBottom="2">
              <Flex flexBasis="10%">
                <Box fontSize={["10", "20", "30"]}>{pokemon.name}</Box>
              </Flex>
              <Flex
                flexBasis="40%"
                alignItems="center"
                paddingLeft="2"
                paddingTop="0"
                color="gray"
              >
                <Box fontSize={["5", "10", "20"]}> #{pokemon.id}</Box>
              </Flex>
              <Flex flexBasis="50%" justifyContent="flex-end">
                <Flex
                  justifyContent="flex-end"
                  paddingBottom="5"
                  paddingLeft="72%"
                  gap={["1", "2", "3"]}
                  fontSize={["5", "8", "14"]}
                  fontWeight="bold"
                >
                  {pokemon.types.map((type: any) => (
                    <Box
                      key={type}
                      border="1px"
                      borderRadius="5"
                      className={type}
                      padding="1"
                      fontSize={["5", "10", "15"]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Box w="98%" border="1px"></Box>
            <Flex h="30%">
              <Box w="40%">
                <Image src={pokemon.image} w="100%"></Image>
              </Box>
              <Flex flexDirection="column" gap="4" paddingTop="8" color="black">
                <Box border="1px" borderColor="gray.100">
                  HP:
                </Box>
                <Box border="1px" borderColor="gray.100">
                  Attack:
                </Box>
                <Box border="1px" borderColor="gray.100">
                  Defense:
                </Box>
                <Box border="1px" borderColor="gray.100">
                  Speed:
                </Box>
                <Box border="1px" borderColor="gray.100">
                  Sp Atk:
                </Box>
                <Box border="1px" borderColor="gray.100">
                  Sp Def:
                </Box>
              </Flex>
              <Flex
                flexDirection="column"
                gap="5"
                paddingTop="8"
                paddingLeft="5"
              >
                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                    
                  >
                    {pokemon.stats.hp}
                  </Box>

                  <Progress
                    h="5"
                    w="250px"
                    value={(pokemon.stats.hp / 255) * 100}
                    className={pokemon.types[0]}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>
                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {pokemon.stats.attack}
                  </Box>

                  <Progress
                    h="5"
                    w="100%"
                    value={(pokemon.stats.attack / 165) * 100}
                    className={pokemon.types[0]}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>
                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {pokemon.stats.defense}
                  </Box>

                  <Progress
                    h="5"
                    w="100%"
                    value={(pokemon.stats.defense / 230) * 100}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>

                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                    
                  >
                    {pokemon.stats.speed}
                  </Box>

                  <Progress
                    h="5"
                    w="100%"
                    value={(pokemon.stats.speed / 160) * 100}
                    className={pokemon.types[0]}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>
                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {pokemon.stats["special-attack"]}
                  </Box>

                  <Progress
                    h="5"
                    w="100%"
                    value={(pokemon.stats["special-attack"] / 154) * 100}
                    className={pokemon.types[0]}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>
                <Box border="1px">
                  <Box
                    color="white"
                    position="absolute"
                    zIndex="overlay"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {pokemon.stats["special-defense"]}
                  </Box>

                  <Progress
                    h="5"
                    w="100%"
                    value={(pokemon.stats["special-defense"] / 230) * 100}
                    className={pokemon.types[0]}
                    colorScheme="red"
                    bg="gray.300"
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex h="10%" paddingTop="10" color="black">
              <Box>{pokemon.genus}</Box>
            </Flex>
            <Flex h="10%" color="black" fontWeight="normal">
              <Box>{pokemon.description}</Box>
            </Flex>
            <Flex w="100%" color="black" fontWeight="normal">
              <Box
                border="1px"
                w="100%"
                padding="1"
                className={pokemon.types[0]}
              >
                Profile
              </Box>
            </Flex>
            <Flex>
              <Flex flexDirection="column" gap="20" paddingTop="20">
                <Flex>
                  <Box color="black">Height:</Box>
                  <Box paddingLeft="2">{pokemon.height} m</Box>
                </Flex>
                <Flex>
                  <Box color="black">Weight:</Box>
                  <Box paddingLeft="2">{pokemon.weight} kg</Box>
                </Flex>
              </Flex>
              <Flex
                flexDirection="column"
                gap="20"
                paddingTop="20"
                paddingLeft="40"
              >
                <Flex>
                  <Box color="black">Egg Groups:</Box>
                  <Box paddingLeft="2" className="eggs">
                    {pokemon.egg_groups.join(", ")}
                  </Box>
                </Flex>
                <Flex>
                  <Box color="black">Abilities:</Box>
                  <Box paddingLeft="2" className="abilities">
                    {pokemon.abilities.join(", ")}
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  }
}

export default Details;

//mapping
{
  /* <Flex
flexDirection="column"
gap="4"
paddingTop="8"
paddingLeft="5"
>
<Progress colorScheme="purple.300" size="lg" value={45} />
<Box
  border="1px"
  paddingRight="60"
  paddingLeft="2"
  className={pokemon.types[1]}
>
  {pokemon.stats.attack}
</Box>
<Box
  border="1px"
  paddingRight="60"
  paddingLeft="2"
  className={pokemon.types[1]}
>
  {pokemon.stats.defense}
</Box>
<Box
  border="1px"
  paddingRight="60"
  paddingLeft="2"
  className={pokemon.types[1]}
>
  {pokemon.stats.speed}
</Box>
<Box
  border="1px"
  paddingRight="60"
  paddingLeft="2"
  className={pokemon.types[1]}
>
  {pokemon.stats["special-attack"]}
</Box>
<Box border="1px" paddingLeft="2" className={pokemon.types[1]}>
  {pokemon.stats["special-defense"]}
</Box>
</Flex> */
}
