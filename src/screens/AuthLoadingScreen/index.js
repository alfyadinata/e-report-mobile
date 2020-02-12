import React, { Component } from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { StyleSheet, ImageBackground, StatusBar } from 'react-native'

class AuthLoadingScreen extends Component {
    constructor(props) {
        super()
        this.state  =   {
            isSubmit: false
        }
    }
    render() {
        return (
            <>
                <StatusBar  translucent={true} backgroundColor={"transparent"} barStyle="light-content" />
                <ImageBackground style={styles.bg} source={require('../../../public/bg3.jpeg')} resizeMode="cover" resizeMethod="scale" blurRadius={1} >
                    <Layout style={styles.transp}>
                        <Layout style={styles.title}>
                            <Text category="h4" status="control">Welcome To E-Report</Text>
                        </Layout>
                        <Layout style={styles.container}>
                            <Layout level="2" style={styles.btn}>
                                <Button status="basic" appearance="outline" onPress={() => this.props.navigation.navigate('Login')}>Sign In</Button>
                            </Layout>
                            <Layout level="1" style={styles.btn}>
                                <Button status="basic" appearance="outline" onPress={() => this.props.navigation.navigate('Register')} >Sign Up</Button>
                            </Layout>
                        </Layout>
                            <Layout style={styles.forgot}>
                                <Button status="basic" appearance="outline">Forgot Password ?</Button>
                            </Layout>
                    </Layout>
                </ImageBackground>
            </>
        )
    }
}

const styles    =   StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    bg: {
        width: '100%',
        height:'100%',
    },
    title: {
        alignSelf:'center',
        backgroundColor: 'black',
        marginTop:'60%',
        padding: '5%',
        borderRadius: 30,
        opacity: 0.5
    },
    transp: {
        backgroundColor: 'transparent'
    },
    btn: {
        marginTop: '15%',
        margin: '3%',
        backgroundColor: 'transparent'
    },
    forgot: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        flexDirection:'row'
    }
})

export default AuthLoadingScreen