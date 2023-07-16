import React from 'react';

import style from './index.module.scss';

export function Catalog() {
	return <div className={'catalog-root'.classNames(style)}>
		<div className={"search-wrapper".classNames(style)}>
			<div className={"search_box".classNames(style)}>
				<div className={"dropdown".classNames(style)}>
					<div className={"default_option".classNames(style)}>All</div>  
					<ul className={'active'.classNames(style)}>
						<li>All</li>
						<li>Recent</li>
						<li>Popular</li>
					</ul>
				</div>
				<div className={"search_field".classNames(style)}>
					<input type="text" className={"input".classNames(style)} placeholder="Search"/>
					<i className={"fas fa-search".classNames(style)}></i>
				</div>
			</div>
		</div>
	</div>
}