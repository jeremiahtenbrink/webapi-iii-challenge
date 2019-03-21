import React, {Component} from 'react';
import axios from 'axios';
import {Image, Grid, Header, Container} from 'semantic-ui-react';
import Posts from '../components/Posts.';

const style = {

    

    userImage: {
        maxHeight: "500px",
    },
    posts: {
        display: "flex",
        alignItems: "center"
    },
    container: {
        paddingTop: "3rem",
    },
    header: {
        fontSize: "5rem",
        fontFamily: 'Pacifico, cursive'
    }
};

class UserView extends Component {
    state = {
        name: '',
        image: '',
        id: null,
        posts: []
    };
    
    componentWillMount() {
        debugger;
        const userId = this.props.match.params.id;
        axios.get(`http://localhost:3200/users/${userId}`).then(res => {
            debugger;
            const user = res.data;
            this.setState({...user});
        }).catch(err =>  console.log(err));
        axios.get(`http://localhost:3200/users/posts/${userId}`).then(res => {
           debugger;
            this.setState({posts: res.data});
        }).catch(err =>  {
            debugger;
            console.log(err)});
    }
    
    render() {
        return (
            <Container textAlign={"center"} style={style.container} >
                <Header  as='h1' style={style.header} >{this.state.name}</Header>
                <Grid columns={2}>
                    <Grid.Column>
                        <Image src={this.state.image} style={style.userImage} rounded/>
                    </Grid.Column>
                    <Grid.Column style={style.posts}>
                        <Posts posts={this.state.posts} />
                    </Grid.Column>
                </Grid>
            </Container>
            
        );
    }
}

export default UserView;