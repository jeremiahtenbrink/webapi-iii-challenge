import React from 'react';
import {Segment, Feed} from 'semantic-ui-react';
import Post from './Post';

const style = {
    posts: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}

const Posts = props => {
    const {posts} = props;
    return (
        <Segment style={style.posts}>
            <Feed>
            {posts.map(post => {
               return <Post post={post}/>
            })}
            </Feed>
        </Segment>
    );
};

export default Posts;