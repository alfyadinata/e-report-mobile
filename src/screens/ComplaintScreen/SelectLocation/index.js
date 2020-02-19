import React from 'react'
import { Text, View, ActivityIndicator, Button, StyleSheet, Dimensions, StatusBar  } from 'react-native';
import MapView,{ Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { Icon } from '@ui-kitten/eva-icons'

class SelectLocation extends React.Component{
    constructor() {
        super()
        this.state = {
          loading: false,
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
          },
          isMapReady: false,
          marginTop: 1,
          userLocation: "",
          regionChangeProgress: false
        };
    }


    componentDidMount() {
      Geolocation.getCurrentPosition(
          (position) => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00421 * 1.5,
              longitudeDelta: 0.00421 * 1.5,  
              loading: false
            };
            this.setState({
              region: region,
              loading: false,
              error: null,
            });
          },
          (error) => {
            alert(error)
            this.setState({
              error: error.message,
              loading: false
            })
          },
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }

    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }

      // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyA9PE5dfNCRXlVK4Bfz5UXbSk-xqEecJiY")
        .then((response) => response.json())
        .then((responseJson) => {
            console.info(responseJson)
            const userLocation = responseJson.results[0].formatted_address;
            this.setState({
            userLocation: userLocation,
            regionChangeProgress: false
            });
        });
    }

    // Update state on region change
    onRegionChange = region => {
        this.setState({
        region,
        regionChangeProgress: true
        }, () => this.fetchAddress());
        console.info(this.state)
    }

    // Action to be taken after select location button click
    onLocationSelect = () => alert(this.state.userLocation);



    render() {
      if (this.state.loading) {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </>
        );
      } else {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={styles.container}>
                    <View style={{ flex: 2 }}>
                    {!!this.state.region.latitude && !!this.state.region.longitude &&
                        <MapView
                        style={{ ...styles.map, marginTop: this.state.marginTop }}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                        onMapReady={this.onMapReady}
                        onRegionChangeComplete={this.onRegionChange}
                        >
                        <MapView.Marker
                            coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                            title={"Your Location"}
                            draggable
                        />
                        </MapView>
                    }
        
                    <View style={styles.mapMarkerContainer}>
                        <Text style={{ fontSize: 42, color: "#ad1f1f" }}>X</Text>
                    </View>
                    </View>
                    <View style={styles.deatilSection}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>Move map for location</Text>
                    <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                    <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5, }}>
                        {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
                    <View style={styles.btnContainer}>
                        <Button
                        title="PICK THIS LOCATION"
                        disabled={this.state.regionChangeProgress}
                        onPress={this.onLocationSelect}
                        >
                        </Button>
                    </View>
                    </View>
                </View>
            </>
        );
      }
    }
  }


const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: Dimensions.get("screen").height,
      width: Dimensions.get("screen").width
    },
    map: {
      flex: 1
    },
    mapMarkerContainer: {
      left: '47%',
      position: 'absolute',
      top: '42%'
    },
    mapMarker: {
      fontSize: 40,
      color: "red"
    },
    deatilSection: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 10,
      display: "flex",
      justifyContent: "flex-start"
    },
    spinnerView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    btnContainer: {
      width: Dimensions.get("window").width - 20,
      position: "absolute",
      // bottom: 100,
      left: 10,
      marginBottom: '60%'
    }
});

export default SelectLocation