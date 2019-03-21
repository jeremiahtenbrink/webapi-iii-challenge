import React, {Component} from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';
import unsplash from '../api/unsplash';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserCard extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        image: this.props.image,
    };
    getImageUrl = () => {
        const randomNumber = Math.ceil(Math.random() * 10);
        const imageNumber = Math.ceil(Math.random() * 30);
        unsplash.get( "/search/photos", {
            params: {
                query: "person",
                orientation: "portrait",
                page: randomNumber,
                per_page: 30,
            }
        
        } ).then( res => {
            debugger;
            
            const image = res.data.results[imageNumber].urls.regular;
            axios.put(`http://localhost:3200/users/${this.state.id}`, {name: this.state.name, id: this.state.id, image: image })
            this.setState( { image } );
        } );
    };
    render() {
        const {name, image} = this.state;
        return (
            <Card>
                <Image src={image ? image : this.getImageUrl()} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/users/${this.state.id}`}>
                        <Icon name='newspaper outline' />
                        Blog Posts
                    </Link>
                </Card.Content>
            </Card>
        );
    }
}

export default UserCard;