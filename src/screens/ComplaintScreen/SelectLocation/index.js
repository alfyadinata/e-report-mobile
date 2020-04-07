import React, { Component } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { Text } from 'react-native-svg';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Spinner } from '@ui-kitten/components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class SelectLocation extends Component {
	state = {
		loading: true,
		region: {
			latitude: 10,
			longitude: 10,
			latitudeDelta: 0.001,
			longitudeDelta: 0.001
		},
		isMapReady: false,
		marginTop: 1,
		userLocation: '',
		regionChangeProgress: false
	};

	componentDidMount() {
		Geolocation.getCurrentPosition(
			(position) => {
				const region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				};
				this.setState({
					region: region,
					loading: false,
					error: null
				});
			},
			(error) => {
				alert(error);
				this.setState({
					error: error.message,
					loading: false
				});
			},
			{ enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 }
		);
	}

	onMapReady = () => {
		this.setState({ isMapReady: true, marginTop: 0 });
	};

	// Fetch location details as a JOSN from google map API
	fetchAddress = () => {
		fetch(
			'https://maps.googleapis.com/maps/api/geocode/json?address=' +
				this.state.region.latitude +
				',' +
				this.state.region.longitude +
				'&key=' +
				'AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE'
		)
			.then((response) => response.json())
			.then((responseJson) => {
				const userLocation = responseJson.results[0].formatted_address;
				this.setState({
					userLocation: userLocation,
					regionChangeProgress: false
				});
			});
	};

	// Update state on region change
	onRegionChange = (region) => {
		this.setState(
			{
				region,
				regionChangeProgress: true
			}
			// () => this.fetchAddress()
		);
		console.log(this.state.region);
	};

	// Action to be taken after select location button click
	onLocationSelect = () => alert(this.state.userLocation);
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={{ height: '100%', width: '100%' }}
					initialRegion={this.state.region}
					provider={'google'}
					showsUserLocation={true}
					onMapReady={this.onMapReady}
					onRegionChange={this.onRegionChange}
				>
					<MapView.Marker coordinate={this.state.region} title={'Your Location'} />
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: Dimensions.get('screen').height,
		width: Dimensions.get('screen').width
	}
});

export default SelectLocation;
