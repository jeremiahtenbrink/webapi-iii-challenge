import React from 'react';
import {Feed, Image, Icon, Grid} from 'semantic-ui-react';

const style = {
    icon: {
        justifySelf: "center",
        alignSelf: "center"
    },
    label: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem"
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    rightColumn: {
        borderBottom: "1px solid lightgray"
    }
};

const Post = ({post}) => {
    return (
        <Feed.Event>
            <Feed.Content>
                <Grid>
                    <Grid.Column width={4} style={style.leftColumn}>
                        <Feed.Label style={style.label}><Icon name={"edit outline"} size='big' style={style.icon}/></Feed.Label>
                        <Feed.Like>
                            <Icon name='like' />
                            {post.likes} {post.likes > 1 ? " Likes" : " Like"}
                        </Feed.Like>
                    </Grid.Column>
                    <Grid.Column width={12} style={style.rightColumn}>
                        <Feed.Summary>
                            {post.title}
                            <Feed.Date>{post.created}</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra images>
                            {post.text}
                        </Feed.Extra>
                        <Feed.Meta>
                        
                        </Feed.Meta>
                    </Grid.Column>
                </Grid>
            </Feed.Content>
        </Feed.Event>
    );
};

export default Post;