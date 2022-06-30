import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/App.css";
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
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuItemOption,
  Progress,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import pokedexText from "/PokemonText.png";
import randomText from "/randomImage.png";
import PokemonCard from "./components/PokemonCard";
import ArtMenu from "./components/ArtMenu";
import Router from "./Router";
import Details from "./components/Details";
import ListCardView from "./components/ListCardView";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState([]);
  const navigate = useNavigate();
  let { pageNumber = 1 } = useParams();
  const [artStyle, setArtStyle] = useState("");

  interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: Array<string>;
    artStyle: string;
  }

  const handleClickMinus = () => {
    if (pageNumber > 1) {
      navigate(`/page/` + (+pageNumber - +1));
    } else {
      navigate(`/page/` + meta.last_page);
    }
  };

  const handleClickPlus = () => {
    if (pageNumber < meta.last_page) {
      navigate(`/page/` + (+pageNumber + +1));
    } else {
      navigate(`/page/1`);
    }
  };

  const handleRandomClick = () => {
    navigate("/Id/" + +Math.floor(Math.random() * 553));
  };

  useEffect(() => {
    const fetchApi = async () => {
      const information = await fetch(
        `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${pageNumber}`,
        {
          method: "GET",
        }
      );
      const jsonData = await information.json();
      setPokemon(jsonData.data);
      setMeta(jsonData.meta);
      setIsLoading(false);
    };

    fetchApi();
  }, [pageNumber, artStyle]);

  if (isLoading === true) {
    return (
      <Box>
        <Box
          className="pageHeader"
          as="header"
          position="fixed"
          backgroundColor="rgba(255, 
 255, 255, 0.8)"
          backdropFilter="saturate(180%) blur(5px)"
          w="100%"
          zIndex={10}
        >
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
                onClick={handleClickMinus}
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
            <Box width="60%">
              <InputGroup
                bg="whiteAlpha.100"
                justifyContent="center"
                ringColor="white"
              >
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
            <Button
              bg="rgb(0, 128, 128, .8)"
              onClick={handleRandomClick}
              size={["sm", "md", "lg"]}
            >
              <Image src={randomText} h={["4", "5", "10"]}></Image>
            </Button>

            <Box paddingRight="5">
              <Button
                onClick={handleClickPlus}
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
        <Container paddingTop="40">
          <Image src="https://img.pokemondb.net/artwork/pikachu.jpg" />
          <Box>Loading...</Box>
          <Progress size="sm" isIndeterminate />
        </Container>
      </Box>
    );
  }

  return (
    <Box className="pageContainer" h="100%">
      <Box
        className="pageHeader"
        as="header"
        position="fixed"
        backgroundColor="rgba(255, 
 255, 255, 0.8)"
        backdropFilter="saturate(180%) blur(5px)"
        w="100%"
        zIndex={10}
      >
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
              onClick={handleClickMinus}
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
          <Box width="60%">
            <InputGroup
              bg="whiteAlpha.100"
              justifyContent="center"
              ringColor="white"
            >
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
          <Button
            bg="white"
            onClick={handleRandomClick}
            size={["sm", "md", "lg"]}
          >
            <Skeleton startColor="red.500" endColor="blue.500" h="100%" w="100%" position="absolute" borderRadius="5" zIndex="overlay"></Skeleton>
            <Image src={randomText} h={["4", "5", "10"]} zIndex="overlay"></Image>
          </Button>

          <Box paddingRight="5">
            <Button
              onClick={handleClickPlus}
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

      <Flex justifyContent="center">
        <Box paddingTop={["20", "80", "150", "200"]}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Pokemon Art Style
            </MenuButton>
            <MenuList>
              <MenuItemOption
                minH="40px"
                value="cartoon"
                onClick={() => setArtStyle("1")}
              >
                <Image
                  boxSize="3rem"
                  src="https://img.pokemondb.net/artwork/vector/charmander.png"
                  alt="Funny Cartoon"
                  mr="12px"
                />
                <span>Funny Cartoon</span>
              </MenuItemOption>
              <MenuItemOption
                minH="40px"
                value="sugimori"
                onClick={() => setArtStyle("2")}
              >
                <Image
                  boxSize="3rem"
                  src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
                  alt="Sugimori"
                  mr="12px"
                />
                <span>Sugimori Art</span>
              </MenuItemOption>
              <MenuItemOption
                minH="40px"
                value="threeD"
                onClick={() => setArtStyle("3")}
              >
                <Image
                  boxSize="3rem"
                  src="https://img.pokemondb.net/sprites/home/normal/charmander.png"
                  alt="3DModel"
                  mr="12px"
                />
                <span>3D Model</span>
              </MenuItemOption>
              <MenuItemOption
                minH="40px"
                value="eightBit"
                onClick={() => setArtStyle("4")}
              >
                <Image
                  boxSize="3.8rem"
                  src="https:\/\/intern-pokedex.myriadapps.com\/images\/pokemon\/4.png"
                  alt="eightBit"
                  mr="0px"
                />
                <span>8-Bit Art</span>
              </MenuItemOption>
              <MenuItemOption
                minH="40px"
                value="real3D"
                onClick={() => setArtStyle("5")}
              >
                <Image
                  boxSize="3.8rem"
                  src="https://projectpokemon.org/images/normal-sprite/charmander.gif"
                  alt="realThreeD"
                  mr="0px"
                />
                <span>Animated Model</span>
              </MenuItemOption>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Tabs>
        <TabList paddingLeft="5">
          <Tab>&#8862; Grid</Tab>

          <Tab>&#x2263; List</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid
              columns={[2, 3, 4, 5]}
              spacing="10"
              paddingLeft="5"
              paddingRight="5"
              paddingTop="0"
            >
              {pokemon.map((pokemon: Pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  artStyle={artStyle}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={[1]}
              spacing="10"
              paddingLeft="5"
              paddingRight="5"
              paddingTop="0"
            >
              {pokemon.map((pokemon: Pokemon) => (
                <ListCardView
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  artStyle={artStyle}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;

//let pokemonURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`;
