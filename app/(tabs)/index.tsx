import { Image, StyleSheet, Platform, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useDogImage } from '@/hooks/useDogImage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const { imageUrl, isLoading, error, refetch } = useDogImage();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! I love dogs!', isUser: false },
    { id: 2, text: 'Me too! What\'s your favorite breed?', isUser: true },
  ]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { 
      id: chatMessages.length + 1, 
      text: message, 
      isUser: true 
    }]);
    
    // Clear input
    setMessage('');
    
    // Simulate response (in a real app, you'd call an API here)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: `Woof! That's interesting!`, 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ThemedText>Loading...</ThemedText>}
      {error && <ThemedText>Error: {error}</ThemedText>}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.dogImage}
          resizeMode="cover"
        />
      )}
      <ThemedText 
        onPress={refetch}
        style={styles.button}
      >
        Fetch New Dog
      </ThemedText>
      
      {/* Chat UI Section */}
      <ThemedView style={styles.chatContainer}>
        <ThemedText style={styles.chatTitle}>Chat with Doggo</ThemedText>
        
        <ScrollView style={styles.chatMessages}>
          {chatMessages.map((chat) => (
            <ThemedView 
              key={chat.id} 
              style={[
                styles.chatBubble, 
                chat.isUser ? styles.userBubble : styles.dogBubble
              ]}
            >
              <ThemedText style={chat.isUser ? styles.userText : styles.dogText}>
                {chat.text}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
        
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText style={styles.sendButtonText}>Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#A1CEDC',
    borderRadius: 5,
  },
  // Chat UI styles
  chatContainer: {
    width: '100%',
    marginTop: 20,
    height: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chatMessages: {
    flex: 1,
    marginBottom: 10,
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#A1CEDC',
  },
  dogBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  userText: {
    color: '#333',
  },
  dogText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#A1CEDC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

