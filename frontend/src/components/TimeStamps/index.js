import { useState } from "react";
import styled from "styled-components";

const KeywordsContainer = styled.div`
  margin-top: 8px;

  display: grid;

  grid-template-columns: 1fr 1fr 1fr;

  & div {
    display: flex;
    justify-content: end;

    width: 100%;
  }

  @media (min-width: 768px) {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
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
    margin-top: 4px;

    @media (max-width: 768px) {
      font-size: 14px;

      margin-top: 4px;
    }
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

const TimeStamps = ({ seekVideoPlayer, timestamps }) => {
  const [searchValue, setSearchValue] = useState(null);
  const keywords = Object.keys(timestamps).filter((keyword) => {
    if (searchValue) {
      const value = keyword.substr(0, searchValue.length);
      if (value === searchValue) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <input
        className="input is-black"
        type="text"
        placeholder="Search keywords"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <KeywordsContainer>
        {keywords.map((timestamp, i) => (
          <KeywordContainer key={i}>
            <h3>{timestamp}: </h3>
            <div>
              {timestamps[timestamp].map((time, i) => (
                <TimeStamp key={i} onClick={() => seekVideoPlayer(time)}>
                  {time}
                </TimeStamp>
              ))}
            </div>
          </KeywordContainer>
        ))}
      </KeywordsContainer>
    </>
  );
};

export default TimeStamps;
