import { Severity, Status, Confidence } from '@prisma/client';

export const shorten = (id: string, val:string, len:number = 20) => {
	if (!val) return val;
	const ele = document.getElementById(id);
	if (!ele) return val.length < len ? val : val.slice(-len);
	
	ele.textContent = "..." + val
	if (!ele || ele.scrollWidth <= ele.offsetWidth) return val;
	
	let remainder = val.length;
	let chars = val.length;

	while (remainder > 0) {
		const offset = remainder > 1 ? Math.floor(remainder / 2) : 1;
		remainder -= offset;
		chars += ((ele.scrollWidth > ele.offsetWidth) ? -offset : offset);
		ele.textContent = "..." + val.slice(-chars);
	}
    const dots = (chars != val.length) ? '...' : '';
	return dots + val.slice(-chars);
}

export const formatDate = (dt: Date | string | undefined | null) => {
    return dt ? new Date(dt).toLocaleString() : "";
}

export const plural = (num: number, ifSingular: string, ifPlural?: string) => {
    if (num == 1) return "1 " + ifSingular;
    return `${num} ${ifPlural ?? (ifSingular + "s")}`
}

const undefinedColor = {color:"zinc" as const, intensity: "500" as const}
export const confidenceToColor = (txt:Confidence) => {
	if (!txt) return undefinedColor;
	switch (txt.trim().toUpperCase()) {
		case "LOW": return { color: "sky" as const, intensity: "600" as const};
		case "MEDIUM": return { color: "amber" as const, intensity: "600" as const};
		case "HIGH": return { color: "red" as const, intensity: "700" as const};
		case "NONE": return { color: "blue" as const, intensity: "600" as const};
		default: return { color: "blue" as const, intensity: "600" as const};
	}
}

export const statusToColor = (txt:Status) => {
	if (!txt) return undefinedColor;
	switch (txt.trim().toUpperCase()) {
		case "CRAWLING": return { color: "emerald" as const, intensity: "600" as const};
		case "SCANNING": return { color: "indigo" as const, intensity: "600" as const};
		case "IDLE": return { color: "sky" as const, intensity: "600" as const};
		case "ERRORED": return { color: "red" as const, intensity: "700" as const};
		default: return { color: "blue" as const, intensity: "600" as const};
	}
}

export const severityToColor = (txt:Severity) => {
	if (!txt) return undefinedColor;
	switch (txt.trim().toUpperCase()) {
		case "HINT": return { color: "sky" as const, intensity: "600" as const};
		case "WARNING": return { color: "amber" as const, intensity: "600" as const};
		case "ERROR": return { color: "red" as const, intensity: "700" as const};
		case "FATAL": return { color: "violet" as const, intensity: "700" as const};
		default: return { color: "blue" as const, intensity: "600" as const};
	}
}

export const bytesToGigRatio   = 1e+9;
export const bytesToMegRatio   = 1e+6;
export const bytesToKbRatio    = 1e+3;

export const bytesToGigs = (val: number | string | bigint, suffix: string = " Gb") => 
	( Number(val) / bytesToGigRatio ).toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
export const gigsToBytes = (val: number | string | bigint, suffix: string = " B", asNum:boolean =false) => {
	const result = Number(val) * bytesToGigRatio;
	return asNum ? result : result.toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
}
export const bytesToMegs = (val: number | string | bigint, suffix: string = " Mb") => 
	( Number(val) / bytesToMegRatio ).toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
export const megsToBytes = (val: number | string | bigint, suffix: string = " B", asNum:boolean =false) => {
	const result = Number(val) * bytesToMegRatio;
	return asNum ? result : result.toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
}

export const bytesToKb = (val: number | string | bigint, suffix: string = " Mb") => 
	( Number(val) / bytesToKbRatio ).toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
export const kbToBytes = (val: number | string | bigint, suffix: string = " B", asNum:boolean =false) => {
	const result = Number(val) * bytesToKbRatio;
	return asNum ? result : result.toLocaleString(undefined, {maximumFractionDigits: 2}) + suffix;
}

export const bytesToHuman = (val: number | string | bigint, suffix?: string) => {
	const bSuffix = suffix ?? " B";
	const kbSuffix = suffix ?? " Kb";
	const mbSuffix = suffix ?? " Mb";
	const gbSuffix = suffix ?? " Gb";

	const nVal = Number(val);
	if (nVal < bytesToKbRatio) return `${val} ${bSuffix}`;
	if (nVal < bytesToMegRatio) return bytesToKb(val, kbSuffix);
	if (nVal < bytesToGigRatio) return bytesToMegs(val, mbSuffix);
	return bytesToGigs(val, gbSuffix);
}