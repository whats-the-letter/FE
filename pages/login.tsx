import React from "react";
import Button from "../features/common/components/Button/Button";

export default function Page() {
  return (
    <>
      <div>
        <img src="/assets/logo/dear-new-year-1.svg" alt="logo" />
        <p>나만의 앨범 컬렉션을 만들어보아요!</p>
        <p>
          연말 연시 감사인사를 전할 사람을 위해 앨범을 제작하고 추천곡을 담아
          보내요.
        </p>
        <p>
          이번 푸른 용의해에는 특별한 방식으로 마음을 전달해보는 건 어떨까요?
        </p>

        <Button>시작하기</Button>
      </div>
    </>
  );
}
