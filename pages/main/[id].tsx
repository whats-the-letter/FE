import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const token = router.query.token; // 라우터 쿼리 파라미터에서 토큰을 가져옴

    const userId = router.query.id; // 라우터 쿼리 파라미터에서 사용자 id를 가져옴
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/main/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [router.query.token]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>Main Page for User {userInfo.userName}</h1>
          <p>Email: {userInfo.email}</p>
          {/* 기타 사용자 정보 출력 */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MainPage;
