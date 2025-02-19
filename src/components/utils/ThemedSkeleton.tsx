
import React, { FC } from 'react';
import colors from '@/tailwindcss/colors.tailwind';
import Skeleton, {type SkeletonProps} from 'react-loading-skeleton' ;
import useDarkMode from '@/hooks/useDarkMode';

const defaultDarkBaseColor = colors['zinc']['900'];
const defaultskelHighlightColor = colors['zinc']['800'];

const ThemedSkeleton: FC<SkeletonProps> = (props) => {

    const {baseColor, highlightColor, ...rest } = props;
    const {isDarkTheme} = useDarkMode();
    const base = isDarkTheme ? defaultDarkBaseColor: undefined;
    const highlight = isDarkTheme ? defaultskelHighlightColor : undefined;
    return (
        <Skeleton
            baseColor={baseColor ?? base}
            highlightColor={highlightColor ?? highlight}
            {...rest}
        />
    )
}

export default ThemedSkeleton;