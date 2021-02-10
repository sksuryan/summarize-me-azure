import React from 'react'
import ReactPlayer from 'react-player/lazy'

// Lazy load the YouTube player
export default class Player extends React.Component {

render(){
console.log(this.props.video)
return(
<div>
<ReactPlayer url={this.props.video.name!==undefined ? URL.createObjectURL(this.props.video):''} 
playing={true}
controls/>
</div>
)
}
}