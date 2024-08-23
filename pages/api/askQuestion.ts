import type { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';

type Data = {
  answer: string;
};

interface HuggingFaceResponse {
  generated_text?: string;
}

function isHuggingFaceResponse(data: any): data is HuggingFaceResponse {
  return typeof data === 'object' && data !== null && 'generated_text' in data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatID, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide A Prompt!" });
    return;
  }

  if (!chatID) {
    res.status(400).json({ answer: "Please Provide A Valid Chat ID!" });
    return;
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData: unknown = await response.json();

    if (isHuggingFaceResponse(responseData)) {
      res.status(200).json({ answer: responseData.generated_text || "Error generating response" });
    } else {
      res.status(500).json({ answer: "Invalid response format" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "An error occurred while generating the response." });
  }
}
