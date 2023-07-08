import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input, Textarea } from "../../../ui";
import { request } from "../../../../utilities/request.jsx";
import { useParams } from "react-router-dom";

export function VersionReleaseForm() {
	const {content_id, release_id} = useParams();
	const [state, setState] = useState({values:{}});
	
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

	const onSubmit=(e)=>{
		e.preventDefault();
		request('version_release', {...state.values, content_id, release_id}, resp=>{
			console.log(resp);
		});
	}

  	return <div className={"z-20 flex flex-col gap-5".classNames()}>
		<Form.Root className={" bg-tertiary/20 -lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3".classNames()}>
			<div className={"flex justify-between gap-4 flex-wrap sm:flex-nowrap w-full h-full".classNames()}>
				<div className={"flex gap-4 flex-wrap w-full".classNames()}>
					<Form.Field name="upload-application-zip-file" className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}>
						<div className={"flex items-base justify-between".classNames()}>
							<Form.Label className={"Label".classNames()}>
								Upload Application Zip File
							</Form.Label>
							<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
								Please upload one
							</Form.Message>
						</div>
						<Form.Control asChild className={"w-full".classNames()}>
							<Input type="file" name="file" onChange={onChange}/>
						</Form.Control>
					</Form.Field>

					<Form.Field name="version" className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}>
						<div className={"flex items-base justify-between".classNames()}>
							<Form.Label className={"Label".classNames()}>version</Form.Label>
							<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
								Please enter Version Number
							</Form.Message>
						</div>
						<Form.Control asChild className={"w-full".classNames()}>
							<Input type="text" placeholder="e.g 1.2.21" name="version" onChange={onChange}/>
						</Form.Control>
					</Form.Field>
	
					<Form.Field name="change-log" className={"flex flex-col gap-1 w-full sm:max-w-md h-auto".classNames()}>
						<div className={"flex items-base justify-between".classNames()}>
							<Form.Label className={"Label".classNames()}>Change Log</Form.Label>
							<Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
							Please enter a ChangeLog
							</Form.Message>
						</div>
						<Form.Control asChild className={"w-full h-full".classNames()}>
							<Textarea className={"h-full min-h-[6rem]".classNames()} placeholder="ChangeLog ..." name="changelog" onChange={onChange}/>
						</Form.Control>
					</Form.Field>
				</div>
			</div>
			<Form.Submit asChild>
				<button className={"Button mt-2".classNames()} onClick={onSubmit}>Publish</button>
			</Form.Submit>
		</Form.Root>
	</div>
}
