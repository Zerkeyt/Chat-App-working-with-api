/* import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export function Styling() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 222,
        text: 'Hello Sir! How can I assist you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'DV',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const onLongPress = useCallback((context, message) => {
    const options = ['Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
    }, (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
                setMessages(previousMessages =>
                    previousMessages.filter(msg => msg._id !== message._id)
                );
                break;
            case 1:
                break;
        }
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      onLongPress={onLongPress}
      user={{
        _id: 1,
      }}
    />
  )
};

export default Styling; */