import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import { data } from "./data";
import "./App.css";
import Editor from "@monaco-editor/react";
import FolderTree, { testData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";

const files = [
  {
    id: 3,
    name: "Hello.java",
    content:
      '/*\r\n * Copyright 2012 Veezoo, Inc.\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the "License");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n */\r\n\r\npackage com.veezoo.hello;\r\n\r\nimport java.io.IOException;\r\nimport java.util.Arrays;\r\nimport java.util.Collections;\r\n\r\nimport javax.annotation.Nullable;\r\nimport javax.inject.Singleton;\r\n\r\nimport org.slf4j.Logger;\r\nimport org.slf4j.LoggerFactory;\r\n\r\n/**\r\n *\r\n * A default implementation of Hello server as required by\r\n * {@link HelloPropertyFactory}.\r\n *\r\n */\r\n@Singleton\r\npublic class Hello implements AbstractHello {\r\n    private static final String TEST = "test";\r\n    private static final Logger logger = LoggerFactory.getLogger(Hello.class);\r\n    private static final HelloPropertyFactory configInstance = com.veezoo.hello.HelloPropertyFactory\r\n            .getInstance();\r\n    private static final int TIME_TO_WAIT_FOR_GREETING = 30000;\r\n\r\n    public static void main(String[] args) {\r\n        // do nothing\r\n    }\r\n\r\n}',
  },
  {
    id: 4,
    name: "Main.java",
    content:
      '/*\r\n * Copyright 2012 Veezoo, Inc.\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the "License");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n */\r\n\r\npackage com.veezoo.main;\r\n\r\nimport java.io.IOException;\r\nimport java.util.Arrays;\r\nimport java.util.Collections;\r\n\r\nimport javax.annotation.Nullable;\r\nimport javax.inject.Singleton;\r\n\r\nimport org.slf4j.Logger;\r\nimport org.slf4j.LoggerFactory;\r\n\r\n/**\r\n *\r\n * A default implementation of Main server as required by\r\n * {@link MainPropertyFactory}.\r\n *\r\n */\r\n@Singleton\r\npublic class Main implements AbstractMain {\r\n    private static final String TEST = "test";\r\n    private static final Logger logger = LoggerFactory.getLogger(Main.class);\r\n    private static final MainPropertyFactory configInstance = com.veezoo.Main.MainPropertyFactory\r\n            .getInstance();\r\n    private static final int TIME_TO_WAIT_FOR_GREETING = 30000;\r\n\r\n    public static void main(String[] args) {\r\n        // do nothing\r\n    }\r\n\r\n}',
  },
  {
    id: 5,
    name: "Home.java",
    content:
      '/*\r\n * Copyright 2012 Veezoo, Inc.\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the "License");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n */\r\n\r\npackage com.veezoo.home;\r\n\r\nimport java.io.IOException;\r\nimport java.util.Arrays;\r\nimport java.util.Collections;\r\n\r\nimport javax.annotation.Nullable;\r\nimport javax.inject.Singleton;\r\n\r\nimport org.slf4j.Logger;\r\nimport org.slf4j.LoggerFactory;\r\n\r\n/**\r\n *\r\n * A default implementation of Home server as required by\r\n * {@link HomePropertyFactory}.\r\n *\r\n */\r\n@Singleton\r\npublic class Home implements AbstractHome {\r\n    private static final String TEST = "test";\r\n    private static final Logger logger = LoggerFactory.getLogger(Home.class);\r\n    private static final HomePropertyFactory configInstance = com.veezoo.Home.HomePropertyFactory\r\n            .getInstance();\r\n    private static final int TIME_TO_WAIT_FOR_GREETING = 30000;\r\n\r\n    public static void main(String[] args) {\r\n        // do nothing\r\n    }\r\n\r\n}',
  },
  {
    id: 7,
    name: "Message.java",
    content:
      '/*\r\n * Copyright 2012 Veezoo, Inc.\r\n *\r\n *    Licensed under the Apache License, Version 2.0 (the "License");\r\n *    you may not use this file except in compliance with the License.\r\n *    You may obtain a copy of the License at\r\n *\r\n *        http://www.apache.org/licenses/LICENSE-2.0\r\n */\r\n\r\npackage com.veezoo.message;\r\n\r\nimport java.io.IOException;\r\nimport java.util.Arrays;\r\nimport java.util.Collections;\r\n\r\nimport javax.annotation.Nullable;\r\nimport javax.inject.Singleton;\r\n\r\nimport org.slf4j.Logger;\r\nimport org.slf4j.LoggerFactory;\r\n\r\n/**\r\n *\r\n * A default implementation of Message server as required by\r\n * {@link MessagePropertyFactory}.\r\n *\r\n */\r\n@Singleton\r\npublic class Message implements AbstractMessage {\r\n    private static final String TEST = "test";\r\n    private static final Logger logger = LoggerFactory.getLogger(Message.class);\r\n    private static final MessagePropertyFactory configInstance = com.veezoo.Message.MessagePropertyFactory\r\n            .getInstance();\r\n    private static final int TIME_TO_WAIT_FOR_GREETING = 30000;\r\n\r\n    public static void main(String[] args) {\r\n        // This prints Hello World to the console\r\n        System.out.println("Hello World");\r\n    }\r\n\r\n    public static int add(int a, int b) {\r\n        return a + b;\r\n    }\r\n\r\n    public static int multiply(int a, int b) {\r\n        return a * b;\r\n    }\r\n\r\n}',
  },
  {
    id: 8,
    name: "MessageComposer.java",
    content:
      "package com.veezoo.message;\r\n\r\n\r\n@Singleton\r\npublic class MessageComposer implements AbstractMessageComposer {\r\n    \r\n\r\n}",
  },
  {
    id: 10,
    name: "MessageSpec.java",
    content:
      "package com.veezoo.message;\r\n\r\n\r\n@Singleton\r\npublic class MessageSpec implements AbstractMessageSpec {\r\n    \r\n\r\n}",
  },
  {
    id: 11,
    name: "MessageComposerSpec.java",
    content:
      "package com.veezoo.message;\r\n\r\n\r\n@Singleton\r\npublic class MessageComposerSpec implements AbstractMessageComposerSpec {\r\n    \r\n\r\n}",
  },
];

function App() {
  const monacoRef = useRef(null);
  const [content, setContent] = useState(``);

  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = editor;
  }

  const handleOnClick = (id) => {
    console.log(id);
    const contentData = files.find((data) => data.id == id);
    setContent(contentData);
  };
  const onTreeStateChange = (state, event) => console.log(state, event);
  console.log(content);
  const onNameClick = ({ defaultOnClick, nodeData }) => {
    defaultOnClick();
    handleOnClick(nodeData.id);
  };
  return (
    <div className="container">
      <div className="left">
        {/* <Sidebar data={data} handleOnClick={handleOnClick}/> */}
        <FolderTree
          data={data}
          onChange={onTreeStateChange}
          onNameClick={onNameClick}
        />
      </div>
      <div className="right">
        <Editor
          height="100vh"
          defaultLanguage="java"
          defaultValue="JavaScript"
          value={content && content?.content}
          // beforeMount={handleEditorWillMount}
          // onMount={handleEditorDidMount}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}

export default App;
