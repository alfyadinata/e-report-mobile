import React from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout, Input } from '@ui-kitten/components'

class ComplaintScreen extends React.Component{
    constructor(props) {
        super()
        this.state  =   {
            isLoading: true,
            isSubmit: false,
            form: {
                title: '',
                description: '',
                address: '',
            }
        }
    }
    render() {
        return (
            <ScrollView>
                <Layout style={styles.container}>
                    <Layout style={styles.form}>
                        <Input 
                            style={styles.input}
                            placeholder="Title"
                        />
                    </Layout>
                </Layout>
            </ScrollView>
        )
    }
}

const styles    =   StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    form: {
        // flex: 1,
        width:'75%',
    },
    input: {
        margin: '2%'
    }
})

export default ComplaintScreen