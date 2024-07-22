// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import FeedScreen from './screens/FeedScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
