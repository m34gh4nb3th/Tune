//this component sets up the tabs for the different types of info and the corresponding charts
import React from 'react';
import '../App.css';
import Chart from './Chart';
import { DashboardConsumer } from '../Providers/DashboardProvider';

import { Statistic, Tabs } from 'antd';

let tabsArray = {
    impression : {
        key: '1',
        type: 'impression',
        color: "#1890ff",
        title: 'Impressions',
    },
    conversion : {
        key: '2',
        type: 'conversion',
        color: "#1890ff",
        title: 'Conversions',
    },
    revenue : {
        key: '3',
        type: 'revenue',
        color: '#3f8600',
        title: 'Revenue',
    },
};
    

const StatsContent = (props) => {
    let tabComponents = [];
    for (var tabKey in tabsArray) {
        let tab = tabsArray[tabKey];
        tabComponents.push(
            <Tabs.TabPane tab={
                                <Statistic 
                                    title={tab['title']} 
                                    value={props.user[tab['type']]} 
                                    valueStyle={{ color: tab['color'], fontSize: '16px'}}
                                    prefix={tab['type'] == 'revenue' ? "$" : ""}
                                    precision={tab['type'] == 'revenue' ? 2 : 0} />
                                } 
                            key={tab['key']}>
                <Chart user={props.user} typeInfo={tab}/>
            </Tabs.TabPane>
        );
    }

    return (
        <Tabs defaultActiveKey={props.sort == null ||  props.sort == 'name' ? "1" : tabsArray[props.sort]["key"]}>
            {tabComponents}
        </Tabs>
    );
}


    const Stats = (props) => (
		<DashboardConsumer>
			{({ sort }) => (
				<StatsContent
					sort={sort}
                    user={props.user}
				/> 
			)}
		</DashboardConsumer>
	)


export default Stats;



