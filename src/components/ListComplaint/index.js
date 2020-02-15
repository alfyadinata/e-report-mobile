import React from 'react'
import { ListItem, } from '@ui-kitten/components';
    

class ListComplaint extends React.Component {
    constructor(props) {
        super()
        this.state  =   {

        }
    }
    render() {
        return (
            <ListItem
                title={this.props.title}
                description={this.props.description}
                icon={this.props.icon}
            />
        )
    }
}

export default ListComplaint