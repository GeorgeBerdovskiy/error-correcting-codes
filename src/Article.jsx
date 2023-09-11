import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { latexx } from './schema/Callout.markdoc';
import { interaction } from './schema/Interaction.markdoc';
import Latex from 'react-latex-next';
import Markdoc from '@markdoc/markdoc';
import Interaction from './Interaction';
import 'katex/dist/katex.min.css';

function InteractionFunction({children}) {
  return (
    <div className='interaction-container'>
      <div className='interaction'>
        <Interaction props={{ key: children.props.children }}></Interaction>
      </div>
    </div>
  );
}

function LatexFunction({type, children}) {
	if (type == "fullwidth") {
		return <div className='fullwidth-latex'>
			<Latex>{children.props.children}</Latex>
		</div>
	}

	// LaTeX is rendered inline by default
	return <Latex>{children.props.children}</Latex>
}

const config = {
  tags: {
    latexx,
    interaction
  }
};

const Article = () => {
	const { id } = useParams();
	const [content, setContent] = useState("");
	const [activePage, setActivePage] = useState("");

	useEffect(() => {
		if (activePage == "") {
			return
		}

		fetch(`/pages/${activePage}.md`).then((response) => response.text()).then((text) => {
			const source = text;
			const ast = Markdoc.parse(source);
			const content = Markdoc.transform(ast, config);
		
			setContent(content)
		});
	}, [activePage]);

	useEffect(() => {
		console.log(`id is ${id}`)
		switch (id) {
			case "encoders-processors-decoders":
				setActivePage("E_EP_D");
				break;
			case "definitions":
				setActivePage("Definitions");
				break;
			case "simple-codes":
				setActivePage("SimpleCodes");
				break;
			case "hamming":
				setActivePage("HammingCodes");
				break;
			case "reed-solomon":
				setActivePage("ReedSolomonCodes");
				break;
			default:
				setActivePage("Introduction");
				break;
		}
	}, [id]);

	return (
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
	)
}

export default Article;