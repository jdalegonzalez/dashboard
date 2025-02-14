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
	async redirects() {
		return [{
			source: '/',
			destination: '/teramis/dashboard',
			permanent: true
		}]
	},
	experimental: {
		turbo: {
			rules: {
				'*.md': {
					loaders: ['raw-loader'],
					as: 'ts'
				}
			}
		},
	},
}
module.exports = nextConfig;
