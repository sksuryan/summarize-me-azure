import "bulma";
import { useState } from "react";
import styled from "styled-components";

import Nav from "./components/Nav";
import Upload from "./components/Upload";

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
  justify-content: center;
`;

function App() {
  const [video, setVideo] = useState({ video: null });
  return (
    <Container>
      <Nav />
      <Body>
        <Upload setVideo={setVideo} video={video} />
      </Body>
    </Container>
  );
}

export default App;
