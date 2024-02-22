import React, { useContext, useEffect, useState } from "react";

import {__} from 'crewhrm-materials/helpers.jsx'
import {ListManager} from 'crewhrm-materials/list-manager/list-manager.jsx'
import { request } from "crewhrm-materials/request.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon";
import { InitState } from "crewhrm-materials/init-state.jsx";

import { LessonEditor } from "./lesson-editor";
import { getDashboardPath } from "solidie-materials/helpers";

export function TutorialManager({content_id, content_type, lesson_id, navigate}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		lessons: [],
		has_changes: false,
		saving: false,
		fetching: false,
		error_message: null,
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

	const updateLessons=()=>{
		
		if ( ! window.confirm(__('Sure to save the changes?')) ) {
			return;
		}

		setState({
			...state,
			saving: true
		});

		request('updateLessonsHierarchy', {lessons: state.lessons, content_id}, resp=>{
			
			const {success, data:{lessons=[]}} = resp;

			ajaxToast(resp);

			setState({
				...state,
				saving: false,
				has_changes: !success,
				lessons: success ? lessons : state.lessons
			})
		})
	}

	useEffect(()=>{
		fetchLessonsHierarchy();
	}, [lesson_id]);

	return  ! content_id ? <div className={'text-align-center color-warning'.classNames()}>
		{__('Please save the overview first')}
	</div> 
	:
	<>
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
						label_key="lesson_title"
						list={state.lessons}
						onChange={setLessons}
						onEdit={!state.has_changes ? editLesson : null}
						addText={__('Add Lesson')}
						nested={true}
					/>

					<div className={'d-flex align-items-center column-gap-15 margin-top-15'.classNames()}>
						<div className={'flex-1 text-align-right'.classNames()}>
							{
								!state.has_changes ? null :
								<i>
									{__('To edit lesson contents, you need to save the hierarchy first.')}
								</i>
							}
						</div>
						<div>
							<button 
								className={'button button-primary'.classNames()} 
								onClick={updateLessons}
								disabled={state.saving || state.fetching || !state.has_changes}
							>
								{__('Save Hierarchy')} <LoadingIcon show={state.saving}/>
							</button>
						</div>
					</div>
				</div>
			)
		}
	</>
}
