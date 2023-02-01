import './layout.css';

import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="layout-style">{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
