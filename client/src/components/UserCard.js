import React, {Component} from 'react';
import {Card, Icon, Image, Input} from 'semantic-ui-react';
import unsplash from '../api/unsplash';
import axios from 'axios';
import {Link} from 'react-router-dom';

const style = {
    image: {
        maxHeight: '300px',
        objectFit: 'cover',
    },
    changeNameInput: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    card: {
        marginTop: "3rem",
    }
};

class UserCard extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        image: this.props.image,
        changeName: false,
    };
    
    getImageUrl = () => {
        const randomNumber = Math.ceil(Math.random() * 10);
        const imageNumber = Math.ceil(Math.random() * 30);
        unsplash.get('/search/photos', {
            params: {
                query: 'person',
                orientation: 'portrait',
                page: randomNumber,
                per_page: 30,
            },
            
        }).then(res => {
            debugger;
            
            const image = res.data.results[imageNumber].urls.regular;
            axios.put(`http://localhost:3200/users/${this.state.id}`, {
                name: this.state.name,
                id: this.state.id,
                image: this.state.image,
            });
            this.setState({image});
        });
    };
    
    changeName = () => {
        debugger;
        this.setState(state => ({changeName: !state.changeName}));
    };
    
    getNameInput() {
        return (
            <div style={style.changeNameInput}>
                <Input name={'name'} value={this.state.name}
                       onChange={this.onChange}/>
                <p onClick={this.saveUser}>set</p>
            </div>
        );
    }
    
    saveUser = () => {
        debugger;
        this.changeName();
        axios.put(`http://localhost:3200/users/${this.state.id}`,
            {
                name: this.state.name,
                id: this.state.id,
                image: this.state.image,
            }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
        
    };
    
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    
    getName() {
        return (
            <Card.Header onClick={this.changeName}>
                {this.state.name}
            </Card.Header>
        )
    }
    
    render() {
        const {image} = this.state;
        return (
            <Card style={style.card}>
                <Image src={image ? image : this.getImageUrl()}
                       style={style.image}/>
                <Card.Content>
                    {!!this.state.changeName ?
                        this.getNameInput() : this.getName()
                        }
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/users/${this.state.id}`}>
                        <Icon name='newspaper outline'/>
                        Blog Posts
                    </Link>
                </Card.Content>
            </Card>
        );
    }
}

export default UserCard;