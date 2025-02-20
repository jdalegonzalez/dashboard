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

export const formatDate = (dt: Date | string) => {
    return new Date(dt).toLocaleString()
}

export const plural = (num: number, ifSingular: string, ifPlural?: string) => {
    if (num == 1) return "1 " + ifSingular;
    return `${num} ${ifPlural ?? (ifSingular + "s")}`
}