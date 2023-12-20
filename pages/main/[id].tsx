import Loading from "@/components/units/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData(["userId"]);
  console.log("userId - 메인으로 이동한 상태 ", userId);
  console.log("accessToken - 메인으로 이동한 상태 ", accessToken);
  console.log(session);
  const { data, error, isLoading } = useQuery(["userId"], async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/main/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response.data", response.data);
    console.log("토큰: ", accessToken);
    return response.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <h1>Main Page for User {}</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
