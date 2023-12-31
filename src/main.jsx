import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Article from './Article.jsx';
import Sidebar from './Sidebar.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Article/>
	},
	{
		path: "/:id",
		element: <Article/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className='padded gray-background split'>
			<Sidebar/>
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>,
)
