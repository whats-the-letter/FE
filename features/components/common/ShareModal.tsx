import { Dialog, Transition } from "@headlessui/react";
import { useOverlay } from "@toss/use-overlay";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  btnText?: string;
  onConfirm: () => void;
  showCloseBtn?: boolean;
  closeBtnText?: string;
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
}: ModalProps) {
  const copyToClipboard = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard.writeText(linkToCopy);
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
                        <img
                          src="/assets/icons/close.svg"
                          alt="close"
                          className="w-6 h-6"
                        />
                      )}
                    </button>
                  )}

                  <div className="flex flex-col justify-center items-center gap-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold  text-black leading-6  text-center"
                    >
                      {title}
                    </Dialog.Title>
                    <p className="text-xs text-center text-[#9E9E9E] ">
                      {description}
                    </p>
                    <div className="flex justify-between items-center border border-black rounded-md w-full">
                      <p className="text-sm m-auto px-2  text-[#9E9E9E] py-2 truncate">
                        {window.location.href}
                      </p>
                      <button
                        type="button"
                        className="bg-black text-white text-xs font-bold focus:outline-none whitespace-nowrap px-2 py-3 rounded-r"
                        onClick={copyToClipboard}
                      >
                        URL 복사
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex justify-center rounded-md bg-[#FEE500] text-black text-xs font-bold p-2 w-full focus:outline-none "
                      onClick={() => {
                        onConfirm();
                      }}
                    >
                      {btnText ?? (
                        <div className="flex justify-center items-center gap-4">
                          <img
                            src="/assets/icons/kakao.svg"
                            alt="kakao"
                            className=""
                          />
                          <p className="text-[#371D1E] m-auto text-base text-center font-semibold ">
                            카카오톡으로 공유
                          </p>
                        </div>
                      )}
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
