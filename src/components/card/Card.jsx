import { Link } from "react-router-dom";
import {Container,
  Image,
  Details,
  Texts,
  Title,
  Info} from "./card.styles";

const Card = ({video}) => {
  return (
    <Link to={`/${video.videoType}/${video.id}`} style={{ textDecoration: "none" }}>
      <Container type='sm'>
        <Image
          type='sm'
          src="/common-video-errors-01.jpeg"
        />
        <Details type='sm'>
          <Texts>
            <Title>{video.title}</Title>
            <Info>660,908 views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
