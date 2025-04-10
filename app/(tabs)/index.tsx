import { Image, StyleSheet, Platform, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useDogImage } from '@/hooks/useDogImage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

interface WebhookResponse {
  response: string;
}

export default function HomeScreen() {
  const { imageUrl, isLoading, error, refetch, currentBreed } = useDogImage();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! I love dogs!', isUser: false },
    { id: 2, text: 'Me too! What\'s your favorite breed?', isUser: true },
  ]);

  const sendMessage = async () => {
    if (message.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { 
      id: chatMessages.length + 1, 
      text: message, 
      isUser: true 
    }]);

    // Send message and breed to webhook
    try {
      const response = await fetch('http://localhost:5678/webhook-test/b8ca0fd2-0dff-47ad-b624-a93b69af8f49', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          breed: currentBreed,
        }),
      });

      // First try to get the response as text
      const responseText = await response.text();
      
      let responseData: WebhookResponse;
      try {
        // Try to parse the text as JSON
        responseData = JSON.parse(responseText);
      } catch (jsonError) {
        // If it's not JSON, use the raw text as the response
        responseData = { response: responseText };
      }
      
      // Add webhook response to chat
      setChatMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: responseData.response || responseText, // Fallback to raw text if response property doesn't exist
        isUser: false 
      }]);
    } catch (error) {
      console.error('Failed to send data to webhook:', error);
      // Add error message to chat
      setChatMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: "Sorry, I couldn't process your message at the moment.", 
        isUser: false 
      }]);
    }
    
    // Clear input
    setMessage('');
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
        
        <ScrollView 
          style={styles.chatMessages}
          ref={ref => {
            if (ref) {
              // Scroll to bottom when new messages arrive
              ref.scrollToEnd({ animated: true });
            }
          }}
        >
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
            onSubmitEditing={sendMessage}
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

