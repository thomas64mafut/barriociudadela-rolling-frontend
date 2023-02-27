import './layout.css';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <Header />
      <div
        className={ 
          darkMode
            ? 'layout-style dark'
            : 'layout-style'
        }>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
