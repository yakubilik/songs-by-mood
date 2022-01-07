import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Find from './screens/Find';
import { Button } from 'react-native-web';
import Photo from './screens/Photo';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen 
    name="Home" 
    component={Home}
    options={{
      title: 'Play Music',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    }}
    />
    <Stack.Screen 
    name="Find" 
    component={Find}
    options={{
      title: 'Find By Mood',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    }}
    />

<Stack.Screen 
    name="Photo" 
    component={Photo}
    options={{
      title: 'Find By Photo',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    }}
    />
    
    
      
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
