import { ReactNode, useState } from 'react';
import cx from 'classnames';

interface TabbedAreaProps {
tabs: TabProps[];
}

interface TabProps {
id: string;
dependantId?: string;
label: string;
Component: ReactNode;
}

export const tabsFixture: TabProps[] = [
{
id: 'unions',
label: 'Unions',
Component: <div>This is the content for Tab 1</div>,
},
{
id: 'societies',
dependantId: 'unions',
label: 'Societies',
Component: <div>This is the content for Tab 2</div>,
},
{
id: 'faqs',
dependantId: 'unions',
label: 'FAQs',
Component: <div>This is the content for Tab 3</div>,
},
];

const TabbedArea: React.FC<TabbedAreaProps> = ({ tabs }) => {
const [activeTab, setActiveTab] = useState(0);

const handleTabClick = (i: number) => {
// Check if the selected tab has a dependantId
const dependantId = tabs[i].dependantId;
if (dependantId) {
// Check if the dependant tab has been selected yet
const dependantTabIndex = tabs.findIndex(tab => tab.id === dependantId);
if (dependantTabIndex > activeTab) {
// If the dependant tab hasn't been selected yet, don't change the active tab
return;
}
}
setActiveTab(i);
}

return (

<div>
<div className="tabs gap-8 items-center">
{tabs.map((tab, i) => (
<a
key={tab.id}
href={`#item${i}`}
className={cx('tab', i === activeTab && 'tab-bordered tab-active')}
onClick={() => handleTabClick(i)} >
{tab.label}
</a>
))}
</div>
<div className="carousel w-full">
{tabs.map((tab, i) => (
<div
key={tab.id + 'tab'}
id={`item${i}`}
className="carousel-item w-full" >
{tab.Component}
</div>
))}
</div>
</div>
);
};

export default TabbedArea;
