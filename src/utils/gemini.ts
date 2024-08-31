import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

// Defina o tipo para a parte generativa
interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

// Função ajustada para aceitar uma imagem em base64
async function textGenMultimodalOneImagePrompt(
  base64Image: string,
  mimeType: string,
  prompt: string,
): Promise<void> {
  // [START text_gen_multimodal_one_image_prompt]
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model: GenerativeModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  function base64ToGenerativePart(
    base64Image: string,
    mimeType: string,
  ): GenerativePart {
    return {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    };
  }

  const imagePart: GenerativePart = base64ToGenerativePart(
    base64Image,
    mimeType,
  );

  const result = await model.generateContent([prompt, imagePart]);

  console.log(result.response.text());
  // [END text_gen_multimodal_one_image_prompt]
}

export { textGenMultimodalOneImagePrompt };
