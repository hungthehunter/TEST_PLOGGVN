
import React from 'react';
import "./App.css";
import {routes} from "./routes/index.js"
import { Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent.tsx";

function App() {
  return (
    <>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader
              ? DefaultComponent
              : React.Fragment;
            const Path = route.path;
            return (
              <Route
                key={Path}
                path={Path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
    </>
  );
}

export default App;