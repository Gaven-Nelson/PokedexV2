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
  Text,
  Skeleton,
  SkeletonCircle,
  Show,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/progress";
import App from "../App";
import PokemonCard from "./PokemonCard";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/Details.css";
import { pokemonColorTheme } from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/theme/theme";
import waterBG from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/waterBG.jpeg";

interface pokemon {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
  stats: stats;
  height: number;
  weight: number;
  egg_groups: Array<string>;
  abilities: Array<string>;
  genus: string;
  description: string;
}

interface stats {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  ["special-attack"]: number;
  ["special-defense"]: number;
}

function Details() {
  const [pokemon, setPokemon] = useState<pokemon | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const pokemonId = useParams().id;
  const navigate = useNavigate();

  let bgImageUrl = "";

  if(pokemon){
  switch (true) {
    case pokemon.types[0] == "water":
      bgImageUrl =
        "https://pm1.narvii.com/7243/46d5cfd672a1e2fca16c78d728e2b10cb57f7ce0r1-669-521v2_hq.jpg";
      break;

   
    case pokemon.types[0] == "normal":
      bgImageUrl =
        "https://pm1.narvii.com/7243/f2fb9db8191078f72c8b98fee93155c56e6e8674r1-673-421v2_hq.jpg";
      break;
    case pokemon.types[0] == "fighting":
      bgImageUrl =
        "https://pm1.narvii.com/7243/250af9c70a9f5140d4ba66922a9f227dd0bbe885r1-731-341v2_hq.jpg";
      break;
    case pokemon.types[0] == "fire":
      bgImageUrl =
        "https://pm1.narvii.com/7243/8ee17e7a8790303410b30a2fbcb18183fc12166er1-623-499v2_hq.jpg";
      break;
    case pokemon.types[0] == "grass":
      bgImageUrl =
        "https://pm1.narvii.com/7243/0b36782d158f6da0639e38ebf94af3d5c37288c2r1-668-486v2_hq.jpg";
      break;
    case pokemon.types[0] == "ghost":
      bgImageUrl =
        "https://pm1.narvii.com/7243/1932c3243860328e1f1cd07d65e02649672380ecr1-700-444v2_hq.jpg";
      break;
    case pokemon.types[0] == "bug":
      bgImageUrl =
        "https://pm1.narvii.com/7243/0d2736d705781ea116d08621abbfefae60a971c2r1-700-542v2_hq.jpg";
      break;
    case pokemon.types[0] == "ground":
      bgImageUrl =
        "https://pm1.narvii.com/7243/10ed1c931a1b46035f01315731b1f3f70ec24f5er1-656-454v2_hq.jpg";
      break;
    case pokemon.types[0] == "rock":
      bgImageUrl =
        "https://pm1.narvii.com/7243/843acea2bde21f7ae7e1f17c0da831acea46a2acr1-692-503v2_hq.jpg";
      break;
    case pokemon.types[0] == "electric":
      bgImageUrl =
        "data:image/jpeg;base64,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";
      break;
    case pokemon.types[0] == "steel":
      bgImageUrl =
        "https://pm1.narvii.com/7243/bc538f6da74b633d36b48108ddd07b7a2410a2afr1-650-498v2_hq.jpg";
      break;
    case pokemon.types[0] == "fairy":
      bgImageUrl =
        "https://pm1.narvii.com/7243/61770aa4b0259c06cd4b1fa490007c29e27d6683r1-663-565v2_hq.jpg";
      break;
    case pokemon.types[0] == "ice":
      bgImageUrl =
        "https://pm1.narvii.com/7243/fc715e840930cac4f0577c69aa6721ff0b689b11r1-677-462v2_hq.jpg";
      break;
    case pokemon.types[0] == "psychic":
      bgImageUrl =
        "https://pm1.narvii.com/7243/19a53b46a48f55a346f130092cb2c8d8fcf88af0r1-642-671v2_hq.jpg";
      break;
    case pokemon.types[0] == "dragon":
      bgImageUrl =
        "https://pm1.narvii.com/7243/adcbbe4c769bbaf0858abef9625077294911804br1-593-534v2_hq.jpg";
      break;
    case pokemon.types[0] == "poison":
      bgImageUrl =
        "https://pm1.narvii.com/7243/b0945fed2f0cc9fa340c6e7deb851c14ddf53e30r1-575-530v2_hq.jpg";
      break;
    case pokemon.types[0] == "dark":
      bgImageUrl =
        "https://pm1.narvii.com/7243/0ea89cf278223e13003a6897d3091b7d99271cf6r1-688-475v2_hq.jpg";
      break;
    case pokemon.types[0] == "flying":
      bgImageUrl =
        "data:image/jpeg;base64,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";
      break;
    default:
      bgImageUrl = "";
      break;
  }
  }

  let secondaryColor = "";

  const handleColorType = () => {
    if (pokemon && pokemon.types.length > 1) {
      secondaryColor = "water";
    } else {
      secondaryColor = "fighting";
    }
  };

  let sugimoriId = "1";
  let spriteSugimoriBackId = "1";
  let spriteSugimoriNextId = "1";

  if (pokemon) {
    switch (true) {
      case pokemon.id < 10:
        sugimoriId = "0" + "0" + pokemon.id;
        spriteSugimoriBackId = "0" + "0" + (pokemon.id - 1);
        spriteSugimoriNextId = "0" + "0" + (pokemon.id + 1);
        break;
      case pokemon.id <= 101:
        sugimoriId = "0" + pokemon.id;
        spriteSugimoriBackId = "0" + (pokemon.id - 1);
        spriteSugimoriNextId = "0" + (pokemon.id + 1);
        break;
      default:
        sugimoriId = "" + pokemon.id;
        spriteSugimoriBackId = "" + (pokemon.id - 1);
        spriteSugimoriNextId = "" + (pokemon.id + 1);
    }
  }

  const spritePixelNextURL = `https://intern-pokedex.myriadapps.com/images/pokemon/${
    pokemon?.id + 1
  }.png`;
  const spritePixelBackURL = `https://intern-pokedex.myriadapps.com/images/pokemon/${
    pokemon?.id - 1
  }.png`;

  const pokedexURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${sugimoriId}.png`;

  const miniSpriteImageBackURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${spriteSugimoriBackId}.png`;
  const miniSpriteImageNextURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${spriteSugimoriNextId}.png`;

  const handleBackSprite = () => {
    navigate("/Id/" + (pokemon?.id - 1));
  };

  const handleNextSprite = () => {
    navigate("/Id/" + (pokemon?.id + 1));
  };

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
      <Box justifyContent="center" height="1000" bg="#cce6e6">
        <Box w="100%">
          <Flex
            justifyContent="space-between"
            padding={["5", "6", "8"]}
            fontSize={["10", "15", "20"]}
          >
            <SkeletonCircle size="16">
              <Button
                size={["sm", "md", "lg"]}
                variant="solid"
                borderRadius="50%"
                fontSize="1.3em"
              ></Button>
            </SkeletonCircle>

            <Skeleton width="80">
              <Box color="white" fontSize={["20", "30", "40"]}>
                {pokemon?.name}
              </Box>
            </Skeleton>
            <Skeleton h="14">
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
            </Skeleton>
          </Flex>
          <Flex justifyContent="center" h={["75%", "80%", "80%"]} w="100%">
            <Skeleton>
              <Box
                bg="gray.100"
                w={["90%", "80%", "650px"]}
                h="700"
                borderRadius="10"
                padding="4"
                border="1px"
              ></Box>
            </Skeleton>
          </Flex>
        </Box>
      </Box>
    );
    ß;
  } else if (pokemon) {
    return (
      <Box
        justifyContent="center"
        height="1000"
        className={pokemon.types[0]}
      >
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

            <Flex flexDirection="row" wrap="nowrap">
              {pokemon.id > 1 ? (
                <Button onClick={handleBackSprite}>
                  <Box>&#10094;</Box>
                  <Box>#{pokemon.id - 1}</Box>
                  <Image maxH="12" src={spritePixelBackURL} />
                </Button>
              ) : null}
            </Flex>

            <Box color="white" fontSize={["20", "30", "40"]}>
              {pokemon?.name}
            </Box>
            <Flex flexDirection="row" wrap="nowrap">
              {pokemon.id < 553 ? (
                <Button onClick={handleNextSprite}>
                  <Image maxH="12" src={spritePixelNextURL} />
                  <Box>#{pokemon.id + 1}</Box>
                  <Box>&#10095;</Box>
                </Button>
              ) : null}
            </Flex>
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
            w={["90%", "80%", "650px"]}
            h="fit-content"
            borderRadius="10"
            padding="4"
            border="1px"
            
          
          >
            <Flex justifyContent="space-between" paddingBottom="2">
              <Flex flexBasis="20%">
                <Box fontSize={["10", "20", "30"]}>
                  <Text noOfLines={1}>{pokemon.name}</Text>
                </Box>
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
              flexDirection={["column", "column", "row"]}
              alignItems="center"
              flexWrap="wrap"
              h="fit-content" 
            //------------------DETAILS BODY FLEX---------------
            >
              <Box w={["100%", "80%", "40%"]} >
                <Image
                  src={pokedexURL}
                  w="100%"
                  justifyContent="center"
                ></Image>
              </Box>
              <Flex
                w={["100%", "70%", "60%"]}
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
                    noOfLines={1}
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
                  >
                    {pokemon.stats.hp}
                  </Box>
                  <Progress
                    w="70%"
                    h="25px"
                    value={(pokemon.stats.hp / 255) * 100}
                    border="1px"
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderRightColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
                    borderLeftColor={
                      (pokemon.types[1] || pokemon.types[0]) + ".100"
                    }
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
            <Flex w="100%" color="black" fontWeight="normal" paddingTop="5%">
              <Box
                //border="1px"
                w="100%"
                padding="1"
                className={pokemon.types[0]}
                backgroundImage={bgImageUrl}
                bgPosition="center"
                bgSize="cover"
                textColor="white"
                borderRadius="5"
                
              >
                Profile
              </Box>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="space-evenly"
              alignContent="center"
              alignItems="center"
              fontSize={["10", "12", "18"]}
              paddingTop="2%"
              fontWeight="normal"
            >
              <Flex flexDirection="column">
                <Flex>
                  <Box color="black" noOfLines={1}>
                    {"Height:  " + pokemon.height + " m"}
                  </Box>
                </Flex>
                <Flex paddingTop="5%">
                  <Box color="black" noOfLines={1}>
                    {"Weight: " + pokemon.weight + " kg"}
                  </Box>
                </Flex>
              </Flex>
              <Flex flexDirection="column" w="fit-content">
                <Flex>
                  <Box
                    color="black"
                    textTransform="capitalize"
                    fontWeight="normal"
                  >
                    {"Egg Groups: " + pokemon.egg_groups.join(", ")}
                  </Box>
                </Flex>
                <Flex paddingTop="5%">
                  <Box
                    color="black"
                    textTransform="capitalize"
                    fontWeight="normal"
                  >
                    {"Abilities: " + pokemon.abilities.join(", ")}
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
