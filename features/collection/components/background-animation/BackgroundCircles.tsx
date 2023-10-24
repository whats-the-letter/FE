import React from "react";

const BackgroundCircles = () => {
  return (
    <div className="fixed inset-0 z-0">
      <style>
        {`@keyframes move {
          100% {
            transform: translate3d(0, 0, 1px) rotate(360deg);
          }
        }

        .circle {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: #ededed;
          overflow: hidden;
        }

        .circle span {
          width: 39vmin;
          height: 39vmin;
          border-radius: 39vmin;
          backface-visibility: hidden;
          position: absolute;
          animation: move;
          animation-duration: 25;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
.circle span:nth-child(0) {
    color: #ffd3e3;
    top: 69%;
    left: 6%;
    animation-duration: 24s;
    animation-delay: -49s;
    transform-origin: -9vw -17vh;
    box-shadow: 78vmin 0 10.277118317370066vmin currentColor;
}
.circle span:nth-child(1) {
    color: #d2d2d2;
    top: 54%;
    left: 36%;
    animation-duration: 36s;
    animation-delay: -6s;
    transform-origin: -7vw 7vh;
    box-shadow: 78vmin 0 10.693703081301118vmin currentColor;
}
.circle span:nth-child(2) {
    color: #f8dcb9;
    top: 74%;
    left: 49%;
    animation-duration: 20s;
    animation-delay: -30s;
    transform-origin: 15vw 19vh;
    box-shadow: 78vmin 0 10.03587798694545vmin currentColor;

}
.circle span:nth-child(3) {
    color: #c1e2f4;
    top: 97%;
    left: 87%;
    animation-duration: 49s;
    animation-delay: -27s;
    transform-origin: 3vw 2vh;
    box-shadow: -78vmin 0 9.937843825218788vmin currentColor;
}

.circle span:nth-child(4) {
  color: #ffd3e3;
  top: 43%;
    left: 40%;
    animation-duration: 34s;
    animation-delay: -20s;
    transform-origin: -1vw -7vh;
    box-shadow: -78vmin 0 10.245436349417497vmin currentColor;
}
.circle span:nth-child(5) {
  color: #ffd3e3;
  top: 38%;
  left: 12%;
  animation-duration: 33s;
  animation-delay: -22s;
  transform-origin: -4vw 22vh;
  box-shadow: -78vmin 0 9.821672151659358vmin currentColor;
}
.circle span:nth-child(6) {
  color: #d2d2d2;
  top: 18%;
  left: 100%;
  animation-duration: 40s;
  animation-delay: -14s;
  transform-origin: -15vw 19vh;
  box-shadow: 78vmin 0 10.466617990172736vmin currentColor;
}
.circle span:nth-child(7) {
  color: #c1e2f4;
  top: 42%;
  left: 29%;
  animation-duration: 27s;
  animation-delay: -32s;
  transform-origin: 22vw 22vh;
  box-shadow: -78vmin 0 10.507920355922968vmin currentColor;
}
.circle span:nth-child(8) {
  color: #f8dcb9;
  top: 10%;
  left: 75%;
  animation-duration: 55s;
  animation-delay: -21s;
  transform-origin: 7vw -9vh;
  box-shadow: -78vmin 0 10.420808823996026vmin currentColor;
}
.circle span:nth-child(9) {
  color: #ffd3e3;
  top: 58%;
  left: 62%;
  animation-duration: 43s;
  animation-delay: -44s;
  transform-origin: 11vw -23vh;
  box-shadow: -78vmin 0 10.058002827072903vmin currentColor;
}`}
      </style>
      <div className="circle ">
        {Array.from(Array(9).keys()).map((i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
};

export default BackgroundCircles;
