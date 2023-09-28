import { PropsWithChildren, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
import { useAppSelector } from "../../store";
import setDocumentTitle from "../../utils/setDocumentTtitle";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import Navigation from "../Navigation/Navigation";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const selectedRecord = useAppSelector(
    (state) => state.recordsState.selectedRecord,
  );
  const [user, isLoadingAuth] = useAuthState(auth);
  const pathName = useLocation().pathname;

  useEffect(() => {
    setDocumentTitle(pathName, selectedRecord!);
  }, [pathName, selectedRecord]);

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
