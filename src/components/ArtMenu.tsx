import { useState, useEffect } from "react";
import App from "../App";
import {
  Box,
  Image,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItemOption,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function ArtMenu() {
  const [artStyle, setArtStyle] = useState("");
  setArtStyle("threeD");

  return (
    <Box paddingTop="5">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Pokemon Art Style
        </MenuButton>
        <MenuList>
          <MenuItemOption
            minH="40px"
            value="cartoon"
            onClick={() => setArtStyle("cartoon")}
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
            onClick={() => setArtStyle("sugimori")}
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
            onClick={() => setArtStyle("threeD")}
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
            onClick={() => setArtStyle("eightBit")}
          >
            <Image
              boxSize="3.8rem"
              src="https:\/\/intern-pokedex.myriadapps.com\/images\/pokemon\/4.png"
              alt="eightBit"
              mr="0px"
            />
            <span>8-Bit Art</span>
          </MenuItemOption>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default ArtMenu;
