import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createClient } from "@/utils/supabase/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const supabase = createClient();

  const timelineEntriesResponse = await supabase.from("timeline").select("*");
  const timelineEntries = timelineEntriesResponse.data
    ?.map((e) => {
      return `
    Timeline Entry: ${e.date}
    ${e.markdown}
    `;
    })
    .join("\n");

  const systemPrompt = `You are an AI assistant that produces JSON resumes. Use the provided context and user instructions to generate a JSON resume. The JSON resume schema is as follows :

  ${jsonResumeSchema}

  This is a timeline of all the user's achievements and noteworthy points: 

  ${timelineEntries}


  Answer the user's query and return your response in JSON format. Make sure to return a JSON response conforming to the JSON Resume schema.

  If you don't have enough context to generate an accurate resume, leave the corresponding fields blank.
  `;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
    response_format: {
      type: "json_object",
    },
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

const jsonResumeSchema = JSON.stringify(
  {
    basics: {
      name: "John Doe",
      label: "Programmer",
      image: "",
      email: "john@gmail.com",
      phone: "(912) 555-4321",
      url: "https://johndoe.com",
      summary: "A summary of John Doe…",
      location: {
        address: "2712 Broadway St",
        postalCode: "CA 94115",
        city: "San Francisco",
        countryCode: "US",
        region: "California",
      },
      profiles: [
        {
          network: "Twitter",
          username: "john",
          url: "https://twitter.com/john",
        },
      ],
    },
    work: [
      {
        name: "Company",
        position: "President",
        url: "https://company.com",
        startDate: "2013-01-01",
        endDate: "2014-01-01",
        summary: "Description…",
        highlights: ["Started the company"],
      },
    ],
    volunteer: [
      {
        organization: "Organization",
        position: "Volunteer",
        url: "https://organization.com/",
        startDate: "2012-01-01",
        endDate: "2013-01-01",
        summary: "Description…",
        highlights: ["Awarded 'Volunteer of the Month'"],
      },
    ],
    education: [
      {
        institution: "University",
        url: "https://institution.com/",
        area: "Software Development",
        studyType: "Bachelor",
        startDate: "2011-01-01",
        endDate: "2013-01-01",
        score: "4.0",
        courses: ["DB1101 - Basic SQL"],
      },
    ],
    awards: [
      {
        title: "Award",
        date: "2014-11-01",
        awarder: "Company",
        summary: "There is no spoon.",
      },
    ],
    certificates: [
      {
        name: "Certificate",
        date: "2021-11-07",
        issuer: "Company",
        url: "https://certificate.com",
      },
    ],
    publications: [
      {
        name: "Publication",
        publisher: "Company",
        releaseDate: "2014-10-01",
        url: "https://publication.com",
        summary: "Description…",
      },
    ],
    skills: [
      {
        name: "Web Development",
        level: "Master",
        keywords: ["HTML", "CSS", "JavaScript"],
      },
    ],
    languages: [
      {
        language: "English",
        fluency: "Native speaker",
      },
    ],
    interests: [
      {
        name: "Wildlife",
        keywords: ["Ferrets", "Unicorns"],
      },
    ],
    references: [
      {
        name: "Jane Doe",
        reference: "Reference…",
      },
    ],
    projects: [
      {
        name: "Project",
        startDate: "2019-01-01",
        endDate: "2021-01-01",
        description: "Description...",
        highlights: ["Won award at AIHacks 2016"],
        url: "https://project.com/",
      },
    ],
  },
  null,
  2
);
