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
  theme,
  Text
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/progress";
import App from "../App";
import PokemonCard from "./PokemonCard";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/Details.css";
import { pokemonColorTheme } from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/theme/theme";

interface pokemon {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
  stats: stats;
  height: number,
  weight: number,
  egg_groups: Array<string>,
  abilities: Array<string>,
  genus: string,
  description: string,
}

interface stats {
  hp: number,
  speed: number,
  attack: number,
  defense: number,
  ["special-attack"]: number,
  ["special-defense"]: number,

}

function Details() {
  const [pokemon, setPokemon] = useState<pokemon|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const pokemonId = useParams().id;
  const navigate = useNavigate();

  let secondaryColor = ""
  
  const handleColorType = () => {
    if(pokemon && pokemon.types.length > 1){
      secondaryColor = "water"
    }else{
      secondaryColor = "fighting"
    }
  }

  let sugimoriId = "1";
  if(pokemon){
  switch (true) {
    case pokemon.id < 10:
      sugimoriId = "0" + "0" + pokemon.id;
      break;
    case pokemon.id < 100:
      sugimoriId = "0" + pokemon.id;
      break;
    default:
      sugimoriId = "" + pokemon.id;
  }}

  const pokedexURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${sugimoriId}.png`;

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
  }, [pokemonId, pokemon?.types, isLoading]);

  if (isLoading === true) {
    return (
      <Container>
        <Image src="https://img.pokemondb.net/artwork/pikachu.jpg" />
        <Box alignContent="center">Loading...</Box>
      </Container>
    );
  } else if(pokemon){
    return (
      <Box justifyContent="center" height="1000" className={pokemon.types[0]} >
        <Box w="100%">
          <Flex
            justifyContent="space-between"
            padding={["5", "6", "8"]}
            fontSize={["10", "15", "20"]}
          >
            <Button
              onClick={handleBackButton}
              size={["sm", "md", "lg"]}
              colorScheme={pokemon.types[0]}
              variant="solid"
              borderRadius="50%"
              fontSize="1.3em"
            >
              &#10094;
            </Button>

            <Box color="white" fontSize={["20", "30", "40"]}>
              {pokemon?.name}
            </Box>
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
        <Flex  justifyContent="center" h={["75%", "80%", "80%"]} w="100%" >
          <Box
            bg="gray.100"
            w={["90%", "80%", "650px"]}
            h="fit-content"          
            borderRadius="10"
            padding="4"
            border="1px"
          >
            <Flex justifyContent="space-between" paddingBottom="2" >
              <Flex flexBasis="20%">
                <Box fontSize={["10", "20", "30"]}><Text noOfLines={1}>{pokemon.name}</Text></Box>
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
              <Flex
                flexBasis="50%"
                justifyContent="flex-end" //--------------------TYPES--------------------
              >
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
            <Flex
              flexDirection={["column","column","row"]}
              alignItems="center"
              flexWrap="wrap"
              h="fit-content" //------------------DETAILS BODY FLEX---------------
            >
              <Box w={["100%", "80%", "40%"]} >
                <Image src={pokedexURL}  w="100%" justifyContent="center"></Image>
              </Box>
              <Flex
                w={["100%","70%","60%"]}
                flexDirection="column"
                gap="5"
                paddingLeft="5%"
                paddingTop="3%" //-----------HP------------
              >
                <Flex
                  flexDirection="row"
                  
                  alignContent="center"
                  alignItems="center"
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    HP:
                  </Text>
                  <Box
                    w="10%"
                    h="25px"
                    textColor="black"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    border="1px"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                  >
                    {pokemon.stats.hp}
                  </Box>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats.hp / 255) * 100}
                    border="1px"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    textColor="black"
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                    
                  />
                </Flex>
                <Flex
                  flexDirection="row"
                  alignContent="center"
                  alignItems="center" //---------------ATTACK---------------
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    Attack:{" "}
                  </Text>
                  <Text
                    w="10%"
                    h="25px"
                    textColor="black"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    border="1px"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    noOfLines={1}
                  >
                    {pokemon.stats.attack}
                  </Text>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats.attack / 165) * 100}
                    border="1px"
                    textColor="black"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                  />
                </Flex>
                <Flex
                  flexDirection="row"
                  alignContent="center"
              
                  alignItems="center" //----------------DEFENSE--------------
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    Defense:{" "}
                  </Text>
                  <Box
                    w="10%"
                    h="25px"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    textColor="black"
                    border="1px"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    noOfLines={1}
                  >
                    {pokemon.stats.defense}
                  </Box>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats.defense / 230) * 100}
                    border="1px"
                    textColor="black"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                  />
                </Flex>
                <Flex
                  flexDirection="row"
                  alignContent="center"
                  alignItems="center" //---------------SPEED------------------
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    Speed:{" "}
                  </Text>
                  <Text
                    w="10%"
                    h="25px"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    textColor="black"
                    border="1px"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    noOfLines={1}
                  >
                    {pokemon.stats.speed}
                  </Text>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats.speed / 160) * 100}
                    border="1px"
                    textColor="black"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                  />
                </Flex>
                <Flex
                  flexDirection="row"
                  alignContent="center"
                  alignItems="center" //-----------------SP ATTACK------------
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    Sp Atk:{" "}
                  </Text>
                  <Box
                    w="10%"
                    h="25px"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    border="1px"
                    textColor="black"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    noOfLines={1}
                  >
                    {pokemon.stats["special-attack"]}
                  </Box>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats["special-attack"] / 154) * 100}
                    border="1px"
                    textColor="black"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                  />
                </Flex>
                <Flex
                  flexDirection="row"
                  alignContent="center"
                  alignItems="center" //----------------SP DEFENSE-------------
                >
                  <Text w="20%" paddingRight="2%" noOfLines={1}>
                    Sp Def:{" "}
                  </Text>
                  <Box
                    w="10%"
                    h="25px"
                    bg={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    border="1px"
                    textColor="black"
                    borderRightColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    noOfLines={1}
                  >
                    {pokemon.stats["special-defense"]}
                  </Box>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats["special-defense"] / 230) * 100}
                    border="1px"
                    textColor="black"
                    borderLeftColor={(pokemon.types[1] || pokemon.types[0]) + ".100"}
                    colorScheme={pokemon.types[1] || pokemon.types[0]}
                  />
                </Flex>
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
            <Flex flexDirection="row" justifyContent="space-evenly" alignContent="center" alignItems="center" fontSize={["10","12","18"]} paddingTop="2%" fontWeight="normal">
              <Flex flexDirection="column">
                <Flex >
                  <Box color="black" noOfLines={1}>{"Height:  " + pokemon.height + " m"}</Box>
                </Flex>
                <Flex  paddingTop="5%">
                <Box color="black" noOfLines={1}>{"Weight: " + pokemon.weight + " kg"}</Box>
                </Flex>
              </Flex>
              <Flex
                flexDirection="column"
                w="fit-content"
               
              >
                <Flex>
                  <Box color="black" textTransform="capitalize" fontWeight="normal">{"Egg Groups: " + pokemon.egg_groups.join(", ")}</Box>
                </Flex>
                <Flex  paddingTop="5%">
                <Box color="black" textTransform="capitalize" fontWeight="normal">{"Abilities: " + pokemon.abilities.join(", ")}</Box>
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

//Stats titles
{
  /* <Flex flexDirection="column" gap="4" paddingTop={["0","0","8"]} color="black" fontSize={["5","10","15"]} w="20%" alignItems="flex-end">
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
</Flex> */
}

//Progress Bars
{
  /* <Flex
flexDirection="column"
gap="5"
paddingTop="7"
//paddingLeft={["0","2","5"]}
fontSize={["5","10","15"]}
w="40%"
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
    w="100%"
    value={(pokemon.stats.hp / 255) * 100}
    className={pokemon.types[0]}
    colorScheme={pokemon.types[1]}
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
    colorScheme="blue"
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
    colorScheme="twitter"
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
    colorScheme="electric"
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
    //className={pokemon.types[0]}
    colorScheme={theme.normal}
    bg="gray.300"
  />
</Box>
</Flex> */
}
