import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import React from "react";
import { Box, ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Details from "./components/Details/Details";


function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<App />}/>
        <Route path="/Id/:id" element ={<Details key={undefined} id={1} name={""} image={""} types={[]} />}/>
        <Route path="*" element={<Box justifyContent="center" fontSize="20">404: Page not found</Box>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
