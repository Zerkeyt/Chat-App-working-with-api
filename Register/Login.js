import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { registerRootComponent } from 'expo';

  const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

      try {
      const response = await axios.post('https://chat-api-with-auth.up.railway.app/auth/token', {
        username,
        password,},
        {headers: {
          'Content-Type': 'application/json',
        }}
      );

      if (response.status===200) {

       /* Alert.alert(response.status);  */
 
      
      navigation.navigate('Chat'); 
      } else {
        
        Alert.alert("Login Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Logga in</Text>
      <TextInput
        placeholder="Användarnamn"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Lösenord"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Logga in" onPress={handleLogin} />
    </View>
  );
};

export default Login;
