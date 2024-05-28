import React, { useContext, useEffect, useState } from "react";

import { request } from "crewhrm-materials/request.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { __, data_pointer, formatDateTime, sprintf } from "crewhrm-materials/helpers.jsx";
import { FileUpload } from "crewhrm-materials/file-upload/file-upload.jsx";
import { TextField } from "crewhrm-materials/text-field/text-field.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";

import style from './release.module.scss';

const {readonly_mode} = window[data_pointer];

function Form({values, onChange, onSubmit, saving, onCancel}) {
	return <div>

		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-weight-600'.classNames()}>
				{__('Version')}
			</strong>
			<TextField
				value={values.version}
				onChange={v=>onChange('version', v)}
			/>
		</div>
		
		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-weight-600'.classNames()}>
				{__('Changelog')}
			</strong>
			<TextField
				value={values.changelog}
				type='textarea'
				onChange={v=>onChange('changelog', v)}
			/>
		</div>

		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-weight-600'.classNames()}>
				{__('New file')}
			</strong>
			<FileUpload
				value={values.file}
				onChange={file=>onChange('file', file)}
				accept={['application/zip']}
			/>
		</div>

		<div className={'text-align-right'.classNames()}>
			{
				!onCancel ? null :
				<>
					<button 
						className={'button button-primary button-outlined button-small'.classNames()}
						onClick={onCancel}
						disabled={saving}
					>
						{__('Cancel')}
					</button>
					&nbsp;&nbsp;
				</>
			}
			<button 
				className={'button button-primary button-small'.classNames()}
				onClick={()=>onSubmit()}
				disabled={readonly_mode || saving || !/\S+/.test(values.version) || !/\S+/.test(values.changelog) || (!values.release_id && !values.file)}
			>
				{values.release_id ? __('Update') : __('Publish')} <LoadingIcon show={saving}/>
			</button>
		</div>
	</div>
}

export function ReleaseManager({content_id}) {

	const {ajaxToast} = useContext(ContextToast);

	const initial_values = {
		file: null,
		version: '',
		changelog: '',
		release_id: 0
	}

	const [state, setState] = useState({
		fetching: false,
		saving: false,
		edit_saving: false,
		deleting: false,
		releases: [],
		values: {...initial_values},
		edit_values: null
	});

	const onChange=(name, value, key='values')=>{
		setState({
			...state,
			[key]: {
				...state[key],
				[name]: value
			}
		});
	}

	const openEditor=(release)=>{
		setState({
			...state, 
			edit_values: ! release ? null : {
				...release,
				changelog: release.changelog
			}
		});
	}

	const submitVersion=(key='values')=>{

		const save_key = key=='edit_values' ? 'edit_saving' : 'saving';
		
		setState({
			...state,
			[save_key]: true
		});

		const values = state[key];
			
		const release = {
			version: values.version,
			kses_changelog: (values.changelog || '').replace(/ +/g, ' ').replaceAll(/\n{2,}/g, '\n'),
			release_id: values.release_id,
			content_id
		}

		request('updateAppRelease', {release, file: values.file}, resp=>{
			ajaxToast(resp);

			setState({
				...state,
				[save_key]: false,
				edit_values: key=='edit_values' ? null : state.edit_values,
				values: key=='edit_values' ? state.values : {...initial_values},
				releases: resp.success ? ( resp.data?.releases || state.releases ) : state.releases
			});
		});
	}

	const fetchReleases=()=>{

		setState({
			...state,
			fetching: true
		});

		request('fetchReleases', {content_id}, resp=>{
			const {
				success,
				data: {
					releases=[]
				}
			} = resp;

			setState({
				...state,
				fetching: false,
				values: initial_values,
				releases
			});
		});
	}

	const deleteRelease=(release_id)=>{

		if ( readonly_mode ) {
			return;
		}

		const {version} = state.releases.find(r=>r.release_id==release_id) || '';

		if ( ! window.confirm( sprintf( __('Sure to delete %s?'), version ) ) ) {
			return;
		}
		
		setState({
			...state,
			deleting: true
		});

		request('deleteAppRelease', {release_id}, resp=>{
			ajaxToast(resp);

			setState({
				...state,
				deleting: false,
				releases: resp.success ? state.releases.filter(r=>r.release_id!=release_id) : state.releases
			});
		});
	}

	useEffect(()=>{
		if ( content_id ) {
			fetchReleases();
		}
	}, [content_id]);

	return ! content_id ? <div className={'text-align-center color-warning'.classNames()}>
		{__('Please save the overview first')}
	</div> 
	:
	<div className={'release-wrapper'.classNames(style)}>
		<div className={'border-1 b-color-tertiary bg-color-white padding-30 border-radius-10 margin-bottom-20'.classNames()}>
			<Form 
				onChange={onChange} 
				values={state.values}
				onSubmit={submitVersion}
				saving={state.saving}
			/>
		</div>
		
		<LoadingIcon center={true} show={state.fetching }/>

		{
			!state.releases.length ? null : <div>
				<strong className={'d-block font-weight-600 margin-bottom-10'.classNames()}>
					{__('Previous Release')}
				</strong>

				<table className={'table no-responsive bg-color-white'.classNames()}>
					<thead>
						<tr>
							<th>{__('Version')}</th>
							<th>{__('Changelog')}</th>
						</tr>
					</thead>
					<tbody>
						{
							state.releases.map(release=>{
								
								const {release_id, release_date, version, changelog} = release;

								return <tr key={release_id}>
									{
										state.edit_values?.release_id==release_id ?
										<td colSpan={2}>
											<Form 
												values={state.edit_values} 
												onChange={(name, value)=>onChange(name, value, 'edit_values')}
												onSubmit={()=>submitVersion('edit_values')}
												saving={state.edit_saving}
												onCancel={()=>openEditor(null)}
											/>
										</td> 
										:
										<>
											<td>
												<span className={'d-block font-size-16 font-weight-400 margin-bottom-5'.classNames()}>
													{version}
												</span>
												<small className={'d-block margin-bottom-10'.classNames()}>
													{formatDateTime( release_date )}
												</small>
												<span className={'actions'.classNames(style) + 'd-flex align-items-center column-gap-15'.classNames()}>
													<i 
														className={'ch-icon ch-icon-edit-2 font-size-16 cursor-pointer '.classNames()}
														onClick={()=>openEditor(release)}></i>
													<i 
														className={'ch-icon ch-icon-trash font-size-16 cursor-pointer '.classNames()}
														onClick={()=>deleteRelease(release_id)}></i>
													<a 
														href={release.download_url} 
														className={'ch-icon ch-icon-download font-size-16 cursor-pointer '.classNames()}></a>
												</span>
											</td>
											<td>
												<div dangerouslySetInnerHTML={{__html: (changelog || '').replaceAll('\n', '<br/>')}}></div>
											</td>
										</>
									}
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		}
	</div>
}