export const getElementDataSet = element => {
	let {dataset = {}} = element;
	let data = {};
	for ( let k in dataset ) {
		data[k] = JSON.parse( dataset[k] );
	}

	return data;
}

export const getDashboardPath=(rel_path, append_slash=true)=>{
	const { home_path, manifest: {dashboard: {slug: dashboard_slug}} } = window.Solidie;
	const slash = append_slash ? (rel_path.indexOf( '/' ) === 0 ? '' : '/') : '';
	return home_path + dashboard_slug + slash + rel_path;
}