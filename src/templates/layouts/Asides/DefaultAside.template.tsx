import React from 'react';
import { appPages } from '@/config/pages.config';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import Nav, {
	NavItem,
	NavSeparator,
} from '../../../components/layouts/Navigation/Nav';

const DefaultAsideTemplate = () => {
	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.teramisAppPages.subPages.teramisDashboardPage} />
					<NavItem
						{...appPages.teramisAppPages.subPages.agentPage.subPages.listPage}
					/>
				</Nav>
			</AsideBody>
			<AsideFooter>
				<Nav>
					<NavSeparator />
				</Nav>
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
