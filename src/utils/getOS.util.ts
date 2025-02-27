const getOS = (): 'MacOS' | 'iOS' | 'Windows' | 'Android' | 'Linux' => {
	// @ts-expect-error This is fine TypeScript doesn't know about the window.navigator
	const { userAgent } = typeof window !== 'undefined' && window.navigator;
	// @ts-expect-error This is fine TypeScript doesn't know about the window.navigator
	const { platform } = typeof window !== 'undefined' && window.navigator;
	const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
	const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
	const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
	let os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'MacOS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	typeof window !== 'undefined' && os && document.documentElement.setAttribute('os', os);
	// @ts-expect-error This is fine TypeScript doesn't know about document.documentElement.getAttribute
	return os;
};

export default getOS;
