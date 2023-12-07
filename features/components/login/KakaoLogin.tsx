import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosApi } from "../../../apis";
import { Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const KakaoLoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoCode = async () => {
      try {
        // 코드 전송
        const response = await axios.get(`/auth/login/kakao?code=${code}`, {
          withCredentials: true,
        });
        console.log(response);
        console.log(code);
      } catch (e) {
        console.log(e);
      }
    };
    kakaoCode();
  }, [dispatch]);

  // if (!valid) {
  //   return <Loading />;
  // }
  return <></>;
};

export default KakaoLoginComponent;
