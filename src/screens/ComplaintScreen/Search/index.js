import React from 'react'
import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete'

function Search(props){
        return (
            <>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={2}
                    autoFocus={true}
                    returnKeyType={'search'}
                    listViewDisplayed={false}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        props.notifyChange(details.geometri.location)
                    }}
                    query={{
                        key: 'AIzaSyA9PE5dfNCRXlVK4Bfz5UXbSk-xqEecJiY',
                        language: 'en'
                    }}
                    nearByPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                />
            </>
        )
}

export default Search