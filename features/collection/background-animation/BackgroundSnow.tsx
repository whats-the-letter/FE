import React from "react";
import Snowflake from "./Snowflakes";

const BackgroundSnow: React.FC = () => {
  return (
    <div className="relative h-screen m-auto bg-snow-background z-0">
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-100px);
            }
            100% {
              transform: translateY(100vh);
            }
          }
            .bg-snow-background {
                background: radial-gradient(ellipse at bottom, 
                #1b2735 0%, #090a0f 100%);
                background-size: 100% 200%;
                background-repeat: no-repeat;
                background-attachment: fixed;
                }
        
          .snowflake {
            position: absolute;
            background-color: #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 10px #ffffff;
            animation-iteration-count: infinite;
            animation: snowfall linear infinite;
            animation-timing-function: linear;
          }
        `}
      </style>

      {[...Array(100)].map((_, index) => (
        <Snowflake
          key={index}
          speed={Math.random() * 10 + 5}
          size={Math.random() * 15 + 5}
          left={Math.random() * 100}
          delay={Math.random() * 10}
          opacity={Math.random()}
        />
      ))}
    </div>
  );
};

export default BackgroundSnow;
