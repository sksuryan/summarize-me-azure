import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: fit-content;

  border: none;
  outline: none;
  background: none;

  border-radius: 4px;

  background-color: #16c79a;
  color: white;

  padding: 12px;

  font-size: 18px;
  font-weight: 500;

  margin: 16px 0;
  cursor: pointer;

  transition: all 0.4s ease;

  &:hover {
    background-color: #00af91;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const Upload = ({ setVideo, video, setData }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const onSubmit = (e) => {
    const URL = "https://summariz.azurewebsites.net/videos/create";

    if (video) {
      const formData = new FormData();
      formData.append("video", video);
      axios
        .post(URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadStatus(percentage);
          },
        })
        .then((res) => {
          setUploadStatus(null);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <div className="field">
        <div className="file is-boxed has-name is-black">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              accept="video/mp4"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Upload!</span>
            </span>
            <span className="file-name">
              {video.name ? video.name : "example-video.mp4"}
            </span>
            {uploadStatus && (
              <progress className="progress" value={uploadStatus} max="100" />
            )}
          </label>
        </div>
      </div>
      <SubmitButton
        className={uploadStatus && "button is-loading"}
        onClick={onSubmit}
      >
        Upload!
      </SubmitButton>
    </Container>
  );
};

export default Upload;
