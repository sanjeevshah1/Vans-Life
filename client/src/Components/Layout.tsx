import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useState, useEffect } from 'react'
const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
  
    <Header />
    <label className="switch">
      <input id="slide" type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
      <span className="slider"></span>
      <label htmlFor="slide">Dark Mode</label>
    </label>
    <br />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout