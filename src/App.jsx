import React, { useEffect, useState } from 'react';


import { BrowserRouter as Router, Route } from 'react-router-dom';

import Article from './Article';


function App() {
  
  const [menuVisible, setMenuVisible] = useState(false);
  

  function toggleMenu() {
    if (menuVisible) {
      // Hide menu
      document.getElementsByClassName("page-buttons")[0].style.opacity = "0";

      setTimeout(() => {
        document.getElementsByClassName("left")[0].style.width = "96px";
        document.getElementsByClassName("right")[0].style.width = "calc(100% - 96px)";
      }, 150);
    } else {
      // Show menu
      document.getElementsByClassName("left")[0].style.width = "250px";
      document.getElementsByClassName("right")[0].style.width = "calc(100% - 250px)";

      setTimeout(() => {
        document.getElementsByClassName("page-buttons")[0].style.opacity = "1";
      }, 150);
    }

    setMenuVisible(!menuVisible);
  }

  return (
    <div className='padded gray-background split'>

	<Router>
	<div className='left'>
        <button className='menu-button' onClick={toggleMenu}><img src={ Menu }/></button>

        <div className='page-buttons'>
          <button onClick={() => setActivePage("Introduction")}>Introduction</button>
          <button onClick={() => setActivePage("Definitions")}>Definitions</button>
          <button onClick={() => setActivePage("SimpleCodes")}>Three Simple Codes</button>
          <button onClick={() => setActivePage("HammingCodes")}>Hamming Codes</button>
          <button onClick={() => setActivePage("ReedSolomonCodes")}>Reed-Solomon Codes</button>
        </div>
      </div>

        <Route path="/article/:id" component={Article} />

    </Router>
    </div>
  )
}

export default App
