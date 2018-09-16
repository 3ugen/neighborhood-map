import React, { Component } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer.js";
import SearchContainer from "./components/SearchContainer.js";
import * as FoursquareAPI from "./components/FoursquareAPI";
import Error from "./components/Error";
import ToggleMenu from "./components/ToggleMenu";
class App extends Component {
  state = {
    locations: [],
    locationsToUse: [],
    locationsNotFound: false,
    center: { lat: 38.5615196, lng: -121.5129515 },
    zoom: 13,
    isOpen: false,
    selectedLocation: {},
    query: "",
    menuToggle: false
  };

  gm_authFailure() {
    alert(
      `Error occured with Google Maps. Check internet connection or your api key.`
    );
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;

    function handleErrors(response) {
      if (response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    FoursquareAPI.getAllPlaces()
      .then(handleErrors)
      .then(locations => {
        this.setState({
          locations: locations,
          locationsToUse: locations
        });
      })
      .catch(error => {
        alert(
          "Error occurred with FourSquare API. Locations data will not be displayed "
        );
      });
  }

  handleChildClickEvent = (event, location, id) => {
    if (location !== undefined) {
      this.setState({
        center: { lat: location.lat, lng: location.lng },
        zoom: 17,
        isOpen: true,
        selectedLocation: id
      });
    }
  };

  updateLocations = (searchResultArr, query) => {
    if (searchResultArr) {
      this.setState(state => ({
        locationsToUse: searchResultArr,
        zoom: 14,
        center: { lat: 38.5615196, lng: -121.5129515 },
        locationsNotFound: false
      }));
    } else {
      this.setState({
        locationsToUse: this.state.locations,
        locationsNotFound: false
      });
    }
  };

  updateQuery = query => {
    this.setState({
      query: query
    });
  };

  menuToggle = () => {
    this.setState(prevState => ({
      menuToggle: !prevState.menuToggle
    }));
  };

  render() {
    return (
      <div id="main">
        <Error>
          <MapContainer
            selectedLocation={this.state.selectedLocation}
            locations={this.state.locationsToUse}
            locationsNotFound={this.state.locationsNotFound}
            center={this.state.center}
            zoom={this.state.zoom}
            handleChildClickEvent={this.handleChildClickEvent}
            isOpen={this.state.isOpen}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDZlRxAX6jKbpkwaVWuLaPovMi_FnE4vm8&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                id="map-container"
                aria-label="map container"
                tabIndex="0"
                role="application"
                style={{ height: `100vh` }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
            resetMap={this.resetMap}
          />
          <ToggleMenu onClick={this.menuToggle} />
          {!this.state.menuToggle && (
            <SearchContainer
              hidden={this.state.menuToggle}
              locations={this.state.locations}
              locationsToUse={this.state.locationsToUse}
              locationsNotFound={this.state.locationsNotFound}
              handleChildClickEvent={this.handleChildClickEvent}
              selectedLocation={this.state.selectedLocation}
              onUserDidSearch={this.updateLocations}
            />
          )}
        </Error>
      </div>
    );
  }
}
export default App;
