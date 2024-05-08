import React from "react";

const BackgroundBack = () => {
  return (
    <div className="fixed inset-0 ">
    <div className="center" style={{ background: "rgba(75, 75, 250, 0.3)" }}>
      <style>
        {`
          body {
            background-image: url('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
            background-size: cover;
            animation: slidein 100s infinite alternate;
          }

          @keyframes slidein {
            from {
              background-position: top;
              background-size: 3000px;
            }
            to {
              background-position: -100px 0px;
              background-size: 2750px;
            }
          }
        `}
      </style>
      
    </div>
    </div>
    
  );
};

export default BackgroundBack;
