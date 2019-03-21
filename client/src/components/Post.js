import React from 'react';
import {Feed, Image, Icon} from 'semantic-ui-react';

const Post = ({post}) => {
    return (
        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    {post.title}
                    <Feed.Date>{post.created}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                    <Image src={post.image} />
                    {post.text}
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />
                        {post.likes} {post.likes > 1 ? " Likes" : " Like"}
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    );
};

export default Post;