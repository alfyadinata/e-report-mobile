import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Router } from './src/Router';
import LoginScreen from './src/screens/LoginScreen';


const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Router />
      {/* <Text>Hola</Text> */}
      {/* <LoginScreen /> */}
    </ApplicationProvider>
  </>
);

export default App;