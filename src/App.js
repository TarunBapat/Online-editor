import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import { files } from "./data";

import "./App.css";

import Editor from "@monaco-editor/react";
import FolderTree from "react-folder-tree";

import "react-folder-tree/dist/style.css";

import Header from "./components/Header";

import { AiFillSave } from "react-icons/ai";
import { BiWifi0,BiX } from "react-icons/bi";
import MockServer from "./components/MockServer";

function App() {
  const monacoRef = useRef(null);
  const [content, setContent] = useState({});
  const [fileData, setFileData] = useState(files);
  const [treeData, setTreeData] = useState([]);
  const [isDirectory,setIsDirectory]=useState(false);
  const [edit,setEdit]=useState(false)

  useEffect(() => {
    async function fetchTreeData() {
      const resp = await fetch(
        "https://my-json-server.typicode.com/open-veezoo/editor/filetree"
      );
      const data = await resp.json();
      console.log(data);
      setTreeData(data[0]);
    }
    fetchTreeData();
  }, []);

  // const fetchFileById=async(id)=>{

  // }
  const handleOnClick = (id,isDirectory) => {
    const contentData = fileData.find((data) => data.id === id);
    // fetchFileById()
    setContent(contentData);
    setIsDirectory(isDirectory)
    console.log("contentData", contentData);
  };
  function handleEditorChange(value, event) {
    // console.log("value triggered on editor change", value);
    console.log("event=", event);
    setEdit(true)
    setContent((prevContent) => ({ ...prevContent, content: value}));
    
  }
  // const onTreeStateChange = (state, event) => console.log(state, event);

  const onNameClick = ({ defaultOnClick, nodeData }) => {
    setEdit(false);
    // defaultOnClick();
    {edit && console.log("xsgfxsg")}
    console.log("nodeData", nodeData);
    handleOnClick(nodeData.id,nodeData.isDirectory);
  };

  const handleKeyDown = (event) => {
    // event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      const foundIndex = fileData.findIndex((t) => t.id === content.id);
      console.log("files array index values", foundIndex);
      if (foundIndex !== -1) {
        let temp = fileData;
        temp[foundIndex].content = content.content;
        console.log("updated data file", temp);
        console.log("content state ", content);
        setFileData(temp);
      }
    }
  };
  const handleSave = () => {
    console.log("content state ", content);
    const foundIndex = fileData.findIndex((t) => t.id === content.id);
    console.log("files array index values", foundIndex);
    if (foundIndex !== -1) {
      let temp = fileData;
      temp[foundIndex].content = content.content;
      console.log("updated data file", temp);
      setFileData(temp);
    }
    setEdit(false)
  };
  console.log("Tree data", treeData);
  return (
    <>
      <Header />
      {/* <MockServer/>  */}
      <div className="container">
        <div className="left">
          {/* <Sidebar data={data} handleOnClick={handleOnClick}/> */}
          <FolderTree
            data={treeData}
            // onChange={onTreeStateChange}
            onNameClick={onNameClick}
            showCheckbox={false}
            indentPixels={12}
            
          />
        </div>
        <div className="right">
          <div className="save-button">
            <span className="save-icon" onClick={handleSave}>
              <AiFillSave />
            </span>{" "}
            {!isDirectory && <span className="current-file">{content.name}&nbsp;&nbsp;{edit?<BiWifi0 color="#fff"/>:<BiX color="#fff"/>}</span>}
          </div>
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
