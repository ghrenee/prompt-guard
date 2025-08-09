// Frontend JavaScript for the Prompt Guard MVP.
// Sends the user's prompt to the backend and displays the result.

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('promptInput');
  const analyzeButton = document.getElementById('analyzeButton');
  const resultContainer = document.getElementById('result');
  const flawSpan = document.getElementById('flaw');
  const improvedPre = document.getElementById('improved');

  analyzeButton.addEventListener('click', async () => {
    const prompt = promptInput.value;

    // Basic client-side validation to avoid sending empty prompts
    if (!prompt.trim()) {
      alert('Please enter a prompt to analyze.');
      return;
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      flawSpan.textContent = data.flaw;
      improvedPre.textContent = data.improved_prompt;
      resultContainer.classList.remove('hidden');
    } catch (err) {
      console.error('Failed to analyze prompt:', err);
      alert('An error occurred while contacting the server. See the console for details.');
    }
  });
});
