import React from "react";

import style from './tabs.module.scss';

export function Tabs({tabs=[], active, onChange}) {
	return <div className={'tabs'.classNames(style)}>
		{
			tabs.map(tab=>{
				const {id, label} = tab;
				return <div 
					key={id} 
					className={`${active===id ? 'active' : ''}`.classNames(style)} 
					onClick={()=>onChange(id)}
				>
					{label}
				</div>
			})
		}
	</div>
}
