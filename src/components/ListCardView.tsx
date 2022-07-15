import React from "react";
import App from "../App";
import {
  Box,
  Flex,
  Image,
  Button,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/PokemonCard.css";

interface Props {
  id: number;
  name: string;
  image: string;
  types: Array<string>;
  artStyle: string;
  
}

const ListCardView = ({
  id,
  name,
  image,
  types,
  artStyle,
 
}: Props) => {
  let selectedArtStyle = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  const navigate = useNavigate();

  //need special cases for 5 pokemon as they have special characters
  let specialCharacter = "";
  switch (true) {
    case id == 29:
      specialCharacter = "nidoran-m";
      break;
    case id == 32:
      specialCharacter = "nidoran-f";
      break;
    case id == 83:
      specialCharacter = "farfetchd";
      break;
    case id == 122:
      specialCharacter = "mr-mime";
      break;
    case id == 439:
      specialCharacter = "mime-jr";
      break;
    default:
      specialCharacter = name;
      break;
  }

  //the links have different formats for pokemon, this one uses underscores
  let specialCharacter3d = "";
  switch (true) {
    case id == 29:
      specialCharacter3d = "nidoran_m";
      break;
    case id == 32:
      specialCharacter3d = "nidoran_f";
      break;
    case id == 83:
      specialCharacter3d = "farfetchd";
      break;
    case id == 122:
      specialCharacter3d = "mr.mime";
      break;
    case id == 439:
      specialCharacter3d = "mime_jr";
      break;
    default:
      specialCharacter3d = name;
      break;
  }

  //this needs three digits so this appends zeros if its less than three digits
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

  const threeDURL = `https://img.pokemondb.net/sprites/home/normal/${specialCharacter.toLowerCase()}.png`;
  const eightBitURL = `https:\/\/intern-pokedex.myriadapps.com\/images\/pokemon\/${id}.png`;
  const cartoonURL = `https://img.pokemondb.net/artwork/vector/${specialCharacter.toLowerCase()}.png`;
  const pokedexURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${sugimoriId}.png`;
  const real3DURL = `https://projectpokemon.org/images/normal-sprite/${specialCharacter3d.toLowerCase()}.gif`;

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
    case "5":
      selectedArtStyle = real3DURL;
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
        flexDirection="row"
        justifyContent="space-between"
        h="fit-content"
        className={types[0]}
        border="1px"
        onClick={handleCardClick}
      >
        <Box fontSize={["10", "20", "30"]} fontFamily="cursive">
          #{id}
        </Box>

        <Box fontSize={["10", "15", "25"]}>{name}</Box>
        <Image src={selectedArtStyle} maxH="20" />
        <Box>
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
        </Box>
      </Button>
    
  );
};

export default ListCardView;
