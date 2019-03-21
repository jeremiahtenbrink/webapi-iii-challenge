import React, {Component} from 'react';
import axios from 'axios';
import unsplash from '../api/unsplash';
import {
    Container,
    Card,
    Grid,
    Image,
    Icon
    
} from 'semantic-ui-react';
import UserCard from '../components/UserCard';

const style = {
    mainContainer: {
        layout: 'flex',
        justifyContent: 'center',
    },
};

class MainView extends Component {
    state = {
        users: [],
    };
    
    componentDidMount() {
        axios.get('http://localhost:3200/users').then(res => {
            debugger;
            this.setState({users: res.data});
        }).catch(err => {
            debugger;
            console.log(err.message);
        });
    }
    
    getImageUrl = () => {
    
    };
    
    render() {
        return (
            <Container style={style.mainContainer}>
                <Grid centered columns={3}>
                    {this.state.users.map(user => {
                        return (
                            <Grid.Column >
                                <UserCard {...user}/>
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </Container>
        );
    }
}

export default MainView;