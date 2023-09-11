import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { PropsWithChildren, Suspense } from "react";
import Header from "../Header/Header";
import { LazyNavigation } from "../../routers/lazyComponents";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
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
      </main>
    </>
  );
};

export default Layout;
