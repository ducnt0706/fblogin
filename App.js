import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import AsyncStorage from '@react-native-community/async-storage';

import Login from './app/screens/Login';
import Home from './app/screens/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // const getAccessToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@AccessToken')
  //     if(value !== null) {
  //       // value previously stored
  //       setLogin(true);
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  // useEffect(async () => {
  //   setLoading(true);
  //   await getAccessToken();
  //   setLoading(false);
  // }, []);

  // if(isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size='large' color='red' />
  //     </View>
  //   )
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Login" component={Login} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})