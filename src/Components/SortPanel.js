//panel with buttons to select the sort and pass the information up to the provider
import React, {Fragment} from 'react';
import '../App.css';

import { DashboardConsumer } from '../Providers/DashboardProvider';

import { Card, Row, Icon, Radio } from 'antd';

const sortOptions = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Total Impressions',
        value: 'impression',
    },
    {
        label: 'Total Conversions',
        value: 'conversion',
    },
    {
        label: 'Total Revenue',
        value: 'revenue',
    },
]


class SortPanelContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filtersShown: true,
            ascending: true,
            sortSelected: null,
        }
    };

    componentWillUpdate(nextProps, nextState) {
        //calling the provider method here so I can get the most recent version of ascending
        if (nextState.sortSelected != this.state.sortSelected ||
            nextState.ascending != this.state.ascending) {
                this.props.updateSort(nextState.sortSelected, nextState.ascending);
            }
    }

    toggleFilters = () => {
        this.setState( prevState => ({ filtersShown : !prevState.filtersShown }));
    }

    selectSort = (event) => {
        let sort = event.target.value;
        if (sort == this.state.sortSelected) {
            this.setState( prevState => ({ 
                ascending : !prevState.ascending,
                sortSelected: sort,
            }));
        } else {
            this.setState({ 
                ascending: true,
                sortSelected: sort,
            });
        }
    }

  render() {
    return (
        <Card style={{marginBottom: '10px'}}>
            <h3 onClick={this.toggleFilters}>
                <Icon type={this.state.filtersShown ? "caret-down" : "caret-right"} style={{paddingRight: '8px'}}/> 
                Sort Options
            </h3>
            {this.state.filtersShown && 
                <Fragment>
                    <Row style={{paddingTop: '10px'}}>
                        <Radio.Group 
                        buttonStyle="solid">
                            {sortOptions.map((opt) => (
                                <Radio.Button 
                                    key={opt.value} 
                                    value={opt.value}
                                    onClick={this.selectSort}>
                                    {opt.label} 
                                    {this.state.sortSelected == opt.value &&
                                        <Icon style={{paddingLeft: '3px'}} type={this.state.ascending ? "up" : "down"}/>
                                    }
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    </Row>
                </Fragment>
            }
        </Card>
    );
  }
}

const SortPanel = (props) => (
    <DashboardConsumer>
        {({ updateSort }) => (
            <SortPanelContent
                updateSort={updateSort}
            /> 
        )}
    </DashboardConsumer>
)


export default SortPanel;






