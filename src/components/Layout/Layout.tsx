import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      <Header />
      <main className="main-container">
        {children}
        {user && <Navigation />}
      </main>
    </div>
  );
};

export default Layout;
