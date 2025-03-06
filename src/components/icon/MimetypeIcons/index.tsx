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

const MimeType: FC<IMimeTypeProps> = (props) => {

    const { style, mimeType, className, rounded = "rounded", ...rest } = props;
    const sharedClass = classNames('relative bg-stone-950/0', className, rounded);
    const ext = mime.extension(mimeType) ?? "";
    return (
        <div style={style} className={sharedClass}>
            <Icon
                icon='DuoFile'
                className='ml-3'
                {...rest}
            />
            <div className='rounded-sm text-xs absolute bg-slate-800 text-gray-400 uppercase text-center w-1/2 left-2 top-1/2 -translate-y-1/2'>
                {ext}
            </div>
        </div>
    );
};

export default MimeType;
