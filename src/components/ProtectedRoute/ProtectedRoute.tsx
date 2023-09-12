import React, { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { paths } from "../../routers/paths";

interface ProtectedRouteProps extends PropsWithChildren {
  destinationPath: string;
}

const ProtectedRoute = ({
  children,
  destinationPath,
}: ProtectedRouteProps): React.ReactElement => {
  const [user, isLoading] = useAuthState(auth);

  if (!user && !isLoading && destinationPath !== paths.home) {
    return <Navigate to={paths.home} />;
  }

  if (user && !isLoading && destinationPath === paths.home) {
    return <Navigate to={paths.records} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
