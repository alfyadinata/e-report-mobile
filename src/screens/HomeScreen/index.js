import React, { Component } from 'react'
import { Text, AsyncStorage } from 'react-native'
import { Button } from '@ui-kitten/components'

class HomeScreen extends Component {
    render() {
        return (
            <>
                <Button onPress={ () => { AsyncStorage.clear() } }>Logout</Button>
            </>
        )
    }
}

export default HomeScreen