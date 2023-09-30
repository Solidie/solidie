import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from './wavesurfer.js';

export function AudioPlayer({content, className}) {

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
			url: 'http://localhost:10008/wp-content/uploads/2023/09/friendly-melody-14015.mp3',
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

	return <div className={className}>
		<div ref={waveform_ref}></div>
		<div className={'d-flex align-items-center'.classNames()}>
			<div>
				<i 
					className={`g-icon ${!state.is_playing ? 'g-icon-play_circle_outline' : 'g-icon-pause_circle_outline'} cursor-pointer font-size-28`.classNames()}
					onClick={playPause}
				></i>
			</div>
			<div>
				<strong className={'d-block font-weight-500 font-size-16'.classNames()}>
					The Audio Name
				</strong> 
			</div>
		</div>
	</div>
}
