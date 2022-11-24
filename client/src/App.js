import React from "react";
import { Container } from "@material-ui/core";

import { Navbar } from "./components/Navbar/Navbar";
import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import Home from "./components/Home/Home.js";
import  Auth  from "./components/Auth/Auth.js";
const App = () => {
	
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
    <Navbar />
     <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/auth" exact element={<Auth/>}/>
     </Routes>
    </Container>
    </BrowserRouter>
  );
};

export default App;
