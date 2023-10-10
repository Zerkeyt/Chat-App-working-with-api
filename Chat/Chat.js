import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
        try {
            const response = await axios.get('https://chat-api-with-auth.up.railway.app/messages',
                {
                    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1OTYzZmJjNzVlMjMzYjNmMjliNGQiLCJ1c2VybmFtZSI6IjIyMiIsImRhdGUiOiIyMDIzLTEwLTEwVDE4OjIxOjUxLjcxNloiLCJpYXQiOjE2OTY5NjIxMjR9.HJyWBLl9OwLGHLhOtj4FKTa2pAbDkPauSYxUbqa295E` }
                });

            setMessages(response.data);
            
        } catch (error) {
            console.error(error);
        }
    }

    const createMessage = async () => {
        try {
          const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1OTYzZmJjNzVlMjMzYjNmMjliNGQiLCJ1c2VybmFtZSI6IjIyMiIsImRhdGUiOiIyMDIzLTEwLTEwVDE4OjIxOjUxLjcxNloiLCJpYXQiOjE2OTY5NjIxMjR9.HJyWBLl9OwLGHLhOtj4FKTa2pAbDkPauSYxUbqa295E";
          const response = await axios.post('https://chat-api-with-auth.up.railway.app/messages', {
            content: newMessage,
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setNewMessage('');
          fetchMessages();
        } catch (error) {
          console.error('Error creating message:', error);
          
        }
      };


  const deleteMessage = async () => {
    const idToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI1OTYzZmJjNzVlMjMzYjNmMjliNGQiLCJ1c2VybmFtZSI6IjIyMiIsImRhdGUiOiIyMDIzLTEwLTEwVDE4OjIxOjUxLjcxNloiLCJpYXQiOjE2OTY5NjIxMjR9.HJyWBLl9OwLGHLhOtj4FKTa2pAbDkPauSYxUbqa295E";
  
    try {
      await axios.delete(`https://chat-api-with-auth.up.railway.app/messages/64e7116018084705cd1f8346`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: item.belongsToLoggedInUser ? 'row-reverse' : 'row' }}>
      <Text>{item.content}</Text>
      {item.belongsToLoggedInUser && (
        <TouchableOpacity onPress={() => deleteMessage(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TextInput
        placeholder="Type a message"
        value={newMessage}
        onChangeText={text => setNewMessage(text)}
      />
      <Button title="Send" onPress={createMessage} />
    </View>
  );
};

export default Chat;
