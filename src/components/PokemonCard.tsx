import React from "react";
import App from "../App";
import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ArtMenu from "./ArtMenu";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/PokemonCard.css";

interface Props {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
  artStyle: string;
}

const PokemonCard = ({ id, name, image, types, artStyle }: Props) => {
  let selectedArtStyle = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  const navigate = useNavigate();

  let sugimoriId = "1";

  switch (true) {
    case id < 10:
      sugimoriId = "0" + "0" + id;
      break;
    case id < 100:
      sugimoriId = "0" + id;
      break;
    default:
      sugimoriId = "" + id;
  }

  const threeDURL = `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;
  const eightBitURL = `https:\/\/intern-pokedex.myriadapps.com\/images\/pokemon\/${id}.png`;
  const cartoonURL = `https://img.pokemondb.net/artwork/vector/${name.toLowerCase()}.png`;
  const pokedexURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${sugimoriId}.png`;

  switch (artStyle) {
    case "1":
      selectedArtStyle = cartoonURL;
      break;
    case "2":
      selectedArtStyle = pokedexURL;
      break;
    case "3":
      selectedArtStyle = threeDURL;
      break;
    case "4":
      selectedArtStyle = eightBitURL;
      break;
    default:
      selectedArtStyle = pokedexURL;
      break;
  }

  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    navigate("/Id/" + id);
  };

  return (
    <Button
      onClick={handleCardClick}
      bg="gray.100"
      borderRadius="10"
      shadow="base"
      h="100%"
      flexDirection="column"
    >
      <Flex paddingRight="60%">
        <Box fontSize={["10", "12", "20"]} fontWeight="medium" paddingTop="2">
          {name}
        </Box>
        <Box
          fontSize={["5", "8", "15"]}
          paddingLeft="2"
          color="gray"
          paddingTop="3"
        >
          #{id}
        </Box>
      </Flex>
      <Flex justifyContent="center" minH="200">
        <Image
          src={selectedArtStyle}
          maxH={["100", "150", "200"]}
          maxW={["100", "150", "200"]}
          minH={["50", "100", "150"]}
          minW={["50", "100", "150"]}
          paddingBottom="5"
          paddingTop="5"
        />
      </Flex>

      <Flex
        justifyContent="flex-end"
        paddingBottom="2"
        paddingLeft="72%"
        gap={["1", "2", "3"]}
        fontSize={["5", "8", "12"]}
      >
        {types.map((type) => (
          <Box
            key={type}
            border="1px"
            borderRadius="5"
            className={type}
            padding="1"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Box>
        ))}
      </Flex>
    </Button>
  );
};

export default PokemonCard;

