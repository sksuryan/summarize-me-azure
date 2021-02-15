import { useEffect, useState } from "react";
import styled from "styled-components";

const TranscriptContainer = styled.div`
  position: relative;

  width: 40%;
  height: ${(props) => props.height}px;

  font-family: var(--primary-font);
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
  color: black;

  padding: 0 24px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    padding: 6px 0;
    padding-bottom: 16px;
    height: initial;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  z-index: 0;
`;

const DownloadDiv = styled.div`
  display: flex;

  align-items: center;
  justify-content: end;

  position: sticky;
  top: 0;

  background-color: white;

  padding-bottom: 8px;
`;

const Download = styled.div`
  border: none;
  outline: none;
  background: none;

  width: fit-content;

  font-size: 16px;

  margin-bottom: 8px;
  padding: 0 3px;
  padding-bottom: 1px;

  cursor: pointer;

  border-bottom: 1px solid #3c29cc;

  @media (max-width: 768px) {
    margin-bottom: 16px;

    font-size: 14px;
  } ;
`;

const Transcript = ({ videoContainer, transcript }) => {
  const [height, setHeight] = useState(null);

  const onSubmit = () => {
    window.download("Transcript.txt", transcript);
  };

  useEffect(() => {
    let { current } = videoContainer;
    window.addEventListener("resize", () => setHeight(current.clientHeight));

    return () =>
      window.removeEventListener("resize", () =>
        setHeight(current.clientHeight)
      );
    // eslint-disable-next-line
  }, []);

  return (
    <TranscriptContainer height={height}>
      <DownloadDiv>
        <Download onClick={onSubmit}>Download Transcript</Download>
      </DownloadDiv>
      <p>{transcript}</p>
    </TranscriptContainer>
  );
};

export default Transcript;
