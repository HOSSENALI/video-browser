import React, { useEffect, useState } from "react";
import moment from "moment";

import{Container,Avatar,Details,Name,Date,Text} from "./comment.styles"
const Comment = ({comment}) => {
  useEffect(() => {
    var date = new window.Date();
  }, [comment]);
  return (
    <Container>
      <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />

      <Details>
        <Name>
          {comment.user} <Date>{moment().startOf("hour").fromNow()}</Date>
        </Name>
        <Text>{comment.details}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
