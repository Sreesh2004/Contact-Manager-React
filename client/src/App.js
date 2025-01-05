import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Page404 from './Pages/Page404';
import ContactState from './Context/Contact/contactState';
import AuthState from './Context/Auth/authState';

const App = () => {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <AuthState>
      <ContactState>
        <Router>
          <div className={isDarkMode ? 'dark' : 'light'}>
            <Fragment>
              {/* Pass dark mode state and toggle function to Navbar */}
              <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route path="*" exact component={Page404} />
              </Switch>
              <Footer />
            </Fragment>
          </div>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
