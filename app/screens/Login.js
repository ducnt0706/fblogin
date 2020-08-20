import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
// import AsyncStorage from '@react-native-community/async-storage';

export default function Login() {

  // const saveToken = async (accessToken) => {
  //   try {
  //     await AsyncStorage.setItem('@AccessToken', accessToken)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  return (
    <View style={styles.container}>
      <LoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(data.accessToken.toString());
                  // saveToken(data.accessToken.toString());
                }
              )
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})