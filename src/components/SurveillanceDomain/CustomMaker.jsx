import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
class CustomMarker extends Component {
    state = {
        showInfoWindow: false
    };
    handleMouseOver = e => {
        this.setState({
            showInfoWindow: true
        });
    };
    handleMouseExit = e => {
        this.setState({
            showInfoWindow: false
        });
    };
    render() {
        const { showInfoWindow } = this.state;
        const { name, lat, lng, description } = this.props;
        return (
            <Marker position={{lat : parseFloat(lat), lng: parseFloat(lng)}} onMouseOver=
                {this.handleMouseOver} onMouseOut={this.handleMouseExit}>
                {showInfoWindow && (
                    <InfoWindow>
                        <h4>{name} <br/> {description}</h4>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}
export default CustomMarker;
