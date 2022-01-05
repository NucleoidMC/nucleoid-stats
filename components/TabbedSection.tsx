export interface Props {
    tabs: Tabs
    hideTabRow?: boolean
    selected: string
    updateSelected: (selected: string) => void
    className?: string
    tabLineClassName?: string
    tabClassName?: string
    selectedTabClassName?: string
}

export interface Tabs {
    [id: string]: Tab
}

export interface Tab {
    name: JSX.Element
    content: JSX.Element
}

const TabbedSection: React.FC<Props> = ({tabs, className, ...props }) => {
    let selected = props.selected;
    if (!Object.prototype.hasOwnProperty.call(tabs, selected)) {
        const tabNames = Object.keys(tabs);
        tabNames.sort((a, b) => a.localeCompare(b));
        selected = tabNames[0];
    }

    return <div className={className}>
        {!props.hideTabRow && <TabRow tabs={tabs} className={className} {...props} selected={selected} />}

        {tabs[selected].content}
    </div>
}

export const TabRow: React.FC<Props> = ({tabs, ...props}) => {
    const tabNames = Object.keys(tabs);
    tabNames.sort((a, b) => a.localeCompare(b));

    return <div className={props.tabLineClassName}>
        {tabNames.map(tabId =>
            <div className={props.selected === tabId ? props.selectedTabClassName : props.tabClassName}
                onClick={() => props.updateSelected(tabId)} key={tabId}>
                {tabs[tabId].name}
            </div>
        )}
    </div>
}

export default TabbedSection;
