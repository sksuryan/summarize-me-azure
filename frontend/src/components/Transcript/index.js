import { useEffect, useState } from "react";
import styled from "styled-components";

const TranscriptContainer = styled.p`
  width: 40%;
  height: ${(props) => props.height}px;

  font-family: var(--primary-font);
  font-size: 16px;
  font-weight: 500;
  text-align: justify;

  padding: 0 24px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    padding: 24px 0;
    height: initial;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Transcript = ({ videoContainer }) => {
  const [height, setHeight] = useState(null);

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
      Transcript shows up here 😇
    </TranscriptContainer>
  );
};

export default Transcript;
