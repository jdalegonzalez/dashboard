const coName = () => {
	const txt = process.env?.NEXT_PUBLIC_COMPANY_NAME ?? "";
	return txt ? " - " + txt : "";
}

const DefaultHeaderTitleCommon = () => {
	return (
        <>
        <h2 className='mb-2'>Teramis<span className='text-zinc-500 text-2xl font-normal'>{coName()}</span></h2>
        </>
	);
};

export default DefaultHeaderTitleCommon;
