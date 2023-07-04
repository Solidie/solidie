const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [,
	require('postcss-preset-env')({
      stage: 1,
      features: {
        'color-mod-function': true
      }
    }),
    tailwindcss
  ],
};