//this is where we do the logic to set up the user data and organize it based on sort selection
import React from 'react';
import '../App.css';
import OrganizeLogs from '../HelperFunctions/OrganizeLogs';
import CondenseUsersAndLogs from '../HelperFunctions/CondenseUsersAndLogs';
import Dashboard from '../Components/Dashboard';

// Set Up The Initial Context
const DashboardContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const DashboardConsumer = DashboardContext.Consumer;

class DashboardProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [],
            sort : null,
            updateSort: (sort, ascending) => this.updateSort(sort, ascending),
        }
    };

    componentDidMount() {
        //organize json data and put it in state
        let logs = OrganizeLogs();
        let condensedUsers = CondenseUsersAndLogs(logs);
        this.setState({ users: condensedUsers });
    }

    updateSort = (sort, ascending) => {
        let ordered = this.state.users;
        //sort users by sort selected
        if (ascending) ordered.sort((a, b) => (a[sort] > b[sort]) ? 1 : -1);
        else ordered.sort((a, b) => (a[sort] < b[sort]) ? 1 : -1);
        //saving sort in state to use in stats component
        this.setState({ 
            users: ordered,
            sort: sort,
        });
    }

    render() {
        return (
            <DashboardContext.Provider value={this.state}>
                <Dashboard />
            </DashboardContext.Provider>
        );
    }
}

export default DashboardProvider;






