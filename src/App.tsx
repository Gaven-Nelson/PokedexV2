import { useState } from "react";
import logo from "./logo.svg";
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
} from "@chakra-ui/react";

function App() {
  let pokemonURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`;

  return (
    <div className="pageContainer">
      <div className="pageHeader">
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" bg='rgb(0, 128, 128, .4)' paddingTop='1.5%' paddingBottom='1.5%'>
          <div className="leftButton">
            <Button
              size="lg"
              colorScheme="teal"
              variant="solid"
              borderRadius="50%"
              fontSize="1.3em"
            >
              &#10094;
            </Button>
          </div>
          <Box fontSize="2em" >
            Pokedex
          </Box>
          <div className="searchBar">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                fontSize="2em"
                paddingTop='.8%'
                paddingLeft='.5%'
                children= "&#128270;"
              ></InputLeftElement>
              <Input placeholder="Search" _placeholder={{color: 'white'}} size="lg" width="80%"></Input>
            </InputGroup>
          </div>

          <div className="rightButton">
            <Button
              size="lg"
              colorScheme="teal"
              variant="solid"
              borderRadius="50%"
              fontSize="1.3em"
            >
              &#10095;
            </Button>
          </div>
        </Flex>
      </div>
      <div className="pageBody">


      </div>
    </div>

    
  );
}

export default App;
