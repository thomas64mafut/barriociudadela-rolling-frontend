import Footer from "../footer/Footer";
import Header from "../header/Header";
import './layout.css';

const Layout = ({ children }) => {
    return (
        <div className="bodyContainer">
            <Header />
            <div className="layout-style">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
