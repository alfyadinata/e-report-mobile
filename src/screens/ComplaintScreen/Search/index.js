import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Search = () => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Enter Location"
			minLength={2}
			autoFocus={false}
			returnKeyType={'default'}
			listViewDisplayed="auto"
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				console.log('pressed');
				console.log(data, details);
			}}
			fetchDetails={true}
			query={{
				// available options: https://developers.google.com/places/web-service/autocomplete
				key: 'AIzaSyCk-aZh4AOmqgSSXC06Zo6f594xyR91vM8',
				language: 'en', // language of the results
				types: 'geocode' // default: 'geocode'
			}}
			styles={{
				textInputContainer: {
					backgroundColor: 'rgba(0,0,0,0)',
					borderTopWidth: 0,
					borderBottomWidth: 0
				},
				textInput: {
					marginLeft: 0,
					marginRight: 0,
					height: 38,
					color: '#5d5d5d',
					fontSize: 16
				},
				predefinedPlacesDescription: {
					color: '#1faadb'
				}
			}}
			currentLocation={false}
		/>
	);
};

export default Search;
