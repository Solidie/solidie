import React, { useEffect, useState } from "react";

import {__} from 'crewhrm-materials/helpers.jsx'
import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {TextEditor} from 'crewhrm-materials/text-editor/text-editor.jsx';
import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";

function findParentLessonId(lessonId, lessons) {

    for (let lesson of lessons) {
        if (lesson.lesson_id === lessonId) {
            // If the current lesson matches the provided lessonId,
            // return undefined since it is the root level lesson
            return undefined;
        }

        if (lesson.children) {
            for (let child of lesson.children) {
                if (child.lesson_id === lessonId) {
                    // If the current child matches the provided lessonId,
                    // return the parent lesson's ID
                    return lesson.lesson_id;
                }

                if (child.children) {
                    // If the current child has children, recursively search
                    const parent = findParentLessonId(lessonId, [child]);
                    if (parent) {
                        return parent;
                    }
                }
            }
        }
    }

    // Return null if the lessonId is not found
    return null;
}

function flattenLessonsExcludingId(lessonId, lessons, level = 0) {

    let flattenedLessons = [];

    for (let lesson of lessons) {
        if (lesson.lesson_id !== lessonId) {
            // Create an indented text based on the current level
            let indentation = "-".repeat(level);
            // Add the lesson object to the flattened array with indentation
            flattenedLessons.push({id: lesson.lesson_id, label: `${indentation}${lesson.lesson_title}`});

            if (lesson.children) {
                // Recursively call the function for children lessons
				const child_levels = flattenLessonsExcludingId(lessonId, lesson.children, level + 1);
                flattenedLessons = [...flattenedLessons, ...child_levels];
            }
        }
    }

    return flattenedLessons;
}

export function LessonEditor({lesson_id}) {

	const [state, setState] = useState({
		fetching: true,
		saving: false,
		values: {
			lesson_title: '',
			lesson_content: ''
		}
	});
	
	const dispatchChange=(name, value)=>{
		setState({
			...state,
			values: {
				...state.values,
				[name]: value
			}
		});
	}

	const publishLesson=()=>{
		
	}

	const fetchLesson=()=>{

	}

	useEffect(()=>{
		fetchLesson();
	}, [lesson_id]);

	return <div>
		
		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-weight-600'.classNames()}>
				{__('Lesson Title')}
			</strong>
			<TextField
				value={state.values.lesson_title || ''}
				onChange={v=>dispatchChange('lesson_title', v)}
			/>
		</div>

		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-weight-600'.classNames()}>
				{__('Lesson Content')}
			</strong>
			<TextEditor
				value={state.values.lesson_content || ''}
				onChange={v=>dispatchChange('lesson_content', v)}
			/>
		</div>

		<div className={'text-align-right'.classNames()}>
			<button 
				className={'button button-primary button-small'.classNames()}
				onClick={publishLesson}
			>
				{__('Publish')}
			</button>
		</div>
	</div>
}
