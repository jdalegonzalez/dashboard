import React from 'react';
import { appPages, componentsPages } from '@/config/pages.config';
// import { useRouter } from 'next/navigation';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import Nav, {
	NavButton,
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
	// NavUser,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
// import UserTemplate from '../User/User.template';
// import usersDb from '../../../mocks/db/users.db';

const removeSubPages = (obj: any) => {
	const {['subPages']: unused, ...rest} = obj;
	return rest as { text : string, to : string, icon : string };
}

const DefaultAsideTemplate = () => {
	// const router = useRouter();

	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					{/* <NavItem {...appPages.teramisAppPages.subPages.teramisDashboardPage}>
						<NavButton
							title='New Agent'
							icon='HeroPlusCircle'
							onClick={() => {
								router.push(
									`../${appPages.teramisAppPages.subPages.agentPage.to}/new`,
								);
							}}
						/>
					</NavItem> */}
					{/* <NavCollapse
						text={appPages.teramisAppPages.text}
						to={appPages.teramisAppPages.to}
						icon={appPages.teramisAppPages.icon}> */}
						<NavItem {...appPages.teramisAppPages.subPages.teramisDashboardPage} />
						<NavItem
								{...appPages.teramisAppPages.subPages.agentPage.subPages.listPage}
							/>
						{/* <NavCollapse
							text={appPages.teramisAppPages.subPages.agentPage.text}
							to={appPages.teramisAppPages.subPages.agentPage.to}
							icon={appPages.teramisAppPages.subPages.agentPage.icon}>
							<NavItem
								{...appPages.teramisAppPages.subPages.agentPage.subPages.listPage}
							/>
							<NavItem
								{...appPages.teramisAppPages.subPages.agentPage.subPages.editPage}
							/>
						</NavCollapse> */}
					{/* </NavCollapse> */}
				</Nav>
			</AsideBody>
			<AsideFooter>
				<Nav>
					<NavSeparator />
				</Nav>

				{/* <UserTemplate /> */}
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
