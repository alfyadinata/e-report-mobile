import React from 'react'
import baseApi from '../../config/http'
import { StyleSheet, Image, Alert} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Layout, Text, Input, Button, CheckBox, Icon } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage, { useAsyncStorage } from '@react-native-community/async-storage'
import SelectLocation from './SelectLocation'
import ModalLoader from '../../components/ModalLoader'
export default class ComplainScreen extends React.Component {

  state = {
    visibleModal: false,
    checked: false,
    dataCategory: [],
    description: '',
    category_id: 1,
    isAnonym: 0,
    foto: null,
    latitude: '',
    longitude: '',
    user_id: '',
    token: '',
  }

  handleChoosefoto = () => {

    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ foto: response })
        console.info(this.state.foto)
      }
    })

  }

  async componentDidMount() {
    const token   = await AsyncStorage.getItem('token')

    const userData  =  await AsyncStorage.getItem('user_id')
    console.info(userData)
    this.setState({
      user_id: userData,
      token: token
    })

    await Geolocation.getCurrentPosition(location => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })
    
    this.getCategory()
  }

  handleSubmit  =   async ()    =>  {

    this.setState({visibleModal:!this.state.visibleModal})
    const formData  = new FormData()

    formData.append('foto', {
      uri: this.state.foto.uri,
      type: 'image/jpeg',
      name: this.state.foto.fileName
    }),
    formData.append(this.state)
    formData.append('description', this.state.description)
    formData.append('category_id', this.state.category_id)
    formData.append('user_id', this.state.user_id)
    formData.append('latitude', this.state.latitude)
    formData.append('longitude', this.state.longitude)
    formData.append('isAnonym', this.state.isAnonym)
    
    await baseApi.post('/complaint/create',formData, {
      headers: {
        'Authorization': `${JSON.parse(this.state.token)}`,
        'Content-Type': 'application/form-data',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({visibleModal:!this.state.visibleModal})

      Alert.alert('Success',
        'Thanks for your complaint, We will response you in a moment.',
        [
          {text: 'Okay'},
        ]
      )

    })
    .catch(err => {
      console.info(err)
    })


  }

  getCategory   =   async ()    =>  {


    await baseApi.get('/category', {
      headers: {
        'Authorization': `${JSON.parse(this.state.token)}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {

      this.setState({
        dataCategory: res.data.data
      })

    })
    .catch(err => {

      console.info(err)

    })
    
  }

  render() {
    return (
      <SelectLocation />

      // <ScrollView showsVerticalScrollIndicator={false}>
      //   <ModalLoader visible={this.state.visibleModal} />
      //   <Layout style={StyleSheet.container}>
      //     <Text status="info" category="h4">Complaint</Text>
      //     <Layout style={styles.form}>
      //       <Input 
      //         label="Title*"
      //         size="small"
      //         status="primary"
      //         onChangeText={(description) => this.setState({description:description})}
      //         value={this.state.description}
      //         editable={true}
      //       />
      //       {
      //         this.state.dataCategory.map(data => {
      //         return <Text key={data.id}>{data.name}</Text>
      //         })
      //       }
      //       {this.state.foto && (
      //         <Image
      //           source={{ uri: this.state.foto.uri }}
      //           style={{ width: 300, height: 300 }}
      //         />
      //       )}
      //       <Button 
      //         appearance="ghost"
      //         status="primary"
      //         icon={(styles) => 
      //           <Icon {...styles} name="camera" width="32" height="32" />
      //         }
      //         onPress={this.handleChoosefoto}
      //       />

      //       {/* <Input 
      //         label="Description"
      //         size="small"
      //         status="primary"
      //         editable={true}
      //       /> */}
      //       <CheckBox 
      //         text="Report as Anonym"
      //         checked={this.state.isAnonym == 1 ? true : false}
      //         onChange={() => { this.setState({isAnonym: this.state.isAnonym ==  1 ? 0 : 1}) }}
      //         status="info"
      //       />
      //       <Button status="info" disabled={this.state.isAnonym == 1 ? false : true } onPress={this.handleSubmit}>
      //         Submit
      //       </Button>
      //     </Layout>
      //   </Layout>
      // </ScrollView>
    )
  }
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '70%'
  },
  form: {
    width: '80%',
    alignSelf: 'center',
  }
})