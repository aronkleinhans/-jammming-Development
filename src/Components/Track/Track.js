import React from "react";

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack() {
        console.log(this.props.track);
        this.props.onAdd(this.props.track)
    }
    renderAction(isRemoval) {
        return (
            isRemoval ? <button className="Track-action">-</button> : <button className="Track-action" onClick={this.addTrack}>+</button>
        );
    }
    render() {
        return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p> {this.props.track.artist} |  {this.props.track.album} </p>
            </div>
            {this.renderAction(this.props.track.isRemoval)}
        </div>
        );
    }
}

export default Track;