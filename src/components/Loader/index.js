import React from 'react'
import {Layout, Spinner} from '@ui-kitten/components'

export default function Loader() {
    return (
        <Layout style={{ alignSelf:'center', margin: '20%', backgroundColor: 'transparent' }}>
            <Spinner style={{ flexDirection:'row',alignSelf: 'center' }} status="info" size="giant" />
        </Layout>
    )
}