import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItemOption,
  Input,
  Show,
  Skeleton,
  Image,
  Box,
} from "@chakra-ui/react";
import { RefObject, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { useArtStyle } from "../context/ArtStyleContext";
import { useMetaValue } from "../context/MetaValueContext";
import randomText from "/randomImage.png";

function AppTools() {
  const { artStyle, setArtStyle } = useArtStyle();
  const navigate = useNavigate();
  const toPageValue: RefObject<HTMLInputElement> = createRef();
  const {meta} = useMetaValue();

  const handleGoButton = () => {
    if (
     meta &&
      +toPageValue.current!.value > 0 &&
      +toPageValue.current!.value <= meta.last_page
    ) {
      navigate(`/page/` + toPageValue.current!.value);
    } else {
      alert("Please enter valid input");
    }
  };

  const handleRandomClick = () => {
    navigate("/Id/" + +Math.floor(Math.random() * 553));
  };

return(
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
        <MenuButton
          as={Button}
          w={["100%", "100%", "100%"]}
          fontSize={["8", "10", "12"]}
          rightIcon={<ChevronDownIcon />}
        >
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
        <Input
          placeholder="To Page..."
          ref={toPageValue}
          color="black"
          border="2px"
          borderColor="#91c9ca"
          w={["20", "30", "40"]}
        />

        <Button onClick={handleGoButton}>Go</Button>
      </Flex>
    </Box>
    <Box
      paddingTop={["20", "22%", "158", "208"]}
      paddingLeft="2%"
      color="black"
    >
      Page {meta?.current_page} of {meta?.last_page}
    </Box>
    <Show above="md">
      <Box paddingTop={["20", "20%", "150", "200"]} paddingLeft="2%">
        <Button //--------------------RANDOM POKEMON BUTTON------------------------
          onClick={handleRandomClick}
        >
          <Skeleton
            startColor="red.500"
            endColor="blue.500"
            h="100%"
            w="100%"
            position="absolute"
            borderRadius="5"
            zIndex="5"
          ></Skeleton>
          <Image src={randomText} h={["3", "4", "8"]} zIndex="6"></Image>
        </Button>
      </Box>
    </Show>
  </Flex>);
}

export default AppTools;
