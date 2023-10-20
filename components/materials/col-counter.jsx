import React, { createContext, useState, useRef, useEffect } from "react";

export const ContextColCounter = createContext();

export function ColCounter({children, columnWidth=400}) {

	const [col_count, setColCount] = useState(null);
	const wrapper = useRef();

	const getWidth=(el)=>{
		const styles       = window.getComputedStyle(el);
		const paddingLeft  = parseFloat(styles.paddingLeft);
		const paddingRight = parseFloat(styles.paddingRight);
		
		return el.clientWidth - paddingLeft - paddingRight;
	}

	const countColumns=()=>{

		if( ! wrapper || ! wrapper.current ) {
			return;
		}
		
		setColCount( Math.max( 1, Math.floor( getWidth( wrapper.current ) / columnWidth ) ) );
	}

	useEffect(()=>{
		countColumns();
		window.addEventListener('resize', countColumns);
		return ()=>window.removeEventListener('resize', countColumns);
	}, [wrapper]);

	return <div ref={wrapper}>
		<ContextColCounter.Provider value={{column_count: col_count}}>
			{col_count ? children : null}
		</ContextColCounter.Provider>
	</div>
}
