export async function sendMessage(message: string, sessionId: string, token: string) {
  const response = await fetch("https://mindfullai.onrender.com/api/chat/message/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to get response");
  }

  return await response.json(); // { reply: "Gemini's reply", session_id: "..." }
}
