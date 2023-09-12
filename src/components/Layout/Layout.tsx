import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { PropsWithChildren, Suspense } from "react";
import Header from "../Header/Header";
import { LazyNavigation } from "../../routers/lazyComponents";
import "./Layout.scss";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../store";

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
            <LazyNavigation />
          </Suspense>
        )}
        {isLoading && <Loading />}
      </main>
    </>
  );
};

export default Layout;
