import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  setSessionRefetchInterval: Dispatch<SetStateAction<number>>;
}

const RefreshTokenHandler = ({ setSessionRefetchInterval }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const nowTime = Math.round(Date.now() / 1000);
      const timeRemaining =
        (session.accessTokenExpires as number) - 7 * 60 - nowTime;
      setSessionRefetchInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session, setSessionRefetchInterval]);
  return null;
};

export default RefreshTokenHandler;
