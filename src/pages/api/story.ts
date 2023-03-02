// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const storyline = req.body.text || "";
  if (storyline.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a storyline description",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a short children's story ${storyline} that is a 2 minute read`,
      temperature: 0.6,
      max_tokens: 1000,
    });

    const response = await openai.createImage({
      prompt: `${storyline} happy modern children's illustration 3d style`,
      n: 4,
      size: "1024x1024",
    });

    const imagesResponse = await response.data.data;
    const images = imagesResponse.map((image) => image.url);
    res.status(200).json({
      result: { text: completion.data.choices[0].text, images },
    });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
