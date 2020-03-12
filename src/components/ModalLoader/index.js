import React from 'react'
import { Modal, Spinner } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

export default function ModalLoader(props) {
    const [visible, setVisible] = React.useState(false);

    const toggleModal   =   props.visible   ==  true ? true : false

    const renderModalElement = () => (
        <Spinner size='giant' status="control" />
    );

    return (
        <Modal
            backdropStyle={styles.backdrop}
            // onBackdropPress={this.handleLoading}
            visible={toggleModal}>
            {renderModalElement()}
        </Modal>
    )
}

const styles    =   StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})