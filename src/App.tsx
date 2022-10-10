import React, { useEffect, useState, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import loadingIcon from "./assets/loading-svgrepo-com.svg";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";

const ApiTest = React.lazy(() => {
  return import("./components/ApiTest");
});

function App() {

  return (
    <div className="App">
      <SearchBox />
      <Suspense fallback={"Loading..."}>
        <ApiTest />
      </Suspense>

      <SearchResult />
    </div>
  );
}

export default App;
