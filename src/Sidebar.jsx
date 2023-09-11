import React, { useState } from 'react'
import Menu from './assets/images/menu.png';
import './App.css';

const Sidebar = () => {
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
			document.getElementsByClassName("left")[0].style.width = "300px";
			document.getElementsByClassName("right")[0].style.width = "calc(100% - 300px)";

			setTimeout(() => {
				document.getElementsByClassName("page-buttons")[0].style.opacity = "1";
			}, 150);
		}

		setMenuVisible(!menuVisible);
	}

	// Highlight active anchor
	let activePath = window.location.pathname.split('/')[1];

	return (
		<div className='left'>
			<button className='menu-button' onClick={toggleMenu}><img src={ Menu }/></button>

			<div className='page-buttons'>
				<a className={`${activePath == "introduction" ? "active" : ""}`} href="introduction">Introduction</a>
				<a className={`${activePath == "simple-codes" ? "active" : ""}`} href="simple-codes">Two Simple Codes</a>
				<a className={`${activePath == "definitions" ? "active" : ""}`} href="definitions">Definitions</a>
				<a className={`${activePath == "hamming" ? "active" : ""}`} href="hamming">Hamming Codes</a>
				<a className={`${activePath == "reed-solomon" ? "active" : ""}`} href="reed-solomon">Reed-Solomon Codes</a>
			</div>
		</div>
	)
}

export default Sidebar;