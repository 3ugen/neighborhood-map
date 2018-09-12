import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
// import Marker from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: { lat: 37.721143, lng: -122.477629 },
      map,
      title: "Hello World!"
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDZlRxAX6jKbpkwaVWuLaPovMi_FnE4vm8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
        />
      </div>
    );
  }
}

export default Map;
