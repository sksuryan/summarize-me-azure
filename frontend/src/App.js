import "bulma";
import { useState } from "react";
import styled from "styled-components";

import Nav from "./components/Nav";
import Upload from "./components/Upload";
import Grid from "./components/Grid";

const Container = styled.div`
  width: 90%;

  margin: 0 auto;
`;

const Body = styled.section`
  width: 100%;
  height: 90vh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: ${(props) => (props.video.name ? "initial" : "center")};

  padding-top: 10vh;
`;

function App() {
  const [video, setVideo] = useState({ video: null });
  return (
    <Container>
      <Nav />
      <Body video={video}>
        {!video.name && <Upload setVideo={setVideo} video={video} />}
        {video.name && <Grid video={video} />}
      </Body>
    </Container>
  );
}

export default App;
