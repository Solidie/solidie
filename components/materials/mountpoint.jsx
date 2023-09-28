import React from 'react';
import { ToastWrapper } from './toast/toast.jsx';
import { WarningWrapper } from './warning/warning.jsx';

export function MountPoint({ children }) {
	return (
		<div data-crewhrm-selector="root" className={'root margin-bottom-15'.classNames()}>
			<ToastWrapper>
				<WarningWrapper>{children}</WarningWrapper>
			</ToastWrapper>
		</div>
	);
}
