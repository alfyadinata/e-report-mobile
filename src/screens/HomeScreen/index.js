import React, { Component } from 'react'
import {  AsyncStorage, ImageBackground, StyleSheet } from 'react-native'
import { Text, Button, Card, Layout, ListItem, Icon } from '@ui-kitten/components'
import MyCarousel from '../../components/MyCarousel'
import { ScrollView } from 'react-native-gesture-handler'
import MyCard from '../../components/MyCard'

class HomeScreen extends Component {
    render() {
        const imgUrl    =   '../../../public/bg1.jpeg'
        return (
            <ScrollView>
                <Layout style={{ backgroundColor: 'transparent', justifyContent: 'center', flexDirection:'row', maxHeight:'25%', marginTop:'3%' }}>
                    <MyCarousel />
                </Layout>
                    <Text category="h6" status="primary">Category</Text>
                    <Layout style={styles.container}>
                        <Layout style={styles.col}>
                            <Button
                                appearance="ghost"
                                icon={() => <Icon name="alert-circle-outline"  />}
                            />
                        </Layout>
                        <Layout style={styles.col}>
                            <Button
                                appearance="ghost"
                                icon={() => <Icon name="camera-outline"  />}
                            />
                        </Layout>
                        <Layout style={styles.col}>
                            <Button
                                appearance="ghost"
                                icon={() => <Icon name="bell-outline"  />}
                            />
                        </Layout>
                        <Layout style={styles.col}>
                            <Button
                                appearance="ghost"
                                icon={() => <Icon name="bell-outline"  />}
                            />
                        </Layout>
                    </Layout>
                    <Text status="primary" category="h6">Complaint History</Text>
                    <Layout style={ styles.container }>
                        <ListItem 
                            title="Pulsa Telkomsel 10k"
                            description="hola"
                            icon={() => <Icon name="close-outline" />}
                        />
                        <ListItem 
                            title="Pulsa Telkom 10k"
                            description="hola"
                            icon={() => <Icon name="checkmark-outline" />}
                        />

                    </Layout>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <MyCard/>
                </ScrollView>
            </ScrollView>
        )
    }
}

const styles    =   StyleSheet.create({
    myCard: {
        backgroundColor: 'transparent'
    },
    title: {
        color: 'white',

    },
    icon: {
        color: 'red'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    col: {
        flex: 1
    }
})

export default HomeScreen