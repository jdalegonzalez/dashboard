import React, { useEffect, useMemo, useState } from 'react';
import { csv } from 'd3-fetch';
import sortBy from 'lodash/sortBy';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import colors from '@/tailwindcss/colors.tailwind';
import useDarkMode from '@/hooks/useDarkMode';
import themeConfig from '@/config/theme.config';

const ReactSimpleMapsExample1Partial = () => {
	const { isDarkTheme } = useDarkMode();
	const [data, setData] = useState<string[]>([]);
	const [maxValue, setMaxValue] = useState<number | string | undefined>(0);

	useEffect(() => {
		csv('/data.csv')
			.then((cities) => {
				const sortedCities = sortBy(cities, (o) => -o.population);
				setMaxValue(sortedCities[0].population);
				// @ts-expect-error This is fine
				setData(sortedCities);
			})
			.catch(() => {});
	}, []);

	// @ts-expect-error This is fine
	const popScale = useMemo(() => scaleLinear().domain([0, maxValue]).range([0, 24]), [maxValue]);

	return (
		<ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
			<Geographies geography='/features.json'>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography
							key={geo.rsmKey}
							geography={geo}
							fill={isDarkTheme ? '#ffffff10' : '#00000010'}
						/>
					))
				}
			</Geographies>
			{/* @ts-expect-error This is fine */}
			{data.map(({ city_code, lng, lat, population }) => {
				return (
					<Marker key={city_code} coordinates={[lng, lat]}>
						<circle
							className='animate-pulse'
							fill={`${
								colors[themeConfig.themeColor][themeConfig.themeColorShade]
							}50`}
							stroke={`${
								colors[themeConfig.themeColor][themeConfig.themeColorShade]
							}90`}
							r={popScale(population)}
						/>
					</Marker>
				);
			})}
		</ComposableMap>
	);
};

export default ReactSimpleMapsExample1Partial;
