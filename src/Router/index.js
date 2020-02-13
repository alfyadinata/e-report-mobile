import React from 'react'

// screen
import HomeScreen from '../screens/HomeScreen'
import MyReportScreen from '../screens/MyReportScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createSwitchNavigator, createAppContainer, SafeAreaView  } from 'react-navigation'
import { BottomNavigation, BottomNavigationTab, Layout, Icon } from '@ui-kitten/components';
import AuthCheck from '../screens/AuthCheck'


const HomeIcon = (style) => (
    <Icon {...style} name='home-outline'/>
);

const ProfileIcon = (style) => (
    <Icon {...style} name='menu-outline'/>
);

const NotifyIcon = (style) => (
  <Icon {...style} name='bell-outline'/>
);

const ReportIcon = (style) => (
    <Icon {...style} name='book-outline'/>
);

const HomeStack = createStackNavigator({
    Home: HomeScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

const ReportStack   =   createStackNavigator({
    Report: MyReportScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

const ProfileStack  =   createStackNavigator({
    Profile: ProfileScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)


const TabBarComponent = ({ navigation }) => {

  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };
  
    return (
      <SafeAreaView>
        <BottomNavigation
          selectedIndex={navigation.state.index} onSelect={onSelect}>
          <BottomNavigationTab title='Home' icon={HomeIcon}/>
          <BottomNavigationTab title='My Report' icon={ReportIcon}/>
          <BottomNavigationTab title="Notification" icon={NotifyIcon} />
          <BottomNavigationTab title='Profile' icon={ProfileIcon}/>
        </BottomNavigation>
      </SafeAreaView>
    );
};

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    MyReport: ReportStack,
    Profile: ProfileStack
  }, {
    tabBarComponent: TabBarComponent,
    defaultNavigationOptions: {
      headerMode: 'none'
    }
});

const AuthStack   = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: LoginScreen,
  Register: RegisterScreen
},
  {
    mode: 'card',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.SlideFromRightIOS ,
  },
})

const AppNavigator  =   createSwitchNavigator({
    Check: AuthCheck,
    Auth: AuthStack,
    App: TabNavigator
})  

export const Router = createAppContainer(AppNavigator);
  