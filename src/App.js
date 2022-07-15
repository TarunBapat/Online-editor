import React, { useEffect, useState } from "react";

import { files } from "./data";

import "./App.css";

import Editor from "@monaco-editor/react";
import FolderTree from "react-folder-tree";

import "react-folder-tree/dist/style.css";

import Header from "./components/Header";

import { AiFillSave } from "react-icons/ai";
import { BiWifi0, BiX } from "react-icons/bi";

function App() {
  const [content, setContent] = useState({});
  const [fileData, setFileData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [isDirectory, setIsDirectory] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function fetchTreeData() {
      const resp = await fetch(
        "https://my-json-server.typicode.com/open-veezoo/editor/db"
      );
      const { files, filetree } = await resp.json();

      setTreeData(filetree[0]);
      setFileData(files);
    }
    fetchTreeData();
  }, []);

  console.log("file Data", fileData);
  const fetchFileById = async (id, isDirectory) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/open-veezoo/editor/files/${id}`
    );
    const data = await response.json();
    console.log(data);
    setContent(data);
    setIsDirectory(isDirectory);
  };
  const UpdateFileByID = async (id) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/open-veezoo/editor/files/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      }
    );
  };
  const handleOnClick = (id, isDirectory) => {
    const contentData = fileData.find((data) => data.id === id);
    setContent(contentData);
    setIsDirectory(isDirectory);
    console.log("contentData", contentData);
  };

  function handleEditorChange(value, event) {
    setContent((prevContent) => {
      setEdit(true);
      return { ...prevContent, content: value };
    });
  }

  const onNameClick = ({ defaultOnClick, nodeData }) => {
    setEdit(false);
    defaultOnClick();
    console.log("nodeData", nodeData);
    handleOnClick(nodeData.id, nodeData.isDirectory);
    // fetchFileById(nodeData.id,nodeData.isDirectory)
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
    setEdit(false);
  };
  console.log("Tree data", treeData);
  return (
    <>
      <Header />

      <div className="container">
        <div className="left">
          <FolderTree
            data={treeData}
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
            {!isDirectory && (
              <span className="current-file">
                {content.name}
                {edit ? <BiWifi0 color="#fff" /> : <BiX color="#fff" />}
              </span>
            )}
          </div>
          <Editor
            height="100vh"
            defaultLanguage="java"
            defaultValue={files[0].content}
            value={content && content?.content}
            onChange={handleEditorChange}
            theme="vs-dark"
            onMount={() => console.log("mount")}
          />
        </div>
      </div>
    </>
  );
}

export default App;
