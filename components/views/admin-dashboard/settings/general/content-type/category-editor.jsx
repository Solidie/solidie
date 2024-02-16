import React, {useState, useContext} from "react";

import {__, isEmpty, data_pointer} from 'crewhrm-materials/helpers.jsx';
import { request } from 'crewhrm-materials/request.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { Modal } from 'crewhrm-materials/modal.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';

import { ContextSettings } from "../general-settings.jsx";

import style from './style.module.scss';

const {readonly_mode} = window[data_pointer];

export const getFlattenedCategories=(categories=[], exclude_level=null)=>{

	const options = [];

	// Flatten nested array to linear
	const flattener = (cats=[], level=0) => {
		for ( let i=0; i<cats.length; i++ ) {
			const {category_id, category_name, children=[]} = cats[i];

			// Exclude self and children for editor dropdown
			if ( exclude_level == category_id ) {
				continue;
			}

			options.push({
				...cats[i],
				id: category_id,
				label: '—'.repeat(level)+ ' ' + category_name,
				level
			});
			flattener(children, level+1);
		}
	}
	flattener(categories);

	return options;
}

export function CategoryEditor({content_type}) {

	const {ajaxToast} = useContext(ContextToast);
	const {categories={}} = useContext(ContextSettings);

	const [state, setState] = useState({
		saving: false,
		categories: {...categories},
		editor: null
	});

	const openCatEditor=(category=null)=>{
		setState({
			...state,
			editor: category
		});
	}

	const setCatValue=(name, value)=>{
		setState({
			...state,
			editor: {
				...state.editor,
				[name]: value
			}
		});
	}

	const saveCat=()=>{
		const {editor} = state;
		setState({
			...state,
			saving: true
		});

		request('saveCategory', editor, resp=>{

			const {
				success, 
				data:{
					categories=state.categories
				}
			} = resp;
			
			ajaxToast(resp);
			
			setState({
				...state,
				categories,
				saving: false,
				editor: success ? null : state.editor
			});
		});
	}

	const deleteCategory=(category_id)=>{
		if ( ! window.confirm( __( 'Sure to delete the category and it\'s children?' ) ) ) {
			return;
		}

		request('deleteCategory', {category_id}, resp=>{
			const {success, data:{categories=[]}} = resp;

			if ( ! success ) {
				ajaxToast(resp);
				return;
			}

			setState({
				...state,
				categories
			});
		});
	}

	const _categories = getFlattenedCategories(state.categories[content_type] || []);
	const cat_options = state.editor !== null ? getFlattenedCategories(state.categories[state.editor.content_type], state.editor.category_id) : null;

	return <>
		{
			state.editor===null ? null : 
			<Modal 
				closeOnDocumentClick={true} 
				nested={true} 
				onClose={()=>openCatEditor(null)}
			>
				<div>
					<strong className={'d-block margin-bottom-8'.classNames()}>
						{__('Category Name')}
					</strong>
					<TextField
						value={state.editor.category_name || ''}
						onChange={v=>setCatValue('category_name', v)}/>
				</div>
				<br/>

				{
					isEmpty(cat_options) ? null : <>
						<div>
							<strong className={'d-block margin-bottom-8'.classNames()}>
								{__('Parent Category')}
							</strong>
							<DropDown 
								value={state.editor.parent_id}
								options={cat_options}
								onChange={id=>setCatValue('parent_id', id)}/>
						</div>
						<br/>
					</>
				}

				<div className={'text-align-right'.classNames()}>
					<button onClick={()=>openCatEditor(null)} className={'button button-outlined'.classNames()}>
						{__('Cancel')}
					</button>
					&nbsp;
					&nbsp;
					<button 
						className={'button button-primary'.classNames()} 
						onClick={saveCat}
						disabled={readonly_mode || isEmpty(state.editor.category_name)}
					>
						{!state.editor.category_id ? __('Create') : __('Update')} <LoadingIcon show={state.saving}/>
					</button>
				</div>
			</Modal>
		}
		<div>
			{
				_categories.map(category=>{
					const {label, category_id} = category;
					return <div key={category_id} className={'d-flex align-items-center column-gap-15'.classNames() + 'category-single'.classNames(style)}>
						{label} <span className={'d-inline-flex align-items-center column-gap-8'.classNames() + 'actions'.classNames(style)}>
							<i className={'ch-icon ch-icon-edit-2 cursor-pointer'.classNames()} onClick={()=>!readonly_mode && openCatEditor(category)}></i>
							<i className={'ch-icon ch-icon-trash cursor-pointer'.classNames()} onClick={()=>!readonly_mode && deleteCategory(category_id)}></i>
						</span>
					</div>
				})
			}

			<div className={"d-flex align-items-center column-gap-10".classNames()}>
				<span 
					onClick={()=>openCatEditor({content_type})} 
					className={`cursor-pointer hover-underline ${_categories.length ? 'border-top-1 b-color-tertiary' : ''}`.classNames()}
					style={_categories.length ? {paddingTop: '6px', marginTop: '6px'} : {}}
				>
					{__('+ Add Category')}
				</span>
			</div>
		</div>
	</>
}