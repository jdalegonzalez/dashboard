/* @type {import('next').NextConfig} */
/*
const nextConfig = {
	webpack: function (config) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader',
		});
		return config;
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};
*/
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
	experimental: {
		turbo: {
		},
	},
}
module.exports = nextConfig;
