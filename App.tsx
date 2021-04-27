import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Users from './screens/users'
import CreateUser from './screens/createUser'
import UserDetail from './screens/detailUser'

function MyStack() {
  return (
    <Stack.Navigator> 
      <Stack.Screen name="Contactos" component={Users} />
      <Stack.Screen name="Creación de contacto" component={CreateUser} />
      <Stack.Screen name="Detalles de contacto" component={UserDetail} />
    </Stack.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#dbf6e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
