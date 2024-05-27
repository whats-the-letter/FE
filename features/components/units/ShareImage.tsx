import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { toBlob } from "html-to-image";

interface ShareImageContextType {
  imageProps?: ShareImageProps | null;
  showShareImage: (props: ShareImageProps | null) => void;
}

interface ShareImageProps {
  albumBackground: string;
  albumCover: string;
  albumPhrases: string;
  fromName: string;
  letter: string;
  music: string;
  toName: string;
  albumId: string;
}

export const ShareImageContext = createContext<ShareImageContextType>({
  imageProps: null,
  showShareImage(props) {},
});

type ShareType = "COPY" | "DOWNLOAD";

export const ShareImageProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ShareImageContextType>({
    showShareImage: (props) => {},
    imageProps: null,
  });

  return (
    <ShareImageContext.Provider
      value={{
        imageProps: state.imageProps,
        showShareImage: (props) =>
          setState((prev) => ({ ...prev, imageProps: props })),
      }}
    >
      {children}
    </ShareImageContext.Provider>
  );
};

export const ShareImage = ({
  albumBackground,
  albumCover,
  albumPhrases,
  fromName,
  letter,
  music,
  toName,
  albumId,
}: ShareImageProps) => {
  const { showShareImage } = useContext(ShareImageContext);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleShare = (type: ShareType) => () => {
    if (imgRef.current === null) {
      return;
    }
    const imageName = `${albumId}-${fromName}-${toName}`;
    toBlob(imgRef.current)
      .then((blob) => {
        if (typeof window === "undefined" || !blob) return;
        switch (type) {
          case "COPY":
            if (navigator?.share) {
              try {
                navigator.share({
                  files: [
                    new File([blob], `${imageName}.png`, {
                      type: blob.type,
                    }),
                  ],
                });
              } catch (err) {
                console.log(err);
              }
            }
            break;
          case "DOWNLOAD":
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = imageName;
            link.href = url;
            link.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        key="share-image-show-header"
        className="absolute top-0 right-5 h-14 flex items-center"
      >
        <div className="flex flex-col text-center justify-center items-center w-full max-w-sm px-8 z-10 font-pretendard ">
          <div className="relative -z-10">dkdk</div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="bg-[#111111] py-[7px] px-3 rounded-full text-caption2-medium text-white"
          onClick={handleShare("DOWNLOAD")}
        >
          다운로드
        </button>
      </div>
    </>
  );
};

export const ShareImageDrawer = () => {
  const context = useContext(ShareImageContext);
  if (!context) throw new Error("ShareImageContext");
  const { showShareImage, imageProps } = context;
  return (
    <div className="absolute top-0 left-5 h-14 flex items-center">
      <button onClick={() => showShareImage(null)}>test</button>

      {imageProps && (
        <ShareImage
          albumBackground={imageProps.albumBackground}
          albumCover={imageProps.albumCover}
          albumPhrases={imageProps.albumPhrases}
          fromName={imageProps.fromName}
          letter={imageProps.letter}
          music={imageProps.music}
          toName={imageProps.toName}
          albumId={imageProps.albumId}
        />
      )}
    </div>
  );
};
