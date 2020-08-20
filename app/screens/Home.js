import * as React from 'react';
import { Text, View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
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
        onLogoutFinished={() => console.log("logout.")}
      />
    </View>
  );
}