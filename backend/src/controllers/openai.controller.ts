import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const generateResultPrompt = async (req: any, res: any) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate 5 3 to 5 word statements or questions for a user on a loading screen of a quiz waiting to see if they have the right answer or not. This should be in parsable JSON format: 
          {
            "messages": []
          }`,
        },
      ],
      max_tokens: 150,
    });

    res.json({
      response: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export { generateResultPrompt };
