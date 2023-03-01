import './home.scss';
import React from "react";
import { About } from "./about/About";

export const Home = () => {
  return (
      <div className={'home_container'}>
        <About/>
      </div>
  );
};
