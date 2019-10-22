//this method groups all the logs for each user in an object that also contains the sums
//the index of the array is the id of the user which will be used to access the data in ConcenseUsersAndLogs
import logs from '../Data/logs.json';

const logsOrg = [];

const organizeLogs = () => {
    let len = logs.length;
    for (let i=0;i<len;i++) {
        let thisUserId = logs[i]["user_id"];
        let thisEventType = logs[i]["type"];
        let thisRevAmount = logs[i]["revenue"];
        let thisDate = logs[i]["time"].substring(0,10);
        //if we haven't found this user yet, set up new map
        if (!logsOrg[thisUserId]) {
            logsOrg[thisUserId] = {
                "conversion" : 0,
                "impression" : 0,
                "revenue" : 0,
                "logs" : {
                    [thisDate] : {
                        "conversion" : 0,
                        "impression" : 0,
                        "revenue" : 0,
                    }
                }
            };
        }
        //if we haven't found any logs for this date yet, set up new inner log map
        else if (!logsOrg[thisUserId]["logs"][thisDate]) {
            logsOrg[thisUserId]["logs"][thisDate] = {
                "conversion" : 0,
                "impression" : 0,
                "revenue" : 0,
            };
        }
        //add to event type and revenue sums for this user
        logsOrg[thisUserId][thisEventType] += 1;
        logsOrg[thisUserId]["revenue"] += thisRevAmount;
        //add to event type and revenue sums for this user on this date
        logsOrg[thisUserId]["logs"][thisDate][thisEventType] += 1;
        logsOrg[thisUserId]["logs"][thisDate]["revenue"] += thisRevAmount;
    }
    return logsOrg;
}

export default organizeLogs;