import React, { useRef, useState, useEffect } from "react";

export function ResponsiveLayout({children, columnWidth=400, cardGap=15, className=''}) {

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
	}, []);

	const style = {
		display: 'grid',
		gap: cardGap+'px',
		gridTemplateColumns: 'repeat('+col_count+', 1fr)'
	}
	
	return <div ref={wrapper} style={style} className={className}>
		{col_count ? children : null}
	</div>
}

export function Ratio({children, x, y}) {
	return <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
		<div style={{aspectRatio: x + ' / ' + y}}>
			{children}
		</div>
	</div>
}
