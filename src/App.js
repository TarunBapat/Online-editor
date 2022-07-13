import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import { data } from "./data";
import { files } from "./data";
import "./App.css";
import Editor from "@monaco-editor/react";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import Header from "./components/Header";

function App() {
  const monacoRef = useRef(null);
  const [content, setContent] = useState(``);

  const handleOnClick = (id) => {
    const contentData = files.find((data) => data.id == id);
    setContent(contentData);
  };
  function handleEditorChange(value, event) {
    console.log(content);
    console.log("event triggered on editor change", event);
    console.log("value triggered on editor change", value);
    let originalContent = files.find((data) => data.id == content.id);
    console.log("originalContent", originalContent);
    // console.log("originalContent.content",originalContent.content);
    // originalContent.content=value
  }
  const onTreeStateChange = (state, event) => console.log(state, event);
  console.log(content);
  const onNameClick = ({ defaultOnClick, nodeData }) => {
    defaultOnClick();
    handleOnClick(nodeData.id);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="left">
          {/* <Sidebar data={data} handleOnClick={handleOnClick}/> */}
          <FolderTree
            data={data}
            onChange={onTreeStateChange}
            onNameClick={onNameClick}
            showCheckbox={false}
            indentPixels={12}
          />
        </div>
        <div className="right">
          <Editor
            height="100vh"
            defaultLanguage="java"
            defaultValue="JavaScript"
            value={content && content?.content}
            onChange={handleEditorChange}
            theme="vs-dark"
          />
        </div>
      </div>
    </>
  );
}

export default App;
