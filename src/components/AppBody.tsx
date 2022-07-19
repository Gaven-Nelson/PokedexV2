import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { useArtStyle } from "../context/ArtStyleContext";
import { usePokemonArray } from "../context/PokemonArrayContext";
import { usePokemon } from "../context/PokemonContext";
import ListCardView from "./ListCardView";
import PokemonCard from "./PokemonCard";
import { PokemonArrayItem } from '../App';

interface Props {
  pokemonArray: Array<PokemonArrayItem>;
}


function AppBody({pokemonArray}: Props) {
  interface Pokemon {
    id?: number;
    name?: string;
    image?: string;
    types?: Array<string>;
  }


  const { artStyle } = useArtStyle();
  //const { pokemonArray } = usePokemonArray();
  const { pokemon } = usePokemon();

  return (
    <Tabs //-------------------TAB SELECTOR-------------------------
    >
      <TabList paddingLeft="5">
        <Tab>&#8862; Grid</Tab>
        <Tab>&#x2263; List</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid
            spacing="10"
            minChildWidth={280}
            justifyItems="center"
          >
            {pokemonArray.map((pokemon: PokemonArrayItem) => (
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
            {pokemonArray.map((pokemon: PokemonArrayItem) => (
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
  );
}

export default AppBody;
