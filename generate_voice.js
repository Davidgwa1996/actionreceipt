import * as googleTTS from 'google-tts-api';
import fs from 'fs';

const scripts = [
  "Welcome to MarketSquare. We help you discover great deals. ActionReceipt ensures that your listings are fully verified and safe.",
  "Verify your purchase before you buy. Check the seller identity and the item authenticity securely.",
  "Gemini AI verification is now in progress. Our system runs a comprehensive multipoint check to ensure everything is perfect.",
  "Purchase successfully verified. You can now proceed to checkout with complete confidence.",
  "Proceed with our secure payment system powered by ActionReceipt for ultimate protection.",
  "Transaction confirmed. The funds have been securely released and the item is on its way."
];

async function generate() {
  for (let i = 0; i < scripts.length; i++) {
    const text = scripts[i];
    try {
      const base64Audio = await googleTTS.getAudioBase64(text, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      });
      const buffer = Buffer.from(base64Audio, 'base64');
      fs.writeFileSync(`voice_${i}.mp3`, buffer);
      console.log(`Saved voice_${i}.mp3`);
    } catch (e) {
      console.error(e);
    }
  }
}
generate();
