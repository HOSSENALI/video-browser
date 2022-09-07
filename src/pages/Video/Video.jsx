import React, { useEffect, useState } from "react";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../../components/comments/Comments";
import Card from "../../components/card/Card";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Container,
  Content,
  VideoWrapper,
  Title,
  Details,
  Info,
  Buttons,
  Button,
  Hr,
  Recommendation,
  } from "./video.styles"

const Video = () => {
  const { id, type } = useParams();

  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [recVideos, setRecVideos] = useState([]);

  const fetchVideos = () => {
    axios.get("/data.json").then((response) => {
      let data = response.data;
      setVideos(data);
    });
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    let recVideos = videos.filter((video) => {
      return video.videoType === type && video.id !=id;
    });
    setRecVideos(recVideos);
    if (videos.length) {
      let videoDetails = videos.find((video) => video.id == id);
      setVideoDetails(videoDetails);
    }
  }, [videos,id]);

  return (
    <Container>
      <Content>
        {videoDetails.id > 0 && (
          <>
            <VideoWrapper>
              <ReactPlayer
                url={videoDetails.src}
                width="100%"
                controls={true}
              />
            </VideoWrapper>
            <Title>{videoDetails.title}</Title>
          </>
        )}
        <Details>
          <Info>7,948,154 views • Jun 22, 2022</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        <h2>Recommended Video</h2>

        {recVideos.map((filtereVideo) => (
          <div key={filtereVideo.id}>
            <Card video={filtereVideo} />
          </div>
        ))}
      </Recommendation>
    </Container>
  );
};

export default Video;
