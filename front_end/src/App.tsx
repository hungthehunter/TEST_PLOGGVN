
import React from 'react';
import "./App.css";
// import { routes } from "./routes/index";
import {routes} from "./routes/index.js"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent.tsx";

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;