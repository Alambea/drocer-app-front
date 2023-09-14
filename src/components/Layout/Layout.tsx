import { useAuthState } from "react-firebase-hooks/auth";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { auth } from "../../firebase";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../store";
import Navigation from "../Navigation/Navigation";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const [user, isLoadingAuth] = useAuthState(auth);

  return (
    <>
      <Header />
      <main className="main-container">
        <ToastContainer />
        {children}
        {user && <Navigation />}
        {(isLoadingUi || isLoadingAuth) && <Loading />}
      </main>
    </>
  );
};

export default Layout;
