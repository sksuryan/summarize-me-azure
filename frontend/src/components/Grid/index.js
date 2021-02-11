import { useRef } from "react";
import styled from "styled-components";
import Player from "../Player";
import Transcript from "../Transcript";

const Container = styled.section`
  width: 100%;

  margin-top: 16px;
`;

const SecondaryContainer = styled.div`
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const VideoContainer = styled.div`
  width: 70%;
  height: min-content;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Grid = ({ video }) => {
  const videoContainer = useRef(null);

  return (
    <Container>
      <SecondaryContainer>
        <VideoContainer ref={videoContainer}>
          <Player video={video} />
        </VideoContainer>
        <Transcript videoContainer={videoContainer} />
      </SecondaryContainer>
    </Container>
  );
};

export default Grid;
