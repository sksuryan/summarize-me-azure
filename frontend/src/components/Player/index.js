import React from "react";
import ReactPlayer from "react-player/lazy";

// Lazy load the YouTube player
export default class Player extends React.Component {
  render() {
    return (
      <div>
        <ReactPlayer
          ref={this.props.VideoPlayer}
          className="react-player"
          url={URL.createObjectURL(this.props.video)}
          width="100%"
          height="100%"
          controls
        />
      </div>
    );
  }
}
