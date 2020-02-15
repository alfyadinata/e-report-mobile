import React from 'react'
import {
    Icon,
    ListItem,
  } from '@ui-kitten/components';
import { View } from 'react-native';
import baseApi from '../../config/http';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Street Problem',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Problem',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Problem',
    },
];
  
const StarIcon = (style) => (
    <Icon {...style} name='star'/>
  );

class NewsScreen extends React.Component {
    constructor(props) {
        super()
        this.state  =   {
            isLoading:true,
            data: []
        }
    }

    getData     =   ()  =>  {
        baseApi.get(`/news`)
        .then((res) => {
            if (res.status != 200) {
                
            }
            this.setState({
                isLoading: false,
                data: res.data.data,
            })
        })
        .catch((res) => {
            console.info(res)
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <View>
                <ListItem
                    title='Title'
                    description='Description'
                    icon={StarIcon}
                />
            </View>
        )
    }
}

export default NewsScreen