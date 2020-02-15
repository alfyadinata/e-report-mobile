import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {Layout,Tab,TabView,Text, Icon } from '@ui-kitten/components'
import ListComplaint from '../../components/ListComplaint';
import OnGoing from './OnGoing';
import { TouchableOpacity } from 'react-native-gesture-handler';


const StarIcon = (style) => (
    <Icon {...style} name='checkmark'/>
)

const FailIcon = (style) => (
    <Icon {...style} name='close'/>
)


const   TopTab      =   ()  =>  {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const shouldLoadComponent = (index) => index === selectedIndex;
    return (
        <TabView
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={setSelectedIndex}>
            <Tab title='On Going'>
                <OnGoing />
            </Tab>
            <Tab title='History'>
            <Layout style={styles.tabContainer}>
                <TouchableOpacity onPress={() => { alert('Clicked') }}>
                    <ListComplaint
                        title="Pelaporan Jalan Rusak"
                        description="The key feature of wrapping custom list items into ListItem component is that it automatically"
                        icon={FailIcon}
                    />
                </TouchableOpacity>
                <ListComplaint
                    title="Pelaporan Lampu Merah"
                    description="The key feature of wrapping custom list items into ListItem component is that it automatically"
                    icon={StarIcon}
                />
            </Layout>
            </Tab>
        </TabView>
    )
}



const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 64,
    },
  });


class MyReportScreen extends Component {
    render() {
        return (
            <TopTab />
        )
    }
}

export default MyReportScreen