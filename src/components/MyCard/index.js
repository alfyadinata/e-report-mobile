import React from 'react'
import { Card, Text, Layout } from '@ui-kitten/components'
import { ImageBackground } from 'react-native'

function MyCard(props) {
    return (
        <Layout style={{ padding:'5%', backgroundColor: 'transparent' }}>

            <ImageBackground style={{ width:'100%' }} source={require('../../../public/c1.png')}>
                <Card style={{ backgroundColor: 'transparent' }}>
                    <Text status="control" category="h2" >{props.title}</Text>
                    <Text status="control">contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an.</Text>
                </Card>
            </ImageBackground>
        </Layout>
    )
}

export default MyCard