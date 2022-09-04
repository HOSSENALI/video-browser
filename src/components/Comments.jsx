import {Button} from "@mui/material";
import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div``;
const Container2 = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({theme}) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({theme}) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [singleComment, setSingleComment] = useState({});

    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;

    const handleComment = (e) => {
        setComment(e.target.value);
        createSingleComment();
    };

    const handleInputClick = (e) => {
        if (userData == undefined) {
            window.location.href = "/auth?redirectTo=" + window.location.href;
        }
    };

    const createSingleComment = () => {
        const SingleComment = {
            details: comment,
            user: userData.user.displayName,
        };
        setSingleComment(SingleComment);
    };

    const addComment = () => {
        let newComments = comments.slice();
        newComments.unshift(singleComment);
        setComments(newComments);
        setComment("");
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
                />
                <Button onClick={(e) => addComment()}>Add</Button>
            </NewComment>

            {comments.map((comment) => (
                <Container2>
                    <Avatar
                        src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>

                    <Details>
                        <Name>
                            {comment.user} <Date>1 day ago</Date>
                        </Name>
                        <Text>{comment.details}</Text>
                    </Details>
                </Container2>
            ))}
        </Container>
    );
};

export default Comments;
