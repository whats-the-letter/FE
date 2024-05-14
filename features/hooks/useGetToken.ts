import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const useGetToken = () => {
  const [token, setToken] = useState({
    accessToken: "",
    refreshToken: "",
    expiresAt: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const expiresAt = localStorage.getItem("expiresAt");
    if (accessToken && refreshToken && expiresAt) {
      setToken({ accessToken, refreshToken, expiresAt: Number(expiresAt) });
      router.replace(router.pathname, undefined, { shallow: true });
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");
      const expiresAt = urlParams.get("expiresAt");

      if (accessToken && refreshToken && expiresAt) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiresAt", expiresAt);
        setToken({ accessToken, refreshToken, expiresAt: Number(expiresAt) });
        router.replace(router.pathname, undefined, { shallow: true });
      }
    }
  }, [router]);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/renew`,
        {
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        let newAccessToken = res.data.accessToken;
        let newExpiresAt = new Date().getTime() + 1;
        setToken({
          ...token,
          accessToken: newAccessToken,
          expiresAt: newExpiresAt,
        });
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("expiresAt", newExpiresAt.toString());
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        // console.log("Access token refreshed successfully");
      }
    } catch (err) {
    //   console.error("Access token refresh failed", err);
    }
  };

  return { token, setToken, refreshAccessToken };
};

export default useGetToken;
