import React from "react";

import { Ratio } from "crewhrm-materials/responsive-layout.jsx";

import { AudioPlayer } from "../../../../materials/audio-player/audio-player.jsx";

import style from './style.module.scss';

export function SingleCard({content={}}) {
	let {content_id, content_name, thumbnail_url, content_type} = content;

	return <div className={'w-full h-full border-radius-7'.classNames() + 'single-card'.classNames(style)}>

	</div>
}
