import React from "react";

const MainPageComponent = ({ submittedData }) => {
  return (
    <div>
      <h1>Submitted Form Data</h1>
      <p>Nickname: {submittedData.nickname}</p>
      <p>LP Background: {submittedData.lpBackground}</p>
      <p>LP Design: {submittedData.lpDesign}</p>
    </div>
  );
};

export default MainPageComponent;
