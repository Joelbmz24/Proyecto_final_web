import React from "react";

const Comment = ({comment}) => {
const {user, description}=comment;

    return (
        <div className="m-1">
            <p>{user.username}</p>
            <p>{description}</p>
        </div>
    );
};
export default Comment;