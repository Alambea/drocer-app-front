import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { PropsWithChildren, Suspense } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../store";
import Navigation from "../Navigation/Navigation";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <main className="main-container">
        {children}
        {user && (
          <Suspense>
            <Navigation />
          </Suspense>
        )}
        {isLoading && <Loading />}
      </main>
    </>
  );
};

export default Layout;
