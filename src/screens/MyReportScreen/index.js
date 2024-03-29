import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text, Icon } from '@ui-kitten/components';
import ListComplaint from '../../components/ListComplaint';
import OnGoing from './OnGoing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import History from './History';

const StarIcon = (style) => <Icon {...style} name="checkmark" />;

const FailIcon = (style) => <Icon {...style} name="close" />;

const TopTab = () => {
	const [ selectedIndex, setSelectedIndex ] = React.useState(0);
	const shouldLoadComponent = (index) => index === selectedIndex;
	return (
		<TabView selectedIndex={selectedIndex} shouldLoadComponent={shouldLoadComponent} onSelect={setSelectedIndex}>
			<Tab title="On Going" style={{ padding: 3 }}>
				<OnGoing />
			</Tab>
			<Tab title="History" style={{ padding: 3, backgroundColor: 'white' }}>
				<History />
			</Tab>
		</TabView>
	);
};

const styles = StyleSheet.create({
	tabContainer: {
		minHeight: 64
	}
});

class MyReportScreen extends Component {
	render() {
		return <TopTab />;
	}
}

export default MyReportScreen;
