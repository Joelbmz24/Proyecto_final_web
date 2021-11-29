export const getPosts = (post) => {
	if(!post) return null;

    return {
        _id: post._id,
    	active: post.active,
        comments: post.comments,
        created: post.createdAt,
        description: post.description,
        history: post.history,
        image: post.image,
        likes: post.likes,
        title: post.title,
        updated: post.updatedAt,
        user: post.user.username
    };
};