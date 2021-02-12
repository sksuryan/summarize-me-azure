import { useRef } from "react";
import styled from "styled-components";
import Player from "../Player";
import TimeStamps from "../TimeStamps";
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
  const VideoPlayer = useRef(null);

  const seekVideoPlayer = (amount) => {
    VideoPlayer.current.seekTo(amount);
  };

  return (
    <Container>
      <SecondaryContainer>
        <VideoContainer ref={videoContainer}>
          <Player video={video} VideoPlayer={VideoPlayer} />
        </VideoContainer>
        <Transcript videoContainer={videoContainer} />
      </SecondaryContainer>
      <TimeStamps seekVideoPlayer={seekVideoPlayer} />
    </Container>
  );
};

export default Grid;
