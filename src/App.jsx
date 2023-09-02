import React, {  useState } from 'react';
import Latex from 'react-latex-next';
import Markdoc from '@markdoc/markdoc';

import { latexx } from './schema/Callout.markdoc';
import { interaction } from './schema/Interaction.markdoc';

import Interaction from './Interaction';
import Menu from './assets/images/menu.png';

import './App.css';
import 'katex/dist/katex.min.css';

function InteractionFunction({children}) {
  return <Interaction props={{ key: children.props.children }}></Interaction>;
}

function LatexFunction({children}) {
  return <Latex>{children.props.children}</Latex>;
}

const config = {
  tags: {
    latexx,
    interaction
  }
};

function App() {
  const [content, setContent] = useState("");
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

  fetch("/pages/SimpleCodes.md").then((response) => response.text()).then((text) => {
    const source = text;
    const ast = Markdoc.parse(source);
    const content = Markdoc.transform(ast, config);

    setContent(content)
  });

  return (
    <div className='padded gray-background split'>
			<div className='left'>
				<button className='menu-button' onClick={toggleMenu}><img src={ Menu }/></button>

        <div className='page-buttons'>
          <button>Introduction</button>
          <button className='active'>Three Simple Codes</button>
        </div>
			</div>

			<div className='right'>
        {
          Markdoc.renderers.react(content, React, {
            components: {
              LatexFunction: LatexFunction,
              Interaction: InteractionFunction
            }
          })
        }
      </div>
	  </div>
  )
}

export default App
