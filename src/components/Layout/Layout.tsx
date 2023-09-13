import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { PropsWithChildren, Suspense } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../store";
import Navigation from "../Navigation/Navigation";
import Feedback from "../Feedback/Feedback";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const [user, isLoadingAuth] = useAuthState(auth);

  return (
    <>
      <Header />
      <main className="main-container">
        <Feedback />
        {children}
        {user && (
          <Suspense>
            <Navigation />
          </Suspense>
        )}
        {(isLoadingUi || isLoadingAuth) && <Loading />}
      </main>
    </>
  );
};

export default Layout;
