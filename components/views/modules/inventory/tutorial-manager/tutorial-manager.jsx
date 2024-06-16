import React, { useContext, useEffect, useState } from "react";

import {__, data_pointer, getDashboardPath, isEmpty} from 'crewhrm-materials/helpers.jsx'
import {ListManager} from 'crewhrm-materials/list-manager/list-manager.jsx'
import {confirm} from 'crewhrm-materials/prompts.jsx';
import { request } from "crewhrm-materials/request.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon";
import { InitState } from "crewhrm-materials/init-state.jsx";
import { Modal } from 'crewhrm-materials/modal.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';

import { LessonEditor } from "./lesson-editor.jsx";
import { getFlattenedArray } from "../../../admin-dashboard/settings/general/content-type/category-editor.jsx";

const {readonly_mode} = window[data_pointer];

const getFlattenedLessons=(lessons)=>{
	return getFlattenedArray(lessons, 'lesson_id', 'lesson_title')
}

export function TutorialManager({content_id, content_type, lesson_id, navigate}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		lessons: [],
		has_changes: false,
		saving: false,
		fetching: false,
		error_message: null,
		new_lesson: null
	});
	
	const setLessons=(lessons)=>{
		if ( state.saving || state.fetching ) {
			return;
		}
		
		setState({
			...state,
			has_changes: true,
			lessons
		});
	}

	const editLesson=(lesson)=>{
		navigate(getDashboardPath(`inventory/${content_type}/editor/${content_id}/lessons/${lesson.lesson_id}/`))
	}

	const deleteLesson=(lesson_id)=>{
		
		confirm(
			__('Sure to delete?'),
			()=>{
				request('deleteLesson', {lesson_id, content_id}, resp=>{
					ajaxToast(resp);

					if ( resp.success ) {
						setState({
							...state,
							lessons: resp.data.lessons
						});
					}
				});
			}
		);
	}

	const fetchLessonsHierarchy=()=>{

		setState({
			...state,
			fetching: true
		});

		request('getLessonsHierarchy', {content_id}, resp=>{

			const {
				success, 
				data:{
					lessons=[], 
					message=__('Something went wrong!')
				}
			} = resp;

			setState({
				...state,
				fetching: false,
				error_message: !success ? message : null,
				lessons
			})
		});
	}

	const saveSequence=(lessons)=>{
		const flattened = getFlattenedLessons(lessons);
		const sequence = {};

		flattened.forEach((lessons, index)=>{
			sequence[lessons.lesson_id] = index+1;
		});

		request('saveLessonSequence', {content_id, sequence}, resp=>{
			if ( !resp.success ) {
				ajaxToast(resp);
			}
		});
	}

	const saveNewLesson=()=>{

		setState({
			...state,
			saving: true
		});

		request('saveNewLesson', {...state.new_lesson, content_id}, resp=>{

			const {success, data: {lessons=[], lesson_id}} = resp;

			ajaxToast(resp);

			setState({
				saving: false,
				new_lesson: success ? null : state.new_lesson,
				lessons: success ? lessons : state.lessons
			});

			if ( success ) {
				navigate(getDashboardPath(`inventory/${content_type}/editor/${content_id}/lessons/${lesson_id}/`));
			}
		});
	}

	const closeModal=()=>{
		setState({
			...state, 
			new_lesson: null
		});
	}

	const setNewLesson=(name, value)=>{
		setState({
			...state,
			new_lesson: {
				...state.new_lesson,
				[name]: value
			}
		});
	}

	useEffect(()=>{
		fetchLessonsHierarchy();
	}, [lesson_id]);

	const lesson_options = state.new_lesson !== null ? getFlattenedLessons(state.lessons) : null;

	return  ! content_id ? <div className={'text-align-center color-warning'.classNames()}>
		{__('Please save the overview first')}
	</div> 
	:
	<>
		{
			state.new_lesson===null ? null : 
			<Modal 
				closeOnDocumentClick={true} 
				nested={true} 
				onClose={closeModal}
			>
				<div data-cylector="lesson-title-field">
					<strong className={'d-block margin-bottom-8'.classNames()}>
						{__('Lesson Title')}
					</strong>
					<TextField
						value={state.new_lesson?.lesson_title || ''}
						onChange={v=>setNewLesson('lesson_title', v)}/>
				</div>
				<br/>

				{
					isEmpty(state.lessons) ? null : <>
						<div data-cylector="lesson-parent-field">
							<strong className={'d-block margin-bottom-8'.classNames()}>
								{__('Parent Lesson')}
							</strong>
							<DropDown 
								value={state.new_lesson?.parent_id}
								options={lesson_options}
								onChange={id=>setNewLesson('parent_id', id)}/>
						</div>
						<br/>
					</>
				}

				<div className={'text-align-right'.classNames()}>
					<button 
						onClick={closeModal} 
						className={'button button-outlined'.classNames()}
					>
						{__('Cancel')}
					</button>
					&nbsp;
					&nbsp;
					<button 
						className={'button button-primary'.classNames()} 
						onClick={saveNewLesson}
						disabled={readonly_mode || isEmpty(state.new_lesson?.lesson_title)}
						data-cylector="lesson-submit"
					>
						{__('Create')} <LoadingIcon show={state.saving}/>
					</button>
				</div>
			</Modal>
		}

		{
			(state.fetching || state.error_message) ?
			<InitState 
				fetching={state.fetching} 
				error_message={state.error_message}
			/>
			:
			(
				lesson_id ? 
				<LessonEditor 
					content_id={content_id}
					lesson_id={lesson_id}
					lessons={state.lessons}
				/> 
				:
				<div className={'margin-bottom-50'.classNames()}>
					<ListManager
						mode="queue"
						id_key="lesson_id"
						nested={false}
						label_key="lesson_title"
						permalink_key="lesson_permalink"
						list={state.lessons}
						addText={__('Add Lesson')}
						rename={false}
						onAdd={()=>setState({...state, new_lesson: {}})}
						onEdit={editLesson}
						deleteItem={deleteLesson}
						onChange={lessons=>{
							setState({...state, lessons});
							saveSequence(lessons);
						}}
					/>
				</div>
			)
		}
	</>
}
