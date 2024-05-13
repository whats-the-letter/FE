import { Dialog, Transition } from "@headlessui/react";
import { useOverlay } from "@toss/use-overlay";
import { Fragment, useEffect } from "react";
import Image from "next/image";
import kakaoIcon from "/features/assets/icons/kakao-icon.svg";
import exit from "/features/assets/icons/exit_button.svg";
declare global {
  interface Window {
    Kakao: any;
  }
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  btnText?: string;
  onConfirm: () => void;
  showCloseBtn?: boolean;
  closeBtnText?: string;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  btnText,
  onConfirm,
  showCloseBtn,
  closeBtnText,
  children,
}: ModalProps) {
  const copyToClipboard = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard.writeText(linkToCopy);
  };

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    console.log(window.Kakao.isInitialized());
  }

  const KakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Share.createCustomButton({
      container: "#kakao-link-btn",
      templateId: 101443,
      templateArgs: {
        title: "나만의 LP를 만들어보세요!",
        description: "나만의 LP를 만들어보세요!",
      },
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          {/* Dim */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[320px] transform overflow-hidden rounded-md bg-white px-4 py-6 pb-4 align-middle shadow-xl transition-all font-pretendard">
                  {showCloseBtn && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 px-1 py-1  focus:outline-none"
                      onClick={onClose}
                    >
                      {closeBtnText ? (
                        closeBtnText
                      ) : (
                        <Image src={exit} alt="close" className="w-6 h-6" />
                      )}
                    </button>
                  )}

                  <div className="flex flex-col justify-center items-center w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold  text-black leading-6  text-center mb-2"
                    >
                      {title}
                    </Dialog.Title>
                    <p className="text-xs text-center text-[#9E9E9E] mb-6">
                      {description}
                    </p>
                    
                      <a
                        id="kakao-link-btn"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          KakaoShare();
                        }}
                        className="w-full flex justify-center items-center gap-3 bg-[#FEE500] rounded-md p-3 mb-3"
                      >
                        {btnText ?? (
                          <div className="w-full flex justify-center items-center ">
                            <Image
                              src={kakaoIcon}
                              alt="kakao"
                              className="w-4 mr-2"
                            />
                            <p className="text-xs text-[#371D1E] text-center font-semibold ">
                              카카오톡으로 공유
                            </p>
                          </div>
                        )}
                      </a>
                      <button
                        type="button"
                        className="w-full rounded-md bg-[#eaeaea] text-[#7a7a7a] text-xs font-bold focus:outline-none whitespace-nowrap p-3"
                        onClick={copyToClipboard}
                      >
                        링크 복사
                      </button>
                    </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export const useModal = ({
  title,
  description,
  btnText,
  showCloseBtn,
  closeBtnText,
}: Pick<
  ModalProps,
  "title" | "description" | "btnText" | "closeBtnText" | "showCloseBtn"
>) => {
  const overlay = useOverlay();

  const open = async () => {
    return await new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <Modal
          isOpen={isOpen}
          title={title}
          description={description}
          btnText={btnText}
          onClose={() => {
            resolve(false);
            close();
          }}
          onConfirm={() => {
            resolve(true);
            close();
          }}
          showCloseBtn={showCloseBtn}
          closeBtnText={closeBtnText}
        ></Modal>
      ));
    });
  };

  return { open };
};
