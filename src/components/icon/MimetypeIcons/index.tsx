import React, {FC} from 'react';
import mime from 'mime-types';
import { TColors } from '@/types/colors.type';
import { TColorIntensity } from '@/types/colorIntensities.type';
import { TFontSizes } from '@/types/fontSizes.type';
import { TRounded } from '@/types/rounded.type';

import Icon from '@/components/icon/Icon';
import classNames from 'classnames';

export interface IMimeTypeProps {
    mimeType: string;
    className?: string;
    style?: React.CSSProperties;
    rounded?: TRounded;
    color?: TColors;
    colorIntensity?: TColorIntensity;
    size?: TFontSizes;    
}
/*
<div class="relative bg-stone-950/10 rounded-full" style="margin: auto; width: 30px;">
    <svg viewBox="0 0 24 24" class="svg-icon text-4xl ml-2" data-component-name="Icon-B" data-name="Duotone--DuoFile">
        <g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M5.857 2h7.88a1.5 1.5 0 01.968.355l4.764 4.029A1.5 1.5 0 0120 7.529v12.554c0 1.79-.02 1.917-1.857 1.917H5.857C4.02 22 4 21.874 4 20.083V3.917C4 2.127 4.02 2 5.857 2z" fill="currentColor" opacity="0.3"></path><rect fill="currentColor" x="6" y="11" width="9" height="2" rx="1"></rect><rect fill="currentColor" x="6" y="15" width="5" height="2" rx="1"></rect></g>
    </svg>
    <div class="rounded-sm text-sm absolute bg-slate-800 text-gray-400 uppercase text-center top-1/2 -translate-y-1/2" style="padding-left: .25em;padding-right: .25em;left: -2px;">
        pdf
    </div>
</div>
*/
const MimeType: FC<IMimeTypeProps> = (props) => {

    const { style, mimeType, className, rounded = "rounded-full", ...rest } = props;
    const sharedClass = classNames('relative bg-stone-950/10', className, rounded);
    const ext = mime.extension(mimeType) ?? "";
    return (
        <div style={style} className={sharedClass}>
            <Icon
                icon='DuoFile'
                className='ml-2'
                {...rest}
            />
            <div className='rounded-sm absolute bg-slate-800 text-gray-400 uppercase text-center w-1/2 left-2 top-1/2 -translate-y-1/2'>
                {ext}
            </div>
        </div>
    );
};

export default MimeType;
