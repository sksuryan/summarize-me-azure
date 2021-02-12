import styled from "styled-components";

const KeywordsContainer = styled.div`
  @media (min-width: 768px) {
    margin-top: 16px;
  }
`;

const KeywordContainer = styled.div`
  display: flex;

  align-items: center;

  & * {
    font-family: var(--primary-font);
    font-size: 16px;
    font-weight: 500;

    color: black;

    margin-right: 16px;
    margin-top: 12px;
  }
`;

const TimeStamp = styled.button`
  border: none;
  outline: none;
  background: none;

  font-weight: 400;

  padding-bottom: 1px;
  border-bottom: 1px solid black;

  margin-right: 12px;

  cursor: pointer;
`;

const TimeStamps = ({ seekVideoPlayer }) => {
  return (
    <KeywordsContainer>
      <KeywordContainer>
        <h3>keyword: </h3>
        <TimeStamp onClick={() => seekVideoPlayer(500)}>00:01:30</TimeStamp>
        <TimeStamp onClick={() => seekVideoPlayer(700)}>00:04:06</TimeStamp>
      </KeywordContainer>
      <KeywordContainer>
        <h3>another keyword: </h3>
        <TimeStamp onClick={() => seekVideoPlayer(500)}>00:01:30</TimeStamp>
        <TimeStamp onClick={() => seekVideoPlayer(700)}>00:04:06</TimeStamp>
      </KeywordContainer>
    </KeywordsContainer>
  );
};

export default TimeStamps;
