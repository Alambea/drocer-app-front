import React, { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import { paths } from "../../routers/paths";

const ProtectedRoute = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to={paths.home} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
