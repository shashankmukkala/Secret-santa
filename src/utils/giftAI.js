export async function generateGiftIdeas(participant) {
  try {
    const res = await fetch("/api/groqsuggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participant),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.suggestions || ["No suggestions available"];
  } catch (error) {
    console.error(error);
    return [`Fetch error: ${error.message}`];
  }
}