import React from 'react';

const LoaderDotsCommon = () => {
	return (
		<>
			<style>{`@keyframes loaderDots { 0% {opacity: 1} 50%,to {opacity: .15} }`}</style>
			<div className='flex space-x-1.5'>
				<div className='h-2 w-2 animate-[loaderDots_0.6s_0s_infinite_alternate] rounded-full bg-zinc-500' />
				<div className='h-2 w-2 animate-[loaderDots_0.6s_0.3s_infinite_alternate] rounded-full bg-zinc-500' />
				<div className='h-2 w-2 animate-[loaderDots_0.6s_0.6s_infinite_alternate] rounded-full bg-zinc-500' />
			</div>
		</>
	);
};

<<<<<<< HEAD
type TFormatter = (val: any) => string;
export function loadingOrProperty<T>(obj: T|undefined, key:keyof T, wrapperClass:string='', formatter?:TFormatter) {
	const cname = wrapperClass ? {className: wrapperClass} : {};
	return obj?.[key] !== undefined
		? formatter ? formatter(obj[key]) : obj[key] 
		: <div {...cname} ><LoaderDotsCommon /></div>;
}

=======
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
export default LoaderDotsCommon;
