import React from "react";

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

export default Snowflake;
