import React from 'react';
import {Helmet} from 'react-helmet';
import { ToastWrapper } from './toast/toast.jsx';
import { WarningWrapper } from './warning/warning.jsx';

export function MountPoint({ children }) {
	return (
		<div data-solidie-selector="root" className={'root margin-bottom-15'.classNames()}>
			<Helmet>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,200,0,0" />
			</Helmet>
			<ToastWrapper>
				<WarningWrapper>{children}</WarningWrapper>
			</ToastWrapper>
		</div>
	);
}
