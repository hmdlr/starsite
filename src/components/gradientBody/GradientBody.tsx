import React from "react";
import './gradientBody.css'

const GradientBody = (props: { children: any }) => {
  return (
      <div className={'gradient-body'}>
        {props.children}
      </div>
  );
};

export default GradientBody;
