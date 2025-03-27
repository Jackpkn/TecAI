"use server";

export default async function startGeneration(input: string) {
  if (!input) return;

  console.log("Processing input on the server:", input);

  try {
    // Simulating API call or backend processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Generation complete for:", input);
  } catch (error) {
    console.error("Error processing request:", error);
  }
}
