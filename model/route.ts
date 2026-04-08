import { therapyEngine } from "./therapyEngine";

export async function POST(req: Request) {

  const { message } = await req.json();

  const result = therapyEngine(message);

  return Response.json(result);
}