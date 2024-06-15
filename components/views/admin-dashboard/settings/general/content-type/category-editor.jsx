import React, {useState, useContext} from "react";

import {__, isEmpty, data_pointer} from 'crewhrm-materials/helpers.jsx';
import {confirm} from 'crewhrm-materials/prompts.jsx';
import { request } from 'crewhrm-materials/request.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { Modal } from 'crewhrm-materials/modal.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { ListManager } from 'crewhrm-materials/list-manager/list-manager.jsx';

import { ContextSettings } from "../general-settings.jsx";

const {readonly_mode} = window[data_pointer];

export const getFlattenedArray=(array, id_key, label_key, exclude_level=null)=>{
	const options = [];

	// Flatten nested array to linear
	const flattener = (cats=[], level=0) => {
		for ( let i=0; i<cats.length; i++ ) {
			
			const {children=[]} = cats[i];

			const _id = cats[i][id_key];
			const _label = cats[i][label_key];

			// Exclude self and children for editor dropdown
			if ( exclude_level == _id ) {
				continue;
			}

			options.push({
				...cats[i],
				id: _id,
				label: '—'.repeat(level)+ ' ' + _label,
				level
			});
			flattener(children, level+1);
		}
	}

	flattener(array);

	return options;
}

export const getFlattenedCategories=(categories=[], exclude_level=null)=>{
	return getFlattenedArray(categories, 'category_id', 'category_name', exclude_level);
}

export function CategoryEditor({content_type}) {

	const {ajaxToast} = useContext(ContextToast);
	const {categories={}} = useContext(ContextSettings);

	const [state, setState] = useState({
		saving: false,
		categories: categories[content_type] || [],
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
		const {editor={}} = state;
		setState({
			...state,
			saving: true
		});

		request('saveCategory', {...editor, parent_id: editor.parent_id || 0}, resp=>{

			const {
				success, 
				data:{
					categories={}
				}
			} = resp;
			
			ajaxToast(resp);
			
			setState({
				...state,
				categories: success ? categories[content_type] ?? [] : state.categories,
				saving: false,
				editor: success ? null : state.editor
			});
		});
	}

	const saveSequence=(categories)=>{
		const flattened = getFlattenedCategories(categories);
		const mapping = {};

		flattened.forEach((cat, index)=>{
			mapping[cat.category_id] = index+1;
		});

		request('saveCategorySequence', {mapping}, resp=>{
			if ( !resp.success ) {
				ajaxToast(resp);
			}
		});
	}

	const deleteCategory=(category_id)=>{
		
		confirm(
			__( 'Sure to delete?' ),
			__( 'Sub categories also will be deleted if there is any.' ),
			()=>{
				request('deleteCategory', {category_id}, resp=>{
					const {success, data:{categories={}}} = resp;

					if ( ! success ) {
						ajaxToast(resp);
						return;
					}

					setState({
						...state,
						categories: categories[content_type] ?? []
					});
				});
			}
		);
	}

	const cat_options = state.editor !== null ? getFlattenedCategories(state.categories, state.editor.category_id) : null;

	return <div>
		{
			state.editor===null ? null : 
			<Modal 
				closeOnDocumentClick={true} 
				nested={true} 
				onClose={()=>openCatEditor(null)}
			>
				<div data-cylector="category-name-field">
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
						<div data-cylector="category-parent-field">
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
					<button 
						onClick={()=>openCatEditor(null)} 
						className={'button button-outlined'.classNames()}
					>
						{__('Cancel')}
					</button>
					&nbsp;
					&nbsp;
					<button 
						className={'button button-primary'.classNames()} 
						onClick={()=>saveCat()}
						disabled={readonly_mode || isEmpty(state.editor.category_name)}
						data-cylector="category-submit"
					>
						{!state.editor.category_id ? __('Create') : __('Update')} <LoadingIcon show={state.saving}/>
					</button>
				</div>
			</Modal>
		}
		
		<ListManager
			mode="queue"
			id_key="category_id"
			nested={false}
			label_key="category_name"
			list={state.categories}
			addText={__('Add Category')}
			rename={false}
			onAdd={()=>openCatEditor({content_type})}
			onEdit={c=>openCatEditor(c)}
			deleteItem={id=>deleteCategory(id)}
			onChange={categories=>{
				setState({...state, categories});
				saveSequence(categories);
			}}
		/>
	</div>
}
