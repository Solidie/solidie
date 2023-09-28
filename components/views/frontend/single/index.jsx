import React, {createContext} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignleApp } from "./app/index.jsx";

export const ContextSingleData = createContext();

const SingleVariants = {
	app: <SignleApp/>
}

export function SingleContent(props) {
	const {contentData} = props;
	const {settings={}, home_path} = window.Solidie;
	const {contents={}} = settings;

	return <BrowserRouter>
		<ContextSingleData.Provider value={contentData}>
			<Routes>
				{
					Object.keys(contents).map(type=>{
						let {slug} = contents[type];
						return <Route key={slug} path={home_path+':content_type/:content_slug/'} element={SingleVariants[slug] || <span>Component Not Found</span>}/>
					})
				}
			</Routes>
		</ContextSingleData.Provider>
	</BrowserRouter>
}
