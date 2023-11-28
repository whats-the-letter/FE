import React from "react";

interface CompletedAlbumProps {
  submittedAlbum: {
    editor: string;
    phrases: string;
    back: string;
    music: string;
    letter: string;
    to: string;
    from: string;
  };
}

const CompleteAlbum: React.FC<CompletedAlbumProps> = ({ submittedAlbum }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 z-10">
      <h2>Completed Album:</h2>
    </div>
  );
};

export default CompleteAlbum;
