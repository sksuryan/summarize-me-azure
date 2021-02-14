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
  justify-content: ${(props) => (props.data ? "initial" : "center")};

  padding-top: 10vh;
`;

function App() {
  const [video, setVideo] = useState({ video: null });
  const [data, setData] = useState(null);

  return (
    <Container>
      <Nav />
      <Body data={data}>
        {!data && (
          <Upload setVideo={setVideo} video={video} setData={setData} />
        )}
        {data && <Grid video={video} data={data} />}
      </Body>
    </Container>
  );
}

export default App;
