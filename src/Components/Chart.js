//this component just renders the chart for the given type selected
import React, {Fragment} from 'react';
import '../App.css';
import '../../node_modules/react-vis/dist/style.css';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

const noTickLabels = (t, i) => {
    //no labels on x axis
    return (<tspan></tspan>);
}

const Chart = (props) => {
    //set up data for chart
    let dataArray = [];
    let logs = props.user.logs;
    for (var date in props.user.logs) {
        //filter through logs organized by date
        //only adding logs that have a value for the selected type
        if (logs[date][props.typeInfo['type']] > 0) {
            dataArray.push(
                {x: Date.parse(date), y: logs[date][props.typeInfo.type]}
            )
            //sort by date
            dataArray.sort((a,b) => a['x'] - b['x']);
        }
    }
    //format some dates for the x axis range
    let start;
    let end;
    if (dataArray.length > 0) {
        start = new Date(dataArray[0]['x']).toDateString();
        let startArray = start.split(" ");
        //only want to display the month and year
        start = startArray[1] + ' ' + startArray[3];
        end = new Date(dataArray[dataArray.length - 1]['x']).toDateString();
        let endArray = end.split(" ");
        end = endArray[1] + ' ' + endArray[3];
    }

    return (
        <Fragment>
            <XYPlot
                width={400}
                height={300}>
                <HorizontalGridLines />
                <LineSeries
                    color={props.typeInfo.color}
                    data={dataArray}/>
                <XAxis title="Date" tickFormat={noTickLabels} />
                <YAxis title={props.typeInfo.title}/>
            </XYPlot>
            <div style={{textAlign: 'center'}}><p>{start} - {end}</p></div>
        </Fragment>
    );

  }

  export default Chart;
  