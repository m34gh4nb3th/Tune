//renders the whole list of users being displayed as a given time
import React from 'react';
import '../App.css';
import UserCard from '../Components/UserCard';
import SortPanel from '../Components/SortPanel';

import { DashboardConsumer } from '../Providers/DashboardProvider';

import { Row, Layout, Button } from 'antd';
const { Footer, Content } = Layout;


class DashboardContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [],
			usersDisplayed : 12,
        }
    };

	loadMore = () => {
        this.setState( prevState => ({usersDisplayed: prevState.usersDisplayed + 12}));
    }

	showLess = () => {
		this.setState({usersDisplayed: 12 });
	}

	render () {
		//make cards for all the users up to the number we are currently displaying
		let userCards = this.props.users.slice(0, this.state.usersDisplayed).map((user, index) => 
							<UserCard user={user} key={index}/>
						);

		return (
			<Layout>
				<Content style={{ margin: '0 16px'}}>
					<h1>User Performance Dashboard</h1>
					<SortPanel />
					<Row gutter={8}>{userCards}</Row>
					<Row style={{textAlign: 'center', paddingTop: '10px' }}>
						{this.state.usersDisplayed < this.props.users.length &&
							<Button size="large" type="primary" onClick={this.loadMore}>Load More</Button>
						}
						{this.state.usersDisplayed >= this.props.users.length &&
							<Button size="large" onClick={this.showLess}>Show Less</Button>
						}
					</Row>
				</Content>
				<Footer/>
			</Layout>
		);
	}

  }


  	const Dashboard = () => (
		<DashboardConsumer>
			{({ users }) => (
				<DashboardContent
					users={users}
				/> 
			)}
		</DashboardConsumer>
	)
  
  export default Dashboard;
  