import React, { Component } from 'react'
import {  StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Text,Icon,Input, Layout, Button, Card,Spinner, Modal} from '@ui-kitten/components'
import baseApi from '../../config/http';

class LoginScreen extends Component {
    state   =   {
        isSubmit: false,
        email: '',
        password:'',
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
    // handle loading
    handleLoading   =   async ()  =>  {

            this.setState({isSubmit: !this.state.isSubmit})            

    }
    
    handleSubmit    =   async ()  =>  {

        await this.handleLoading()

        setTimeout(async () => {

            await baseApi.post('/auth/signin', this.state)
            .then(async res => {
                this.setState({isSubmit:false})
                console.info(res)
                if (res.status === 200) {
    
                    let token   =   res.data.token
                    let user    =   res.data.data
    
                    await AsyncStorage.setItem('token', JSON.stringify(token))
                    await AsyncStorage.setItem('name', JSON.stringify(user.name))
                    await AsyncStorage.setItem('user_id', JSON.stringify(user.id))
                    await AsyncStorage.setItem('email', JSON.stringify(user.email))
                    await AsyncStorage.setItem('role_id', JSON.stringify(user.role_id))
    
                    this.props.navigation.navigate('App')
    
                    Alert.alert('Hii, '+res.data.data.name,' Welcome To E-Report');
    
                }else{
    
                    this.setState({isSubmit:false})
    
                    Alert.alert('Oops','Something is went wrong');
                }
    
            })
            .catch(err => {
    
                    this.setState({isSubmit:false})
    
                    Alert.alert('Oops','Invalid Email or Password');                
    
            })

        }, 1500);

    }
    render() {

        const renderModalElement = () => (
            <Spinner size='giant' status="control" />
        );

        const lockIcon  = (style) => (
            <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        );
        const emailIcon = (style) => (
            <Icon {...style} name="email" />
        )
        const BackIcon = (style) => (
            <Icon {...style} name='arrow-ios-back-outline' width="32" height="32" />
        )
        const {secureTextEntry}   = this.state

        return (
            <>
                <ImageBackground style={styles.bg} source={require('../../../public/bg2.jpeg')} resizeMethod="scale" resizeMode="cover" blurRadius={2}>
                    <Button appearance="ghost" icon={BackIcon} status="basic" style={{ width:'10%', marginTop:'5%', color:'white' }} title="back"
                            onPress={() => { this.props.navigation.goBack() }}
                    />
                    <Modal
                        backdropStyle={styles.backdrop}
                        // onBackdropPress={this.handleLoading}
                        visible={this.state.isSubmit}>
                        {renderModalElement()}
                    </Modal>
                    <ScrollView>
                        <Layout style={styles.transp}>
                            <Layout style={styles.containerCard}>
                                <Card style={styles.card}>
                                    <Text category="h4" status="control" style={{ marginTop:'7%'}}>Sign In To E-Complaint</Text>
                                    <Input style={styles.input}
                                        value={this.state.email}
                                        placeholder="Email"
                                        icon={emailIcon}
                                        autoCapitalize="none"
                                        status="control"
                                        onIconPress={this.onIconPress}
                                        onChangeText={(email) => this.setState({email})}
                                    />
                                    <Input style={styles.input}
                                        value={this.state.password}
                                        placeholder='********'
                                        icon={lockIcon}
                                        status="control"
                                        secureTextEntry={this.state.secureTextEntry}
                                        onIconPress={this.onIconPress}
                                        onChangeText={(password) => this.setState({password})}
                                    />
                                    <Layout style={styles.transp}>
                                        <Button status="control" appearance="ghost" onPress={this.handleSubmit}>Submit</Button>
                                        <Layout style={styles.container}>
                                            <Button status="info" appearance="ghost">Forgot Password</Button>
                                            <Button status="info" appearance="ghost" onPress={() => this.props.navigation.navigate('Register')}>Sign Up</Button>
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
        marginTop: '15%',
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
})

export default LoginScreen