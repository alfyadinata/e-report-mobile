import React from 'react'
import { Button } from '@ui-kitten/components'

class ComplaintScreen extends React.Component {
  render() {
    return (
      <Button onPress={() => this.props.navigation.navigate('SelectLocation')}>
        Select Location
      </Button>
    )
  }
}


export default ComplaintScreen