import React, { useRef, useState } from "react";
import { data } from "./data";
import { files } from "./data";

import "./App.css";

import Editor from "@monaco-editor/react";
import FolderTree from "react-folder-tree";

import "react-folder-tree/dist/style.css";

import Header from "./components/Header";

import { FaRegHeart } from 'react-icons/fa';
import { AiFillSave } from "react-icons/ai";


function App() {
  const monacoRef = useRef(null);
  const [content, setContent] = useState({});
  const [fileData,setFileData]=useState(files)

  const handleOnClick = (id) => {
    const contentData = fileData.find((data) => data.id === id);
    setContent(contentData);
    console.log("contentData",contentData);
  };
  function handleEditorChange(value, event) {
 
    // console.log("value triggered on editor change", value);

    setContent((prevContent)=>({...prevContent,content:value}))

  }
  // const onTreeStateChange = (state, event) => console.log(state, event);
  
  const onNameClick = ({ defaultOnClick, nodeData }) => {
    defaultOnClick();
    console.log("nodeData.id",nodeData.id);
    handleOnClick(nodeData.id);
  };

  const handleKeyDown = (event) => {
    // event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      const foundIndex = fileData.findIndex(t => t.id === content.id)
      console.log("files array index values",foundIndex);
      if(foundIndex!==-1){
        let temp = fileData;
        temp[foundIndex].content = content.content
        console.log("updated data file",temp); 
        console.log("content state ",content);   
        setFileData(temp)
  
      }
    }
  };
  const handleSave=()=>{
    console.log("content state ",content);   
    const foundIndex = fileData.findIndex(t => t.id === content.id)
      console.log("files array index values",foundIndex);
      if(foundIndex!==-1){
        let temp = fileData;
        temp[foundIndex].content = content.content
        console.log("updated data file",temp); 
        setFileData(temp)
  
      }

  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="left">
          {/* <Sidebar data={data} handleOnClick={handleOnClick}/> */}
          <FolderTree
            data={data}
            // onChange={onTreeStateChange}
            onNameClick={onNameClick}
            showCheckbox={false}
            indentPixels={12}
          />
        </div>
        <div className="right">
          <div className="save-button"><span className="save-icon" onClick={handleSave}><AiFillSave/></span> </div>
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


