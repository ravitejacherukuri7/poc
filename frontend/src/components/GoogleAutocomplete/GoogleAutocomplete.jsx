import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { routePostAC } from "../../redux/action/RouteAction";
import Google from "./GoogleAutocomplete";
import { connect } from "react-redux";

class GoogleAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    const { route, routePostAC } = this.props;
    console.log(this.props);
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Text Here",
                className: "autocomplete",
              })}
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}

              {suggestions.map((suggestion, index) => {
                console.log(suggestions, "Flag " + index);
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";

                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                return (
                  <div
                    key={index}
                    className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <span onClick={() => routePostAC(suggestion)}>
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.route,
});

export default connect(mapStateToProps, { routePostAC })(GoogleAutocomplete);
