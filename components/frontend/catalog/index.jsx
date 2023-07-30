import React, { Children, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ContextCatalogData } from "../../utilities/contexts.jsx";

import style from './index.module.scss';
import { AppCatalog } from "./app/app.jsx";

const CatalogVarients={
	app: <AppCatalog/>
}

function CatalogLayout(props) {
	const {settings={}} = window.Solidie;
	const {contents={}} = settings;

	return <div className={'catalog-root'.classNames(style)}>
		<div className={'header'.classNames(style)}>
			<div className={"search-wrapper".classNames(style)}>
				{/* Content type dropdown */}
				<div>
					<div>
						{Object.keys(contents).map(type=>{
							let {slug, label} = contents[type];
							return <Link key={slug} to={slug+'/'}>
								{label}
							</Link>
						})}
					</div> 
				</div>

				{/* Search field */}
				<div>
					<input type='text'/>
				</div>

				{/* Search Button */}
				<div>
					<button>Search</button>
				</div>
			</div>
			<div className={'sort-wrapper'.classNames(style)}>
				Sort
			</div>
		</div>
		
		<div className={'catalog-area'.classNames(style)}>
			{props.children}
		</div>
	</div>
}

export function Catalog() {
	const {settings={}, home_path} = window.Solidie;
	const {contents={}} = settings;

	return <BrowserRouter>
		<ContextCatalogData.Provider value={{}}>
			<CatalogLayout>
				<Routes>
					{
						Object.keys(contents).map(type=>{
							let {slug} = contents[type];
							return <Route path={home_path+slug+'/'} element={CatalogVarients[slug] || <span>Component Not Found</span>}/>
						})
					}
				</Routes>
			</CatalogLayout>
		</ContextCatalogData.Provider>
	</BrowserRouter>
}
