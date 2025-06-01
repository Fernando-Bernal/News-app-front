import React from "react";
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';


function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
