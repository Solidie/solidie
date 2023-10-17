import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";

import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { __ } from "crewhrm-materials/helpers.jsx";
import { Conditional } from "crewhrm-materials/conditional.jsx";
import { RadioCheckbox } from "crewhrm-materials/radio-checkbox.jsx";
import { ResponsiveLayout } from "crewhrm-materials/responsive-layout.jsx";

import { SingleCard } from "./single-card/single-card.jsx";

import style from './index.module.scss';

const filters = [
	{
		label: __('Category'),
		type: 'checkbox',
		options: [
			{
				id: 1,
				label: 'Cat 1'
			},
			{
				id: 2,
				label: 'Cat 1'
			},
			{
				id: 3,
				label: 'Cat 1'
			}
		]
	},
	{
		label: __('Sort By'),
		type: 'radio',
		options: [
			{
				id: 'popularity',
				label: __( 'Popularity' )
			},
			{
				id: 'newest',
				label: __( 'New Arrival' )
			},
			{
				id: 'cost',
				label: __( 'Cost Efficient' )
			}
		]
	}
];

export function getPath(path) {
	let _path = window.Solidie.home_path + path;
	return _path.replace(/\/+/g, '/');
}

function CatalogLayout(props) {
	const {settings={}} = window.Solidie;
	const {contents={}} = settings;
	const {content_type_slug} = useParams();
	const navigate = useNavigate();
	
	let content_type;
	for ( let k in contents ) {
		if (contents[k].slug===content_type_slug) {
			content_type = k;
			break;
		}
	}

	const [state, setState] = useState({
		contents:[], 
		fetching: false,
		filters:{
			page: 1,
			sort: 'popular'
		}
	});

	const getContents=()=>{

		setState({
			...state, 
			fetching: true
		});

		request('get_content_list', {...state.filters/* , content_type */}, resp=>{
			let {contents=[]} = resp?.data || {};
			setState({...state, fetching: false, contents});
		});
	}

	useEffect(()=>{
		getContents();
	}, [content_type_slug]);

	return <div className={'catalog'.classNames(style)}>
		<div className={'d-flex align-items-center position-sticky border-1 border-radius-8 b-color-tertiary margin-bottom-15'.classNames()}>
			<div className={'padding-horizontal-15 border-right-1 b-color-tertiary'.classNames()}>
				<DropDown
					value={content_type}
					onChange={v=>navigate(getPath(v+'/'))}
					options={Object.keys(contents).map(c=>{
						let {label} = contents[c];
						return {
							id: c,
							label
						}
					})}/>
			</div> 

			{/* Search field */}
			<div className={'flex-1 padding-horizontal-15'.classNames()}>
				<input type='text' className={"text-field-flat overflow-hidden text-overflow-ellipsis".classNames()}/>
			</div>

			{/* Search Button */}
			<div>
				<button>Search</button>
			</div>
		</div>
		
		<div className={'content'.classNames(style)}>
			<div className={'sidebar'.classNames(style) + 'position-sticky'.classNames()}>
				{filters.map((filter, i)=>{
					const {label, options=[], type} = filter;

					return <div key={i} className={'margin-bottom-15'.classNames()}>
						<strong className={'d-block font-weight-500 font-size-15'.classNames()}>
							{label}
						</strong>

						<Conditional show={type=='checkbox' || type=='radio'}>
							<RadioCheckbox type={type} options={options}/>
						</Conditional>
					</div>
				})}
			</div>
			
			<div className={'list'.classNames(style)}>
				<ResponsiveLayout columnWidth={280}>
					{state.contents.map(content=>{
						return <div key={content.content_id}>
							<SingleCard content_type={content_type} content={content}/>
						</div> 
					})}
				</ResponsiveLayout>
			</div>
		</div>
	</div>
}

export function Catalog() {

	const {home_path} = window.Solidie;

	return <BrowserRouter>
		<Routes>
			<Route path={home_path+':content_type_slug/'} element={<CatalogLayout/>}/>
		</Routes>
	</BrowserRouter>
}
