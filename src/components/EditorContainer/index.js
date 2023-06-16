import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import FolderTree from "react-folder-tree";
import { AiFillSave, AiFillDelete } from "react-icons/ai";
import { BiWifi0, BiX } from "react-icons/bi";
import "react-folder-tree/dist/style.css";

import { files } from "../../data";
import {
  base_url,
  deleteFileById,
  UpdateFileByID,
  fetchFileById,
} from "../../api";

const EditorContainer = () => {
  const [content, setContent] = useState({});
  const [fileData, setFileData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [isDirectory, setIsDirectory] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOnClick = (id, isDirectory) => {
    const contentData = fileData.find((data) => data.id === id);
    setContent(contentData);
    setIsDirectory(isDirectory);
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
    handleOnClick(nodeData.id, nodeData.isDirectory);
    // fetchFileById(nodeData.id,nodeData.isDirectory,setContent,setIsDirectory)  //fetching file data using API
  };

  const DeleteIcon = ({ onClick: defaultOnClick, nodeData }) => {
    return (
      <AiFillDelete
        onClick={() => {
          deleteFileById(nodeData.id);
        }}
      />
    );
  };

  const handleSave = () => {
    // UpdateFileByID(content.id,content)  //upadting file data using API
    const foundIndex = fileData.findIndex((t) => t.id === content.id);
    if (foundIndex !== -1) {
      let temp = fileData;
      temp[foundIndex].content = content.content;
      setFileData(temp);
    }
    setEdit(false);
  };

  useEffect(() => {
    async function fetchTreeData() {
      const resp = await fetch(`${base_url}/db`);
      const { files, filetree } = await resp.json();
      setTreeData(filetree[0]);
      setFileData(files);
    }
    fetchTreeData();
  }, []);

  return (
    <div className="container">
      <div className="left">
        <FolderTree
          data={treeData}
          onNameClick={onNameClick}
          showCheckbox={false}
          indentPixels={12}
          iconComponents={{ DeleteIcon }}
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
        />
      </div>
    </div>
  );
};

export default EditorContainer;
