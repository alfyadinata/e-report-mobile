import React from 'react'
import MapView from 'react-native-maps'

class SelectLocation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.props.region}
        showsUserLocation={true}
        onRegionChange={(reg) => this.props.onRegionChange(reg)}
      >
        <MapView.Marker 
          coordinate={this.props.region}
        />
      </MapView>
    )
  }
}

export default SelectLocation