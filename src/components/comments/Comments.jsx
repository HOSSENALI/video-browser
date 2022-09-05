import {Button} from "@mui/material";
import moment from "moment";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Comment from "../comment/Comment";

import {Container, NewComment, Avatar, Input, ToggleComment} from "./Comments.styles";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [singleComment, setSingleComment] = useState({});
    const [isOpen, setIsOpen] = useState(true);

    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;
    console.log(userData);
    const handleInputClick = (e) => {
        if (userData == undefined) {
            window.location.href = "/auth?redirectTo=" + window.location.href;
        }
    };

    const handleComment = (e) => {
        console.log("before", e.target.value);
        setComment(e.target.value);
        console.log("after", comment);
    };

    useEffect(() => {
        if (userData != undefined) {
            createSingleComment();
        }
    }, [comment]);

    const createSingleComment = () => {
        console.log(comment);
        const SingleComment = {
            details: comment,
            user: userData.user.displayName,
        };
        setSingleComment(SingleComment);
    };

    const addComment = () => {
        if (singleComment.details != "") {
            let newComments = comments.slice();
            newComments.unshift(singleComment);
            setComments(newComments);
            setComment("");
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addComment();
        }
    };

    return (
        <Container>
            <NewComment>
                <Avatar
                    src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
                <Input
                    placeholder=" Add a comment....."
                    value={comment}
                    onClick={() => handleInputClick()}
                    onChange={(e) => handleComment(e)}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={(e) => addComment()}>Add</Button>
            </NewComment>
            <ToggleComment onClick={handleToggle}>Toggle comments</ToggleComment>
            {isOpen && (
                <Container>
                    {comments.map((comment) => (
                        <Comment comment={comment}/>
                    ))}
                </Container>
            )}
        </Container>
    );
};

export default Comments;
