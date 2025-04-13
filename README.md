# ซอร์สโค้ดนี้ ใช้สำหรับเป็นตัวอย่างเท่านั้น ถ้านำไปใช้งานจริง ผู้ใช้ต้องจัดการเรื่องความปลอดภัย และ ประสิทธิภาพด้วยตัวเอง

# 🐕 Doggo - AI Dog Chat App

A React Native/Expo app that lets you chat with AI-powered dogs! Each random dog image comes with its own breed-specific AI personality to chat with.

## Features

- 🎲 Random dog image generation using the Dog CEO API
- 💬 Chat interface with breed-specific AI personalities
- 🌐 Integration with n8n webhook for AI responses
- 🇹🇭 Thai/English language support
- 📱 Cross-platform (iOS, Android, Web) support

## Prerequisites

- Node.js (version specified in package.json)
- npm or yarn
- n8n server running with the dog AI agent workflow
- Expo Go app (for mobile development)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure n8n webhook:

   - Update the webhook URL in `app/(tabs)/index.tsx` with your n8n instance URL
   - Ensure your n8n workflow is active and properly configured (n8n flow in folder images)

```bash
npx expo start
```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app for physical devices

## Project Structure

- `app/(tabs)/index.tsx` - Main chat interface and dog image display
- `hooks/useDogImage.ts` - Custom hook for fetching random dog images
- `components/` - Reusable UI components
- `assets/` - Images and fonts

## How It Works

1. The app fetches random dog images from the Dog CEO API
2. Each image's breed is extracted from the URL
3. Messages are sent to n8n webhook along with the current breed
4. n8n processes the message using AI to respond as that specific breed
5. Responses are displayed in the chat interface

## Development

To modify the chat interface or add features:

1. Edit `app/(tabs)/index.tsx` for main screen changes
2. Update `hooks/useDogImage.ts` for dog image fetching logic
3. Modify the n8n workflow for different AI personalities

## License

MIT

## Credits

- Dog images provided by [Dog CEO API](https://dog.ceo/dog-api/)
- Built with [Expo](https://expo.dev)
- AI integration powered by n8n
