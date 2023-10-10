import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Link } from '@react-navigation/native';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://chat-api-with-auth.up.railway.app/auth/register', {
        username,
        password,},
        {headers: {
          'Content-Type': 'application/json',
        }}
      );
        console.log(response.status);
        console.log(username);
        console.log(password)


        Alert.alert("Registration Successful");
        navigation.navigate('Login');
      } catch (error) {
        console.error(error);

       if (error.response) {

       Alert.alert("Registration failed", error.response.data.message || "An error occurred");
   
      } else {

      Alert.alert("Registration failed", "An error occurred");
    }
  }
};
        
    /*   if (response.status===200) {
        Alert.alert("Registration Successful!!");
      
        navigation.navigate('Login');
      }  catch (error) {
        console.error(error);

        if (error.response){
          Alert.alert("Registration Failed", error.response.data.message || "An error Occurred");
        }

      } else {
        Alert.alert("Registration failed");

      }
    } catch (error) {
      console.error(error);
    }
  }; */

  return (
    <View>
      <Text>Registrera dig</Text>
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
      <Button title="Registrera" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
