import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Latex from 'react-latex-next'
import Markdoc from '@markdoc/markdoc'
import { latexx } from './schema/Callout.markdoc';
import { interaction } from './schema/Interaction.markdoc'
import Interaction from './Interaction'
import 'katex/dist/katex.min.css'

function Callout({ children }) {
  return <div className="callout">{children}</div>;
}

function InteractionFunc({children}) {
  return <Interaction props={{
    key: children.props.children
  }}></Interaction>
}

function Latexx({children}) {
  return  <Latex>{children.props.children}</Latex>;
}


const config = {
  tags: {
    latexx,
    interaction
  }
};

function App() {
  const [content, setContent] = useState("")

  fetch("/pages/Introduction.md").then((response) => response.text()).then((text) => {
    const source = text
const ast = Markdoc.parse(source);
const content = Markdoc.transform(ast, config);

setContent(content)
  })

  return (
    <>
      {Markdoc.renderers.react(content, React, {
    components: {
      Latexx: Latexx,
      Interaction: InteractionFunc
    }
  })}
    </>
  )
}

export default App
