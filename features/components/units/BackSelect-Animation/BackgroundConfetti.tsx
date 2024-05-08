import React from "react";

const BackgroundConfetti = () => {
  return (
    <>
      <div className="fixed inset-0 bg-snow-background">
        <style>
          {`
      @keyframes snowfall {
        0% {
          transform: translateY(-100px) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }
      .bg-snow-background {
        background: radial-gradient(ellipse at center, #FDEAEA 0%, #FFFFFF 100%);
        background-size: 100% 200%;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
    
      .snow {
        position: absolute;
        animation: snowfall linear infinite;
      }


      .particles {
        position: absolute;
        animation: snowfall linear infinite;
      }
    @keyframes confetti-spin {
        0% {
          transform: rotate3d(0, 1, 1, 360deg);
        }

        50% {
          transform: rotate3d(0, 1, 1, 180deg);
        }
        
        100% {
          transform: rotate3d(0, 0, 0, 0);
        }
      }

      @keyframes confetti-fall {
        0% {
          transform: translateY(0px);
          opacity: 1;
        }

        50% {
          opacity: 1;
        }

        100% {
          transform: translateY(110vh);
          opacity: 0;
        }
      }

      .confetti {
        position: fixed;
        animation: confetti-fall 5s ease-out infinite;
        width: 20px;
        height: 20px;
      }

      .confetti::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        animation: confetti-spin 1s linear infinite;
      }

      .confetti:nth-child(1)::before {
        background-color: #AEE8FD;
      }

      .confetti:nth-child(2)::before {
        background-color: #CFFDAE;
        animation-delay: -5s;
        animation-fill-mode: backwards;
        animation-duration: 1.5s;
      }

      .confetti:nth-child(3)::before {
        background-color: #FDC7AE;
        animation-delay: -3s;
      }

      .confetti:nth-child(4)::before {
        background-color: #30A64B;
        animation-delay: -2.5s;
        animation-fill-mode: backwards;
        animation-duration: 1.2s;
      }

      .confetti:nth-child(5)::before {
        background-color: #FDAEF7;
        animation-delay: -4s;
      }

      .confetti:nth-child(6)::before {
        background-color: #9CFD5D;
        animation-delay: -6s;
        animation-fill-mode: backwards;
        animation-duration: 1.1s;
      }

      .confetti:nth-child(7)::before {
        background-color: #FED24E;
        animation-delay: -1.5s;
      }

      .confetti:nth-child(8)::before {
        background-color: #D1CFFD;
        animation-delay: -2s;
        animation-fill-mode: backwards;
        animation-duration: 1.8s;
      }

      .confetti:nth-child(9)::before {
        background-color: #E84FA9;
        animation-delay: -3.5s;
      }

      .confetti:nth-child(10)::before {
        background-color: #6F47BF;
        animation-delay: -2.5s;
        animation-fill-mode: backwards;
        animation-duration: 1.3s;
      }

      .confetti:nth-child(11)::before {
        background-color: #FDCFCF;
        animation-delay: -7s;
        animation-fill-mode: backwards;
        animation-duration: 1.1s;
      }

      .confetti:nth-child(12)::before {
        background-color: #FED24E;
        animation-delay: -3.5s;
      }

      .confetti:nth-child(13)::before {
        background-color: #1369D3;
        animation-delay: -4s;
        animation-fill-mode: backwards;
        animation-duration: 1.8s;
      }

      .confetti:nth-child(14)::before {
        background-color: #E84FA9;
        animation-delay: -8.5s;
      }

      .confetti:nth-child(1)::before {
        background-color: #6F47BF;
        animation-delay: -2.5s;
        animation-fill-mode: backwards;
        animation-duration: 1.3s;
      }

      .confetti:nth-child(1) {
        left: 10%;
        width: 20px;
        height: 20px;
      }

      .confetti:nth-child(2) {
        left: 20%;
        animation-delay: -5s;
        width: 15px;
        height: 15px;
      }

      .confetti:nth-child(3) {
        left: 30%;
        animation-delay: -3.2s;
        width: 10px;
        height: 10px;
      }

      .confetti:nth-child(4) {
        left: 40%;
        animation-delay: -2.5s;
        width: 12px;
        height: 12px;
      }

      .confetti:nth-child(5) {
        left: 50%;
        animation-delay: -4.1s;
        transform: scale(1.3);
      }

      .confetti:nth-child(6) {
        left: 60%;
        animation-delay: -6.8s;
        width: 16px;
        height: 16px;
      }

      .confetti:nth-child(7) {
        left: 70%;
        animation-delay: -1.5s;
        width: 18px;
        height: 18px;
      }

      .confetti:nth-child(8) {
        left: 80%;
        animation-delay: -2s;
        width: 22px;
        height: 22px;
      }

      .confetti:nth-child(9) {
        left: 90%;
        animation-delay: -3.5s;
        width: 8px;
        height: 8px;
      }

      .confetti:nth-child(10) {
        left: 100%;
        animation-delay: -2.5s;
        width: 60px;
        height: 24px;
      }
      

      .confetti:nth-child(11) {
        left: 60%;
        animation-delay: -6.8s;
        width: 16px;
        height: 16px;
      }

      .confetti:nth-child(12) {
        left: 70%;
        animation-delay: -1.5s;
        width: 18px;
        height: 18px;
      }

      .confetti:nth-child(13) {
        left: 30%;
        animation-delay: -2s;
        width: 22px;
        height: 40px;
      }

      .confetti:nth-child(14) {
        left: 90%;
        animation-delay: -3.5s;
        width: 8px;
        height: 8px;
      }

      .confetti:nth-child(15) {
        left: 100%;
        animation-delay: -2.5s;
        width: 24px;
        height: 24px;
      }
 
  `}
        </style>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>

        {[...Array(13)].map((_, index) => (
          <Snow
            key={index}
            speed={Math.random() * 8 + 4}
            width={Math.random() * 40 + 5}
            height={Math.random() * 2 + 4}
            left={Math.random() * 100}
            top={Math.random() * 100}
            rotation={Math.random() * 360}
            backgroundColor={`rgb(${Math.random() * 155 + 100},${
              Math.random() * 155 + 100
            },${Math.random() * 155 + 100})`}
          />
        ))}

        {[...Array(15)].map((_, index) => (
          <Particles
            key={index}
            speed={Math.random() * 8 + 4}
            size={Math.random() * 10 + 1}
            left={Math.random() * 100}
            top={Math.random() * 100}
            rotation={Math.random() * 180}
            backgroundColor={`rgb(${Math.random() * 155 + 100},${
              Math.random() * 155 + 100
            },${Math.random() * 155 + 100})`}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundConfetti;
interface SnowProps {
  speed: number;
  width: number;
  height: number;
  left: number;
  top: number;
  rotation: number;
  backgroundColor: string;
}

const Snow: React.FC<SnowProps> = ({
  speed,
  width,
  height,
  left,
  top,
  rotation,
  backgroundColor,
}) => (
  <div
    className="snow"
    style={{
      animation: `snowfall ${speed}s linear infinite`,
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}px`,
      height: `${height}px`,
      transform: `rotate(${rotation}deg)`,
      backgroundColor: backgroundColor,
    }}
  />
);

interface ParticlesProps {
  speed: number;
  size: number;
  left: number;
  top: number;
  rotation: number;
  backgroundColor: string;
}

const Particles: React.FC<ParticlesProps> = ({
  speed,
  size,
  left,
  top,
  rotation,
  backgroundColor,
}) => (
  <div
    className="particles"
    style={{
      animation: `snowfall ${speed}s linear infinite`,
      left: `${left}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
      backgroundColor: backgroundColor,
      borderRadius: "50%",
    }}
  />
);
