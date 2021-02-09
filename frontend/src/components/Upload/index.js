const Upload = () => {
  return (
    <div className="file is-boxed has-name is-danger">
      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="resume"
          accept="application/pdf"
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">Upload!</span>
        </span>
        <span className="file-name">example-resume.mp4</span>
      </label>
    </div>
  );
};

export default Upload;
