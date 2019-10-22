//this component structures all the information we have for each user
import React from 'react';
import '../App.css';
import Stats from './Stats';

import { Card, Row, Col, Avatar } from 'antd';

const colorList = ["#7265e6", "#f56a00", "#ffbf00", "#00a2ae"];


class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            badImage: false,
        }
    };

    errorTest = () => {
        //some users had avatar image urls but they wouldn't load
        //this will make sure we use the same backup avatar we use for the users without any image
        console.log('bad image');
        this.setState({ badImage: true })
        return false;
    }

    render() {
        let avatar = <Avatar size={64} src={this.props.user.avatar} onError={this.errorTest}/>;
        let backUp = <Avatar 
                    size={64}
                    style={{ backgroundColor: colorList[this.props.user.id % 4], verticalAlign: 'middle' }} >
                        <h2>{this.props.user.name[0]}</h2>
                    </Avatar>

        return (
            <Col lg={{span: 8}} md={{ span: 12 }} xs={{ span: 24}} style={{paddingBottom: '8px'}}>
                <Card 
                key={this.props.user.id}>
                    <Card.Meta
                    avatar={this.state.badImage || this.props.user.avatar === null || this.props.user.avatar === '' ? backUp : avatar}
                    title={this.props.user.name}
                    description={this.props.user.occupation}
                    />
                    <br/>
                    <Row>
                        <Stats user={this.props.user}/>
                    </Row>    
                </Card>
            </Col>
        );
    }
  }
  
  export default UserCard;
  

  