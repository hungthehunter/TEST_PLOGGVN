import { type FC, type PropsWithChildren } from "react";
import Header from "../Layout/Header";
import "../../styles/DefaultComponentStyle.css"
const DefaultComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="container-wrapper">
      {children}
      </div>
    </div>
  );
}

export default DefaultComponent;