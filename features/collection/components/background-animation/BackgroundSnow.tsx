import React from "react";

const BackgroundSnow: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-snow-background">
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
      background: radial-gradient(ellipse at center, #D0D0D0 0%, #FFFFFF 100%);
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

interface SnowflakeProps {
  speed: number;
  size: number;
  left: number;
  delay: number;
  opacity: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({
  speed,
  size,
  left,
  delay,
  opacity,
}) => (
  <div
    className="snowflake"
    style={{
      animationDuration: `${speed}s`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: opacity,
    }}
  />
);
