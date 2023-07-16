import React from 'react';

import style from './index.module.scss';

export function Catalog() {
	return <div className={'catalog-root'.classNames(style)}>
		<div className={"search-wrapper".classNames(style)}>
			<div>
				<div >All</div>  
				<ul>
					<li>All</li>
					<li>Recent</li>
					<li>Popular</li>
				</ul>
			</div>
			<div>
				<input type='text'/>
			</div>
			<div>
				<button>Search</button>
			</div>
		</div>
	</div>
}