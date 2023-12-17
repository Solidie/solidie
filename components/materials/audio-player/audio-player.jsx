import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from './wavesurfer.js';

import style from './player.module.scss';
import { Link } from "react-router-dom";

export function AudioPlayer({src, permalink, title, thumbnail, height=40}) {

	const waveform_ref = useRef();
	const [state, setState] = useState({
		player: null,
		is_playing: false
	});

	const buildPlayer=()=>{

		// Create a canvas gradient
		const ctx = document.createElement('canvas').getContext('2d')
		const gradient = ctx.createLinearGradient(0, 0, 0, 150)
		gradient.addColorStop(0, 'rgb(200, 0, 200)')
		gradient.addColorStop(0.7, 'rgb(100, 0, 100)')
		gradient.addColorStop(1, 'rgb(0, 0, 0)')

		// Default style with a gradient
		const wavesurfer = WaveSurfer.create({
			container: waveform_ref.current,
			waveColor: gradient,
			height,
			progressColor: 'rgba(0, 0, 100, 0.5)',
			url: src,
		});

		setState({
			...state,
			player: wavesurfer
		});
	}

	const playPause=()=>{
		if ( ! state.player ) {
			return;
		}

		state.player[state.is_playing ? 'pause' : 'play']();

		setState({
			...state,
			is_playing: !state.is_playing
		});
	}

	useEffect(()=>{
		buildPlayer();
	}, []);

	return <div className={'audio'.classNames(style) + 'padding-15 border-radius-5'.classNames()}>
		<div className={'d-flex column-gap-15'.classNames()}>
			<div style={{width: '70px'}}>
				<Link to={permalink} className={'d-block cursor-pointer'.classNames()}>
					<img src={thumbnail} className={'width-p-100 height-auto'.classNames()}/>
				</Link>
			</div>
			<div className={'flex-1'.classNames()}>
				<div 
					className={'d-flex align-items-center column-gap-15 margin-bottom-10 border-bottom-1 b-color-tertiary'.classNames()}
					style={{paddingBottom: '10px'}}
				>
					<div className={'player-control'.classNames(style)} onClick={playPause}>
						<i className={`ch-icon ${!state.is_playing ? 'ch-icon-play' : 'ch-icon-pause'} font-size-14`.classNames()}></i>
					</div>
					<div className={'flex-1'.classNames()}>
						<Link to={permalink} className={'d-block font-weight-500 font-size-16 cursor-pointer'.classNames()}>
							{title}
						</Link> 
					</div>
				</div>
				<div>
					<div ref={waveform_ref} style={{cursor: 'text'}}></div>
				</div>
				<div>
		
				</div>
			</div>
		</div>
	</div>
}
