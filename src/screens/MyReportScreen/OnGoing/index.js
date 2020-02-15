import React from 'react';
import {
  Image,
  StyleSheet, View
} from 'react-native';
import {
  Card,
  Text, Button, Icon, Layout
} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';


// const PendingIcon         = ()  => {
//     return (

//     )
// }

export const CustomHeader = ()  => (
  <React.Fragment>
    {/* <Image
      style={styles.headerImage}
      source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg' }}
    /> */}
    <Text
      style={styles.headerText}
      category='h6'>
      Pelaporan Jalan Rusak
    </Text>
  </React.Fragment>
);


const Footer = () => (
    <View style={styles.footerContainer}>
        {/* <Text>Status : </Text>  */}
        {/* <Button appearance="ghost"> */}
        <Button
            appearance="ghost"
            status="warning"
            icon={(style) => 
                <Icon {...style} name="pie-chart-outline" width="32" height="32" />
            }
        />
            

        {/* </Button> */}
        {/* <Text category="h5">Pending</Text> */}
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'>
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'>
        ACCEPT
      </Button>
    </View>
);


class OnGoing extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Layout>
                    <Card header={CustomHeader} footer={Footer} style={styles.myCard}>
                        <Image
                            style={styles.headerImage}
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg' }}
                        />
                        <Text>
                        The Maldives, officially the Republic of Maldives, is a small country in South Asia,
                        located in the Arabian Sea of the Indian Ocean.
                        It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
                        </Text>
                    </Card>
                    <Card header={CustomHeader} footer={Footer} style={styles.myCard}>
                        <Image
                            style={styles.headerImage}
                            source={require('../.././../../public/c2.png')}
                        />
                        <Text>
                        The Maldives, officially the Republic of Maldives, is a small country in South Asia,
                        located in the Arabian Sea of the Indian Ocean.
                        It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
                        </Text>
                    </Card>
                </Layout>
            </ScrollView>
        )
    }
}

export default OnGoing

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch'
  },
  myCard: {
      marginTop: '2%'
  }
});