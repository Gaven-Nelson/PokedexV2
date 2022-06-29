import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import React from "react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Details from "./components/Details";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<App />}/>
        <Route path="/page" element={<App />} />
        <Route path="/page/:pageNumber" element={<App />} />
        <Route path="/Id/:id" element ={<Details key={undefined} id={1} name={""} image={""} types={[]} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;