import { useEffect, useState } from "react";
import styled from "styled-components";

const TimeStampsDropdownContainer = styled.div`
  position: relative;

  transition: all 0.5s ease;

  .timestamps__heading {
    font-size: 18px;

    position: relative;
    left: 28px;
  }

  .timestamps__checkbox {
    position: absolute;

    top: 0px;
    left: 0%;

    width: 100%;
    height: 36px;

    opacity: 0;
    z-index: 1;

    cursor: pointer;
  }

  .timestamps__dropdown-selector {
    position: relative;
    margin-top: 12px;
  }

  .timestamps__arrow-indicator {
    position: absolute;

    top: 9px;
    left: 3px;

    width: 12px;
    height: 12px;

    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);

    z-index: 0;
  }

  .timestamps__dropdown-selector
    input[type="checkbox"]:checked
    ~ .timestamps__grid {
    height: 100%;
    opacity: 1;
  }

  .timestamps__arrow-indicator:before,
  .timestamps__arrow-indicator:after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 12px;
    height: 3px;
    background-color: black;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
  }

  .timestamps__arrow-indicator:after {
    position: absolute;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    top: 6px;
    right: -5px;
  }

  .timestamps__dropdown-selector
    input[type="checkbox"]:checked
    ~ .timestamps__arrow-indicator {
    transform: rotate(135deg);
  }
`;

const KeywordsContainer = styled.div`
  height: 0;
  opacity: 0;

  max-width: 90vw;
  margin-top: 8px;

  display: grid;

  overflow-y: hidden;

  grid-template-columns: 1fr 1fr 1fr;

  & div {
    display: flex;
    justify-content: end;

    width: 100%;
  }

  transition: all ease 0.4s;

  @media (min-width: 768px) {
    overflow-x: auto;
    margin-top: 16px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
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

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    });

    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      });
    // eslint-disable-next-line
  }, []);

  const keywords = Object.keys(timestamps).filter((keyword) => {
    if (searchValue) {
      const value = keyword.substr(0, searchValue.length);
      if (value.toLowerCase() === searchValue.toLowerCase()) {
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
      <TimeStampsDropdownContainer>
        <div className="timestamps__dropdown-selector">
          <input
            type="checkbox"
            className="timestamps__checkbox"
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
          <div className="timestamps__arrow-indicator"></div>
          <div>
            <p className="timestamps__heading">Keywords:</p>
          </div>
          <KeywordsContainer className="timestamps__grid">
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
        </div>
      </TimeStampsDropdownContainer>
    </>
  );
};

export default TimeStamps;
