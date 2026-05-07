import OpenAI from "openai";
import * as cheerio from "cheerio";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let websiteUrl = body.url;

    if (!websiteUrl.startsWith("http")) {
      websiteUrl = "https://" + websiteUrl;
    }

    const response = await fetch(websiteUrl);

    const html = await response.text();

    const $ = cheerio.load(html);

    const title = $("title").text();

    const headings = $("h1, h2")
      .map((_, el) => $(el).text())
      .get()
      .join("\n");

    const paragraphs = $("p")
      .map((_, el) => $(el).text())
      .get()
      .slice(0, 10)
      .join("\n");

    const content = `
Title:
${title}

Headings:
${headings}

Paragraphs:
${paragraphs}
    `;

    const completion = await openai.chat.completions.create({
      model: "baidu/cobuddy:free",
      messages: [
        {
          role: "user",
          content: `
You are an elite SEO and CRO consultant.

Analyze this website content:

${content}

Give:
1. SEO improvements
2. CTA improvements
3. Conversion optimization suggestions
4. Homepage improvements
5. Trust-building recommendations

Keep it concise and actionable.
          `,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      result: "Failed to analyze website.",
    });
  }
}