import { useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    nickname: string;
  }>({
    mode: "onChange",
  });

  const onSubmit = () => {};
  const onError = () => {};

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className=" z-10 m-auto px-10  space-y-10 my-20">
            <div className="flex flex-col w-full space-y-2 ">
              <span className=" font-bold ">닉네임</span>
              <input
                {...register("nickname", {
                  required: "닉네임은 필수 입력입니다.",
                })}
                className="w-full h-10 input-underline bg-[f5f5f5] placeholder:text-left"
                placeholder="닉네임을 입력해주세요"
              />

              {errors.nickname && (
                <span
                  className="text-red-500
              "
                >
                  {errors.nickname.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full space-y-2">
              <span className=" font-bold">배경색 선택</span>
              <div className="flex flex-row w-full space-x-4">
                <button className="rounded-full w-10 h-10 bg-[#FACBDC] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#B4DEF5] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#D8D8D8] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#E5B06A] text-white "></button>
              </div>
            </div>

            <div className="flex flex-col w-full space-y-2">
              <span className=" font-bold">LP판 디자인 선택</span>
              <div className="flex flex-row w-full space-x-4 ">
                <button className="rounded-full w-10 h-10 bg-[#111111] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#111111] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#111111] text-white "></button>
                <button className="rounded-full w-10 h-10 bg-[#111111] text-white "></button>
              </div>

              <div className="flex flex-col w-full pt-40 ">
                <button
                  type="submit"
                  className="w-full h-10 bg-[#111111] text-white rounded "
                >
                  미리보기
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
