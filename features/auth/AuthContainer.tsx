import { useRouter } from "next/router";
import { AuthInfo } from "../../pages/_app";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  children: any;
  authInfo: AuthInfo;
}

const AuthContainer = ({ children, authInfo }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  const redirect = authInfo?.redirect || "/";
  const role = authInfo.role;
  const loading = authInfo?.loading || <div>Loading</div>;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) {
      router.push(redirect);
    }
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  return loading;
};

export default AuthContainer;
