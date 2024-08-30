import { GoogleGenerativeAI } from '@google/generative-ai';
import { MeasureType } from '@prisma/client';
// import fs from 'fs';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// // Converts local file information to a GoogleGenerativeAI.Part object.
// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString('base64'),
//       mimeType,
//     },
//   };
// }

export async function runGemini(type: MeasureType, image: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt =
    'Please read the ' +
    type +
    ' meter reading from this image, just the numbers. If its not a meter, return null';

  // const imageParts = [
  //   fileToGenerativePart('image1.png', 'image/png'),
  //   fileToGenerativePart('image2.jpeg', 'image/jpeg'),
  // ];

  const result = await model.generateContent([prompt, image]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
