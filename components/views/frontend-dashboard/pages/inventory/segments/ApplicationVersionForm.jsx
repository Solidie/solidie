import React, { useEffect, useState } from "react";
import { request } from "crewhrm-materials/request.jsx";
import { useParams } from "react-router-dom";

export function VersionReleaseForm() {
	const {content_id, release_id} = useParams();
	const [state, setState] = useState({values:{}, release:{}, loading: false});
	
	// To Do: Add file type validation

	const onChange=(e)=>{
		let {type, files, value, name} = e.currentTarget;

		setState({
			...state,
			values:{
				...state.values,
				[name]: type === 'file' ? files[0] : value
			}
		});
	}

	const getRelease=()=>{
		setState({...state, loading: true});

		request('getSingleRelease', {release_id}, resp=>{
			let {release} = resp?.data || {};

		});
	}

	const onSubmit=(e)=>{
		e.preventDefault();
		request('versionRelease', {...state.values, content_id, release_id}, resp=>{
			console.log(resp);
		});
	}

	useEffect(()=>{
		getRelease();
	}, []);
	

  	return <div className={"z-20 flex flex-col gap-5".classNames()}>
		<button onClick={window.history.back} className={"flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer".classNames()}>
			<i className={'s-icon s-icon-arrow-left'.classNames()}></i> Back
		</button>
		<h3>{state.release.content_title} - <strong>{state.release.version}</strong></h3>
		<div>
			<div>
				<Form.Root className={" bg-tertiary/20 -lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3".classNames()}>
					<div className={"flex justify-between gap-4 flex-wrap sm:flex-nowrap width-p-100 height-p-100".classNames()}>
						<div className={"flex gap-4 flex-wrap width-p-100".classNames()}>
							<Form.Field name="upload-application-zip-file" className={"flex flex-col gap-1 width-p-100 sm:max-w-xs".classNames()}>
								<div className={"flex items-base justify-between".classNames()}>
									<Form.Label className={"Label".classNames()}>
										Upload Application Zip File
									</Form.Label>
									<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
										Please upload one
									</Form.Message>
								</div>
								<Form.Control asChild className={"width-p-100".classNames()}>
									<input type="file" name="file" onChange={onChange}/>
								</Form.Control>
							</Form.Field>

							<Form.Field name="version" className={"flex flex-col gap-1 width-p-100 sm:max-w-xs".classNames()}>
								<div className={"flex items-base justify-between".classNames()}>
									<Form.Label className={"Label".classNames()}>version</Form.Label>
									<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
										Please enter Version Number
									</Form.Message>
								</div>
								<Form.Control asChild className={"width-p-100".classNames()}>
									<input type="text" placeholder="e.g 1.2.21" name="version" onChange={onChange} defaultValue={state.release.version}/>
								</Form.Control>
							</Form.Field>
			
							<Form.Field name="change-log" className={"flex flex-col gap-1 width-p-100 sm:max-w-md h-auto".classNames()}>
								<div className={"flex items-base justify-between".classNames()}>
									<Form.Label className={"Label".classNames()}>Change Log</Form.Label>
									<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
									Please enter a ChangeLog
									</Form.Message>
								</div>
								<Form.Control asChild className={"width-p-100 height-p-100".classNames()}>
									<textarea className={"height-p-100 min-h-[6rem]".classNames()} placeholder="ChangeLog ..." name="changelog" onChange={onChange} value={state.release.changelog}></textarea>
								</Form.Control>
							</Form.Field>
						</div>
					</div>
					<Form.Submit asChild>
						<button className={"Button mt-2".classNames()} onClick={onSubmit}>
							{release_id ? 'Update' : 'Submit'}
						</button>
					</Form.Submit>
				</Form.Root>
			</div>
		</div>
	</div>
}
