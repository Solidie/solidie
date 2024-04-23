import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { request } from "crewhrm-materials/request.jsx";
import { __, isEmpty } from "crewhrm-materials/helpers.jsx";

import style from './tutorial.module.scss';
import { InitState } from "crewhrm-materials/init-state";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon";

const er_msg = __('Something went wrong!');

function LessonList({lessons=[], level=1, active_slug}) {
	return <div className={`${level>1 ? 'margin-left-10' : ''}`.classNames()}>
		{
			lessons.map(lesson=>{

				const {lesson_id, lesson_slug, lesson_title, lesson_permalink, lesson_status, children=[]} = lesson;
				const active = active_slug === lesson_slug;

				return lesson_status!='publish' ? null : <div key={lesson_id}>
					<div className={'margin-bottom-15'.classNames()}>
						<Link to={lesson_permalink} className={`font-size-16 font-weight-400 color-text-light ${active ? 'color-text font-weight-600' : ''}`.classNames()}>
							{lesson_title}
						</Link>
					</div>

					{
						!children?.length ? null :
						<LessonList 
							lessons={children} 
							level={level+1}
							active_slug={active_slug}
						/>
					}
				</div>
			})
		}
	</div>
}

function getLinearLessions(lessons=[]) {

	let _lessons = [];

	for ( let i = 0; i<lessons.length; i++ ) {

		const lesson = lessons[i];
		
		if ( lesson.lesson_status != 'publish' ) {
			continue;
		}

		_lessons.push({...lesson, children: undefined});

		if ( lesson.children?.length ) {
			_lessons = [..._lessons, ...getLinearLessions(lesson.children)]; 
		}
	}

	return _lessons;
}

function Pagination({lessons=[], current_slug}) {
	
	const linear = useMemo(()=>getLinearLessions(lessons), [lessons]);

	const index = linear.findIndex(l=>l.lesson_slug==current_slug);
	const prev  = index > 0 ? linear[index-1] : null;
	const next  = index < (linear.length-1) ? linear[index+1] : null;

	const {lesson_permalink: prev_link, lesson_title: prev_title} = prev || {};
	const {lesson_permalink: next_link, lesson_title: next_title} = next || {};


	return <div className={'text-align-center'.classNames()}>
		<Link 
			to={prev_link || '#'}
			title={prev_title}
			className={`button button-primary button-small button-outlined ${!prev_link ? 'disabled' : ''}`.classNames()}
		>
			{__('Previous')}
		</Link>
		&nbsp;
		&nbsp;
		<Link 
			to={next_link || '#'}
			title={next_title}
			className={`button button-primary button-small button-outlined ${!next_link ? 'disabled' : ''}`.classNames()}
		>
			{__('Next')}
		</Link>
	</div>
}

export function Tutorial({path, content_slug}) {

	const navigate = useNavigate();

	const [state, setState] = useState({
		mobile_menu: false,
		fetching: true,
		lesson: null,
		lessons: [],
		error_message: null
	});

	const fetchLesson=()=>{

		setState({
			...state,
			fetching: true
		});

		request('loadLessonInTutorial', {lesson_path: path=='0' ? '' : path, content_slug}, resp=>{
			const {
				success,
				data: {
					lesson,
					lessons,
					message= __('Something went wrong!')
				}
			} = resp;

			setState({
				...state,
				fetching: false,
				lesson,
				lessons,
				error_message: success ? null : message
			});
		});
	}

	useEffect(()=>{
		fetchLesson();
	}, [path]);

	useEffect(()=>{
		// Load first lesson if currently it is first screen
		if ( path == '0' && state.lessons?.length ) {
			const {lesson_permalink} = state.lessons[0];
			navigate(new URL(lesson_permalink).pathname, {replace: true});
		}
	}, [state.lessons?.length]);

	useEffect(()=>{
		if( window.Prism ) {
			window.Prism.highlightAll();
		}
	}, [state.lesson]);

	if ( state.fetching && isEmpty( state.lessons ) ) {
		// Still loading first request of getting lessons
		return <InitState fetching={state.fetching}/>
	}

	if ( ! state.fetching && isEmpty( state.lessons ) ) {
		// First request completed, but no lessons found
		return <InitState error_message={state.error_message || er_msg}/>
	}

	return <div className={'tutorial'.classNames(style)}>
		<div className={'sidebar'.classNames(style)}>
			<div 
				className={'toggle'.classNames(style)}
				onClick={()=>setState({...state, mobile_menu: !state.mobile_menu})}
			>
				<strong className={'font-size-16 font-weight-500 flex-1'.classNames()}>
					{__('Lessons')}
				</strong>
				<i className={'ch-icon ch-icon-row-vertical'.classNames()}></i>
			</div>
			<div className={`menu-wrapper ${state.mobile_menu ? 'expanded' : ''}`.classNames(style)}>
				<LessonList 
					lessons={state.lessons} 
					active_slug={state.lesson?.lesson_slug}
				/>
			</div>
		</div>
		
		<div className={'content'.classNames(style)}>
			<LoadingIcon show={state.fetching} center={true}/>
			{
				(!state.fetching && !state.lesson) ? 
				<div>
					{state.error_message || er_msg}
				</div> : <div>
					<strong>
						{state.lesson?.lesson_title}
					</strong>
					<div dangerouslySetInnerHTML={{__html: state.lesson?.lesson_content || ''}}></div>
				</div>
			}

			<Pagination 
				lessons={state.lessons} 
				current_slug={state.lesson?.lesson_slug}
			/>
		</div>
	</div>
}