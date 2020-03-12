import React from 'react'
import baseApi from '../../../config/http'
import { Button } from '@ui-kitten/components'

class SelectCategory extends React.Component {
    state   =   {
        isLoading: true,
        data: []
    }

    getData     =   async ()  =>  {
        await baseApi.get('/category')
        .then(res => {

            this.setState({
                isLoading: false,
                data: res.data.data
            })

        })
        .catch(err => {

            console.info(err)

        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <Button>
                
            </Button>
        )
    }
}