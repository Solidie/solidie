const builder = require('solidie-materials/builders/webpack');

module.exports = builder([
	{
		dest_path: './dist',
		src_files: {
			'admin-dashboard': './components/views/admin-dashboard/index.jsx',
			'frontend': './components/views/frontend/index.jsx',
			'frontend-dashboard-patch': './components/views/frontend-dashboard-patch/index.jsx'
		}
	}
]);
