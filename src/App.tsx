import { useState, useEffect, createRef, RefObject } from "react";
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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import pokedexText from "/PokemonText.png";
import randomText from "/randomImage.png";
import PokemonCard from "./components/PokemonCard";
import ListCardView from "./components/ListCardView";
import pikachu from "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/runningPikachu.gif";


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState([]);
  const navigate = useNavigate();
  let { pageNumber = 1 } = useParams();
  const [artStyle, setArtStyle] = useState("");

  let pageValue = "1";

  interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: Array<string>;
    artStyle: string;
    isLoading: boolean;
  }

  const toPageValue: RefObject<HTMLInputElement> = createRef();

  const handleGoButton = () => {
    if (
      +toPageValue.current!.value > 0 &&
      +toPageValue.current!.value <= meta.last_page
    ) {
      navigate(`/page/` + toPageValue.current!.value);
    } else {
      alert("Please enter valid input")
    }
  };

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
    fetch(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.data);
        setMeta(data.meta);
        setIsLoading(false);
      });
  }, [pageNumber, artStyle]);

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
    <Box className="pageContainer" h="100%">
      <Box
        // ------------HEADER-------------------
        className="pageHeader"
        as="header"
        position="fixed"
        backgroundColor="rgba(255, 
 255, 255, 0.8)"
        backdropFilter="saturate(180%) blur(5px)"
        w="100%"
        zIndex={10}
      >
        <Flex //-----------------PREVIOUS PAGE BUTTON-------------------------
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
          <Box //----------------POKEDEX TITLE---------------------
          >
            <Image src={pokedexText} maxW={["20", "100", "250"]} />{" "}
          </Box>
          <Box
            width="60%" //--------------SEARCH BAR------------------
          >
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
          <Button //--------------------RANDOM POKEMON BUTTON------------------------
            bg="white"
            onClick={handleRandomClick}
            size={["sm", "md", "lg"]}
          >
            <Skeleton
              startColor="red.500"
              endColor="blue.500"
              h="100%"
              w="100%"
              position="absolute"
              borderRadius="5"
              zIndex="overlay"
            ></Skeleton>
            <Image
              src={randomText}
              h={["4", "5", "10"]}
              zIndex="overlay"
            ></Image>
          </Button>

          <Box
            paddingRight="5" //----------------NEXT PAGE BUTTON-------------------
          >
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

      <Flex
        justifyContent="center"
        flexDirection="row"
        paddingRight="5%" //-----------BODY---------------
      >
        <Box
          paddingTop={["20", "20%", "150", "200"]}
          paddingRight="2%" //---------------ART SELECT MENU-----------------
        >
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
                <span>Pixel Art</span>
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
        <Box
          paddingTop={["20", "20%", "150", "200"]}
          paddingLeft="0%" //-------------GO TO PAGE INPUT-----------------
        >
          <Flex alignContent="center" alignItems="center">
            <Input placeholder="To Page..." w="fit-content" ref={toPageValue} />

            <Button onClick={handleGoButton}>Go</Button>
          </Flex>
        </Box>
        <Box paddingTop={["20", "20%", "158", "208"]} paddingLeft="2%">
          Page {meta.current_page} of {meta.last_page}
        </Box>
      </Flex>
      <Tabs //-------------------TAB SELECTOR-------------------------
      >
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
                  isLoading={isLoading}
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
                  isLoading={isLoading}
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

//old fetch
// const fetchApi = async () => {
//   const information = await fetch(
//     `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${pageNumber}`,
//     {
//       method: "GET",
//     }
//   );
//   const jsonData = await information.json();
//   setPokemon(jsonData.data);
//   setMeta(jsonData.meta);
//   setIsLoading(false);
// };
//fetchApi();

// <InputGroup>
// <InputLeftAddon fontWeight="semibold" bg="gray.200">
//   Go To Page:
// </InputLeftAddon>
// <NumberInput
//   ref={toPageValue}
//   // min={1}
//   // max={37}
//   bg="gray.100"
//   borderRadius="5"
// >
//   <NumberInputField />
//   <NumberInputStepper>
//     <NumberIncrementStepper />
//     <NumberDecrementStepper />
//   </NumberInputStepper>
// </NumberInput>
// </InputGroup>
