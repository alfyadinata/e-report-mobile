import React, { Component } from 'react'
import {  StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Text,Icon,Input, Layout, Button, Card, Spinner, Modal} from '@ui-kitten/components'
// helper
import baseApi from '../../config/http'

const renderModalElement = () => (
    <Spinner size='giant' status="control" />
);

class RegisterScreen extends Component {
    state   =   {
        name: '',
        email: '',
        password:'',
        nik: '',
        isSubmit: false,
        secureTextEntry:true
    }

    // setup password
    onIconPress = () => {
        this.setState({secureTextEntry:!this.state.secureTextEntry});
    };

    // handle back
    handleBack  =   ()  =>  {
        this.props.navigation.navigate('AuthLoading')
    }

    handleLoading   =   ()  =>  {
        this.setState({isSubmit: !this.state.isSubmit})
    }

    handleSubmit    =   async ()  =>  {
        await this.handleLoading()            

        await baseApi.post('/auth/signup', this.state)
        .then(res => {
            this.handleLoading()
            let token   =  res.data.token
            
            AsyncStorage.setItem('token', token)
            

            this.props.navigation.navigate('App')

            Alert.alert('Success', 'Welcome To E-Report :)')

        })
        .catch(err => {

            this.setState({isSubmit:false})
            Alert.alert('Failed','Please enter a valid input')

        })

    }

    render() {

        const lockIcon  = (style) => (
            <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        );
        const nameIcon = (style) => (
            <Icon {...style} name="person" />
        )
        const emailIcon = (style) => (
            <Icon {...style} name="email" />
        )
        const BackIcon = (style) => (
            <Icon {...style} name='arrow-ios-back-outline' width="32" height="32" />
        )
        const PinIcon = (style) => (
            <Icon {...style} name='save' width="32" height="32" />
        )

        const {secureTextEntry}   = this.state

        return (
            <>
                <ImageBackground style={styles.bg} source={require('../../../public/bg1.jpeg')} resizeMethod="scale" resizeMode="cover" blurRadius={2}>
                    <Button appearance="ghost" icon={BackIcon} status="basic" style={{ width:'10%', marginTop:'5%', color:'white' }} title="back"
                            onPress={this.handleBack}
                    />
                    <Modal
                        backdropStyle={styles.backdrop}
                        // onBackdropPress={this.handleLoading}
                        visible={this.state.isSubmit}>
                        {renderModalElement()}
                    </Modal>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Layout style={styles.transp}>
                            <Layout style={styles.containerCard}>
                                <Card style={styles.card}>
                                    <Text category="h4" status="control" style={{ marginTop:'7%'}}>Sign Up To E-Complaint</Text>
                                    <Input style={styles.input}
                                        value={this.state.name}
                                        placeholder="Name"
                                        icon={nameIcon}
                                        status="control"
                                        onIconPress={this.onIconPress}
                                        onChangeText={(name) => this.setState({name})}
                                    />
                                    {/* <Text style={styles.info} status="danger">Name is not valid</Text> */}
                                    <Input style={styles.input}
                                        value={this.state.email}
                                        autoCapitalize="none"
                                        placeholder="Email"
                                        status="control"
                                        icon={emailIcon}
                                        onIconPress={this.onIconPress}
                                        onChangeText={(email) => this.setState({email})}
                                    />
                                    <Input style={styles.input}
                                        value={this.state.nik}
                                        autoCapitalize="none"
                                        placeholder="ID Card"
                                        status="control"
                                        icon={PinIcon}
                                        onIconPress={this.onIconPress}
                                        onChangeText={(nik) => this.setState({nik})}
                                    />
                                    <Input style={styles.input}
                                        value={this.state.password}
                                        placeholder='********'
                                        status="control"
                                        icon={lockIcon}
                                        secureTextEntry={this.state.secureTextEntry}
                                        onIconPress={this.onIconPress}
                                        onChangeText={(password) => this.setState({password})}
                                    />
                                    <Layout style={styles.transp}>
                                        <Button status="control" appearance="ghost" onPress={this.handleSubmit}>Submit</Button>
                                        <Layout style={styles.container}>
                                            <Button status="info" appearance="ghost">Forgot Password</Button>
                                            <Button status="info" appearance="ghost" onPress={() => this.props.navigation.navigate('Login')}>Sign In</Button>
                                        </Layout>
                                    </Layout>
                                </Card>
                            </Layout>
                        </Layout>
                    </ScrollView>
                </ImageBackground>
            </>
        )
    }
}

const styles    =   StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor: 'transparent'
    },
    containerCard: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width:'90%',
        marginLeft:'5%'
    },
    bg: {
        width: '100%',
        height: '100%'
    }, 
    transp: {
        backgroundColor: 'transparent'
    },
    card: {
        backgroundColor: 'transparent',
        width:'100%',
        marginTop: '5%',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 20
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        backgroundColor: 'transparent',
        width:'100%',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 20
    },
    info: {
        marginLeft: '5%',
        marginBottom:'2%'
    }
})

export default RegisterScreen