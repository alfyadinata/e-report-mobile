import React from 'react'
import { StyleSheet, Picker, Image } from 'react-native'
import { Button, Layout, Input, Modal, Card, Icon, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import SelectLocation from './SelectLocation'
// google
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 
const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
 
      getDefaultValue={() => ''}
 
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyA9PE5dfNCRXlVK4Bfz5UXbSk-xqEecJiY',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
 
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
 
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}
 
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
 
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderLeftButton={()  => <Text>Back</Text> }
      renderRightButton={() => <Text>Custom text after the input</Text>}
    />
  );
}

class ComplaintScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state  = {
      isSubmit: false,
      isLoading: true,
      modalShow: false,
      form: {
        title: '',
        description: '',
        category_id: '',
        isAnonym: 0,
        foto: '',
      }
    }
  }
  render() {

    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    
    const modalCategory = ()  =>  {
      <Layout
        level="3"
      >
        <Text>Select Category</Text>
      </Layout>
    }

    return (
        <>
          <GooglePlacesInput />
          <ScrollView>
                <Modal
                  backdropStyle={styles.backdrop}
                  onBackdropPress={() => { this.setState({modalShow: !this.state.modalShow}) }}
                  visible={this.state.modalShow}
                  >                
                    <Layout style={styles.modal}>
                      <Text category="h4">Choose Category</Text>
                      <Card style={styles.modal}>
                        <Layout style={styles.container}>

                            <Button appearance="ghost"
                              icon={(styles) => <Icon {...styles} name="home" width="32" height="32" />
                              }
                              title="Test"
                            >
                              Street
                            </Button>
                            <Button appearance="ghost"
                              disabled
                              icon={(styles) => <Icon {...styles} name="radio" width="32" height="32" />
                              }
                            />
                        </Layout>
                      </Card>
                    </Layout>
                </Modal>
                <SelectLocation />

          </ScrollView>
        </>
    )
  }
}

const styles  = StyleSheet.create({
  main: {
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    margin: '3%'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    // margin:'5%'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})


export default ComplaintScreen