import React, { useContext, useEffect, useState } from "react";

import {__} from 'crewhrm-materials/helpers.jsx'
import {ListManager} from 'crewhrm-materials/list-manager/list-manager.jsx'
import { request } from "crewhrm-materials/request.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";

import { LessonEditor } from "./lesson-editor";
import { getDashboardPath } from "solidie-materials/helpers";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon";

export function TutorialManager({content_id, content_type, lesson_id, navigate}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		lessons: [],
		has_changes: false,
		saving: false,
		fetching: false
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
		
	}

	const updateLessons=()=>{
		
		if ( ! window.confirm(__('If you\'ve removed any lesson, it will delete all its children too. Sure to update?')) ) {
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
	(
		lesson_id ? 
		<LessonEditor lesson_id={lesson_id}/> 
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

			{
				!state.has_changes ? null :
				<div className={'d-flex align-items-center column-gap-15 margin-top-15'.classNames()}>
					<div className={'flex-1 text-align-right'.classNames()}>
						<i>{__('To edit lesson contents, you need to save the hierarchy first.')}</i>
					</div>
					<div>
						<button 
							className={'button button-primary'.classNames()} 
							onClick={updateLessons}
							disabled={state.saving || state.fetching}
						>
							{__('Save Hierarchy')} <LoadingIcon show={state.saving}/>
						</button>
					</div>
				</div>
			}
		</div>
	)
}
