import React from 'react'
import { Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, Layout } from '@ui-kitten/components'
import Carousel from 'simple-carousel-react-native'
// assets
import c1 from '../../../public/c1.png'
// helpers
import baseApi from '../../config/http'
import MyCard from '../MyCard'

class MyCarousel extends React.Component{
    constructor(props) {
        super()
        this.state  =   {
            isLoading: true,
            data: []
        }
    }

    getApi  =   ()  =>  {
        baseApi.get('/carousel')
        .then(res => {
            console.info(res)
        })
        .catch(err => {
            console.info(err)
        })
    }

    render() {
        return (
            <Carousel color="blue">
                <Layout style={{ backgroundColor:'transparent' }}>
                    <MyCard title="One" />
                </Layout>
                <Layout style={{ backgroundColor:'transparent' }}>
                    <MyCard title="Two" />
                </Layout>
                <Layout style={{ backgroundColor:'transparent' }}>
                    <MyCard title="Three" />
                </Layout>
            </Carousel>
        )
    }
}

export default MyCarousel