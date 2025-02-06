import { View, TextInput, Text, Button, FlatList } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/utils';
import BubbleMessage from '@/components/BubbleMessage';
import { ChangeEvent, useState } from 'react';

export default function TabChat() {

  const exampleMessages = [
    { id: 1, content: 'Hola', role: 'user' },
    { id: 2, content: 'Hola', role: 'assistant' },
    { id: 3, content: 'Hola', role: 'user' },
  ];

  const { messages, error, handleInputChange: handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  if (error) return <Text>{error.message}</Text>;

  //const [localMessages, setLocalMessages] = useState(exampleMessages);

  return (
    <View className='flex flex-col h-full p-4'>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          console.log(item),
          <BubbleMessage message={item.content} type={item.role} />
        )}
        keyExtractor={item => item.id.toString()}
      />

      <View className='flex flex-row w-full'>
      <TextInput
          className='flex-1 border'
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={e =>
            handleInputChange({
              ...e,
              target: {
                ...e.target,
                value: e.nativeEvent.text,
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          onSubmitEditing={e => {
            handleSubmit(e);
            e.preventDefault();
          }}
          autoFocus={true}
        />
        <Button
          title="Enviar"
          onPress={(e) => {
            handleSubmit(e);
            e.preventDefault();
          }}
        />
      </View>
    </View>

  );
}


