import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Container from "react-bootstrap/esm/Container";

import "./Layout.css";

const Layout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
      <div className="footer">
        <Container fluid className="text-center">
          <p>-- Made with ❤️ by Martin --</p>
        </Container>
      </div>
    </>
  );
};

export default Layout;
