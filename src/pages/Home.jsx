import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/card/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = () => {
    axios.get("data.json").then((response) => {
      let data = response.data;
      setVideos(data);
    });
  };
  useEffect(() => {
    fetchVideos();
  },[]);

  return (
    <Container>
      {videos.map((video) => (
        <Card video={video} key={video.id} />
      ))}
    </Container>
  );
};

export default Home;
