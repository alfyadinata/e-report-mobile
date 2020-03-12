import React from 'react';
import {
  Image, Alert,
  StyleSheet, View, RefreshControl, ImageBackground
} from 'react-native';
import {
  Card,
  Text, Button, Icon, Layout, Spinner
} from '@ui-kitten/components';
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import baseApi from '../../../config/http'
import AsyncStorage, { useAsyncStorage } from '@react-native-community/async-storage'
import Loader from '../../../components/Loader';



class OnGoing extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      token: '',
    }  
  }
  
  async componentDidMount() {
    const jwt   =   await AsyncStorage.getItem('token')

    this.setState({
      token: jwt
    })

    this.getData()
  }

  getData   =   async ()  =>  {

    await baseApi.get('/complaint/on-going', {
      headers: {
        'Authorization': `${JSON.parse(this.state.token)}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {

      this.setState({
        isLoading: false,
        data: res.data.data
      })
    })
    .catch(err => {
      alert('something is went wrong')
    })

  }

  onRefresh () {

    this.setState({
      data: [],
      isLoading: true
    })
    this.getData()
  }

  handleCancel    =   async (id)  =>  {

    await baseApi.delete(`/complaint/${id}/delete`, {
      headers: {
        'Authorization': `${JSON.parse(this.state.token)}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {

      Alert.alert('Success',
        'Your Complaint has been deleted.',
        [
          {text: 'Okay'},
        ]
      )
      this.getData()

    })
    .catch(err => {
      console.warn(err)
    })

  }

    render() {
      if (this.state.isLoading) {
        return (
          <Loader />
        )
      }
        return (
            <ScrollView
              maximumZoomScale={1}
              contentContainerStyle={{paddingBottom: '20%'}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl 
                  refreshing={this.state.isLoading}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            >
              <Layout style={styles.container}>
                {this.state.data.map((item, index) => {
                  return (
                    <Layout style={styles.row} key={index}>
                        <Card header={() => 
                            <React.Fragment>
                            <Text
                              style={styles.headerText}
                              status="info"
                              category='h6'>
                              {item.description}
                            </Text>
                          </React.Fragment>
                        } footer={() =>
                              <View style={styles.footerContainer}>
                                <Button
                                    appearance="ghost"
                                    status="basic"
                                    icon={(style) => 
                                        <Icon {...style} name="pie-chart-outline" width="32" height="32" />
                                    }
                                >
                                  {new Date(item.createdAt).toLocaleDateString() }
                                </Button>
                              <Button
                                style={styles.footerControl}
                                appearance="ghost"
                                size='small'
                                status='basic'
                                onPress={() => Alert.alert('Cancel ?',
                                  'If you cancel this complaint, we will deleted this complaint permanent.',
                                  [
                                    {text: 'NO'},
                                    {text: 'YES', onPress: () => this.handleCancel(item.id)},
                                  ]
                                )}
                                icon={(style) => 
                                  <Icon {...style} name="close-outline" width="32" height="32" />
                                }
                              />
                              <Button
                                size='small'
                                appearance="ghost"
                                status="basic"
                                onPress={() => Alert.alert('Edit ?',
                                  '.',
                                  [
                                    {text: 'NO', onPress: () => console.warn('NO Pressed')},
                                    {text: 'YES', onPress: () => console.warn('YES Pressed')},
                                  ]
                                )}
                                icon={(style) => 
                                  <Icon {...style} name="edit-outline" width="32" height="32" />
                                }
                              />
                            </View>
                        } style={styles.myCard}>
                            <Image
                                style={styles.headerImage}
                                resizeMethod="scale"
                                resizeMode="cover"
                                source={{ uri: `http://192.168.43.136:5000/images/${item.foto}` }}
                            />
                            <Text style={styles.headerText} status="info" category="h6">
                              #{item.categories.name}
                            </Text>
                        </Card>
                    </Layout> 
                  )           
                })}
              </Layout>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  row: {
    padding: 10,
    backgroundColor: '#dfdfdf'
  },
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
  headerImage: {
    height: 300,

  },
  myCard: {
      marginTop: '2%'
  }
});

export default OnGoing