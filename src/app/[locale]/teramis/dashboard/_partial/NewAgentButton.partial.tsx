import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import themeConfig from '@/config/theme.config';
import Icon from '@/components/icon/Icon';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

interface INewAgentButtonPartialProps extends HTMLAttributes<HTMLButtonElement> {
    size?: number|string;
}
const NewAgentButtonPartial: FC<INewAgentButtonPartialProps> = (props) => {
    const {size, style: propStyle, className, ...rest}  = props;
    const styleSize = (size !== undefined) ? {height: size, width: size } : {};
    const style = {...propStyle, ...styleSize}
    console.log(size, style)
    return (
		<button
            style={style}
			type='button'
			className={classNames(
                className,
				'group flex cursor-pointer items-center justify-center p-4 rounded-full',
                'border border-dashed border-zinc-500',
                'hover:border-zinc-300 hover:dark:border-zinc-800',
				themeConfig.transition,
			)}
			{...rest}>
			<Icon
				icon='HeroPlus'
				size='text-3xl'
				className={classNames(
					'text-zinc-500 group-hover:text-zinc-300 group-hover:dark:text-zinc-800',
					themeConfig.transition,
				)}
			/>
		</button>
	);
};

export default NewAgentButtonPartial;
