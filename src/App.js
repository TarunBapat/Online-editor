import React from "react";
import "./App.css";

import "react-folder-tree/dist/style.css";

import Header from "./components/Header";
import EditorContainer from "./components/EditorContainer";

function App() {
  return (
    <>
      <Header />
      <EditorContainer />
    </>
  );
}

export default App;
