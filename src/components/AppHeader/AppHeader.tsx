import { Box, Button, Flex, Input, InputGroup, InputRightElement, Image, Show } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMetaValue } from "../../context/MetaValueContext";
import pokedexText from "/PokemonText.png";

function AppHeader() {

  let [searchParams, setSearchParams ] = useSearchParams();
  let pageNumber = searchParams.get('page') ?? 1;
  let searchValue = searchParams.get('name') ?? ""; 

  const {meta} = useMetaValue();

  

  const handleClickMinus = () => {
    if (pageNumber > 1) {
      setSearchParams({
        name: `${searchValue}`,
        page: `${+pageNumber - 1}`,
      });
    } else  {
      setSearchParams({
        name: `${searchValue}`,
        page: `${ meta?.last_page }`,
      });
    }
  };

  const handleHomeButton = () => {
    setSearchParams({
      page: `${ 1 }`,
    });
  };

  function handleSearchInput(event: any) {
    setSearchParams({
      name: `${event.target.value}`,
      page: `${ 1 }`,
    });
  }

  const handleClearButton = () => {
    setSearchParams({
      page: `${ 1 }`,
    });
  };

  const handleClickPlus = () => {
    if (pageNumber < meta?.last_page!) {
      setSearchParams({
        name: `${searchValue}`,
        page: `${+pageNumber + 1}`,
      });
    } else {
      setSearchParams({
        name: `${searchValue}`,
        page: `${ 1 }`,
      });
    }
  };


  return (
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
          justifyContent="center"
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
              <Image
                src={pokedexText}
                maxW={["20", "100", "250"]}
                onClick={handleHomeButton}
              />{" "}
            </Box>

            <Box
              width="60%" //--------------SEARCH BAR------------------
            >
              <InputGroup
                bg="whiteAlpha.100"
                justifyContent="center"
                alignContent="center"
                ringColor="white"
              >
                <Input
                boxShadow="0 0 0 1px #cce6e6"
                  flexGrow="1"
                  placeholder="Search"
                  _placeholder={{ color: "white" }}
                  size={["sm", "md", "lg"]}
                  width="80%"
                  color="white"
                  outline="gray"
                  fontSize="50"
                  onChange={handleSearchInput}
                  value={searchValue}
                ></Input>
                <InputRightElement h="100%" width="4.5rem" paddingRight="2%">
                  
                  <Button
                    h="70%"
                    size="md"
                    textColor="white"
                    bg="teal"
                    onClick={handleClearButton}
                  >
                    Clear
                  </Button>
                
                </InputRightElement>
              </InputGroup>
            </Box>

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
  );
}

export default AppHeader;

