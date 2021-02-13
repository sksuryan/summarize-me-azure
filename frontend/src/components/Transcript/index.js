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
    padding: 24px 0;
    height: initial;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
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
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random
        text. It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random
        text. It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
    </TranscriptContainer>
  );
};

export default Transcript;
