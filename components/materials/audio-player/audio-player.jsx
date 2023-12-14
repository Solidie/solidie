import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from './wavesurfer.js';

import style from './player.module.scss';

export function AudioPlayer({src, title, thumbnail}) {

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
			height: 60,
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
			<div style={{width: '70px'}} className="">
				<img src={thumbnail} className={'width-p-100 height-auto'.classNames}/>
			</div>
			<div className={'flex-1'.classNames()}>
				<div className={'d-flex align-items-center'.classNames()}>
					<div style={{width: '50px'}}>
						<span className={'player-control'.classNames(style)}>
							<i 
								className={`ch-icon ${!state.is_playing ? 'ch-icon-play' : 'ch-icon-pause'} cursor-pointer font-size-28`.classNames()}
								onClick={playPause}
							></i>
						</span>
					</div>
					<div className={'flex-1'.classNames()}>
						<strong className={'d-block font-weight-500 font-size-16'.classNames()}>
							{title}
						</strong> 
					</div>
				</div>
				<div>
					<div ref={waveform_ref}></div>
				</div>
				<div>
		
				</div>
			</div>
		</div>
	</div>
}
