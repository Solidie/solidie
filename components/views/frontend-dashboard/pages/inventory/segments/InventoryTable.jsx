import React from "react";
import { Link } from "react-router-dom";

const InventoryTable = props => {
	let {contents=[]} = props;

	return <div className={"flex flex-col w-full gap-4 min-h-max".classNames()}>
		{
			contents.map((content, idx) =>{
				let {content_id, content_name, logo_url} = content;

				return <div key={content_id} className={"flex-wrap gap-5 text-base flex items-center justify-between w-full bg-tertiary/20 lightest-version rounded-lg px-4 py-4 shadow-md transition-all delay-75 hover:shadow-lg border-4 border-tertiary/20".classNames()}>
					<div>
						<div class="w-10 h-10" style={{display: 'inline-block', verticalAlign: 'middle', backgroundImage: 'url('+logo_url+')', backgroundSize: 'cover', marginRight: '6px', borderRadius: '5px'}}></div>
						<span className={"font-bold".classNames()}>{content_name}</span>
					</div>
					<div className={"flex items-center gap-2".classNames()}>
						<div className={"bg-primary p-2 rounded-md text-xs font-bold".classNames()}>
							Uppublished
						</div>
					</div>
					<div className={" w-full md:w-max flex justify-between items-center flex-wrap gap-5".classNames()}>
						<span>
							Trash icon here
						</span>
						<Link to={content_id+"/edit"}>
							Edit icon
						</Link>
						<Link to={content_id+"/release-management"}>
							Release icon here
						</Link>
					</div>
				</div>
			})
		}
	</div>
};

export default InventoryTable;