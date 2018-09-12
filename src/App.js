import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  initMap() {
    let mapview = document.getElementById("map");
    mapview.style.height = window.innerHeight + "px";
    const map = new window.google.maps.Map(mapview, {
      center: { lat: 38.581385, lng: -121.505396 },
      zoom: 13,
      mapTypeControl: false
    });
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZlRxAX6jKbpkwaVWuLaPovMi_FnE4vm8&callback=initMap"
    );
  }

  render() {
    return (
      <div className="App">
        <div id="map" />
      </div>
    );
  }
}

export default App;

function loadMapJS(src) {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
