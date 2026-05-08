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

    // Add https automatically
    if (!websiteUrl.startsWith("http")) {
      websiteUrl = "https://" + websiteUrl;
    }

    // Fetch website HTML
    const response = await fetch(websiteUrl);

    const html = await response.text();

    // Load HTML
    const $ = cheerio.load(html);

    // Extract content
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
Website URL:
${websiteUrl}

Title:
${title}

Headings:
${headings}

Paragraphs:
${paragraphs}
`;

    // AI ANALYSIS
    const completion = await openai.chat.completions.create({
      model: "baidu/cobuddy:free",

      messages: [
        {
          role: "system",
          content: `
You are an elite SEO and CRO consultant.

Always respond professionally.
          `,
        },

        {
          role: "user",
          content: `
Analyze this website carefully:

${content}

Provide:

SEO Score: X/100
Conversion Score: X/100
Trust Score: X/100

## SEO Improvements
Only 3 bullet points.

## CTA Improvements
Only 2 bullet points.

At the end write:

---
Upgrade to Premium to unlock:
- Full SEO Audit
- Competitor Analysis
- Advanced Conversion Optimization
- AI Growth Strategy
- Revenue Opportunities
- Bullet points
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