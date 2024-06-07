import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { request } from "crewhrm-materials/request.jsx";
import { __ } from "crewhrm-materials/helpers.jsx";

import style from './tutorial.module.scss';
import { InitState } from "crewhrm-materials/init-state";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon";
import { getPageTitle } from "../gallery";
import { useRef } from "react";

function LessonList({lessons=[], level=1, active_slug, fetching=false}) {
	return <div className={`${level>1 ? 'margin-left-10' : ''}`.classNames()}>
		{
			lessons.map(lesson=>{

				const {lesson_id, lesson_slug, lesson_title, lesson_permalink, children=[]} = lesson;
				const active = active_slug === lesson_slug;

				return <div key={lesson_id}>
					<div className={'margin-bottom-15'.classNames()}>
						<Link to={lesson_permalink} className={`d-flex align-items-center column-gap-8 font-size-16 font-weight-400 color-text-50 ${active ? 'color-text font-weight-700 text-decoration-underline' : ''}`.classNames()}>
							{lesson_title} <LoadingIcon show={active && fetching}/>
						</Link>
					</div>

					{
						!children?.length ? null :
						<LessonList 
							lessons={children} 
							level={level+1}
							active_slug={active_slug}
							fetching={fetching}
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
	const {pathname} = useLocation();
	const path_segments = pathname.split('/').filter(p=>p);
	const active_slug = path_segments[path_segments.length - 1];
	const ref_wrapper = useRef();

	const reff_content = useRef();

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

		/* if ( ref_wrapper?.current ) {
			ref_wrapper.current.scrollIntoView(true);
		} */
		
	}, [state.lesson]);

	if ( state.error_message ) {
		// First request completed, but no lessons found
		return <InitState fetching={state.fetching} error_message={state.error_message}/>
	}

	return <div className={'tutorial'.classNames(style)} ref={ref_wrapper}>
		<Helmet>
			<title>
				{getPageTitle(state.lesson?.lesson_title)}
			</title>
		</Helmet>
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
					active_slug={active_slug}
					fetching={state.fetching}
				/>
			</div>
		</div>
		
		<div className={'content'.classNames(style)} ref={reff_content}>

			<LoadingIcon show={state.fetching} center={true}/>
			
			{
				!state.lesson ? 
				(
					state.fetching ? null :
					<div>
						<i className={'color-error'.classNames()}>
							{__('Lesson not found or may not be published yet!')}
						</i>
					</div> 
				)
				: 
				<div>
					<strong className={'font-size-24 d-block margin-bottom-15 font-weight-700'.classNames()}>
						{state.lesson.lesson_title}
					</strong>
					<div dangerouslySetInnerHTML={{__html: state.lesson?.lesson_content || ''}}></div>
				</div>
			}

			<div style={{margin: '20px 0'}}>
				<Pagination 
					lessons={state.lessons} 
					current_slug={active_slug}
				/>
			</div>
		</div>
	</div>
}
