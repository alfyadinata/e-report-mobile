import React, { Component } from 'react'
import { Text, AsyncStorage, Alert } from 'react-native'
import { Button } from '@ui-kitten/components'

class ProfileScreen extends Component {
    handleLogout    =   async ()  =>  {
        await Alert.alert(
            'Alert Title',
            'My Alert Msg', // <- this part is optional, you can pass an empty string
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }
    render() {
        return (
            <>
                <Button onPress={this.handleLogout}>Logout</Button>
            </>
        )
    }
}

export default ProfileScreen