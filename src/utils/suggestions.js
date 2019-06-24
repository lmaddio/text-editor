export function getSuggestionsUrl(word) {
  return word ? 'https://api.datamuse.com/words?max=4&ml='.concat(word) : '';
}

export async function formatResponse(response) {
  const data = await response.json();
  return data.map(({ word }) => word);
}