import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
const coName = (companyName: string | undefined) => {
	return companyName ? " - " + companyName : "";
}
export interface IDefaultHeaderProps {
	companyName?: string;
}

const DefaultHeaderTitleCommon = ({companyName}:IDefaultHeaderProps) => {
	const { companyName: contextCompanyName } = useContext(ThemeContext);
	const name = companyName ?? contextCompanyName;
	return (
        <>
        <h2 className='mb-2'>Teramis<span className='text-zinc-500 text-2xl font-normal'>{coName(name)}</span></h2>
        </>
	);
};

export default DefaultHeaderTitleCommon;
