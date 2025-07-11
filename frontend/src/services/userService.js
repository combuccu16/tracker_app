const BASE_URL = 'http://localhost:5000/api/user'; // adjust port if needed

// Include credentials for session handling
const fetchWithSession = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch');
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return { ok: false, error: error.message };
  }
};
// Get user's coin balance
export const getUserCoins = () => fetchWithSession(`${BASE_URL}/coins`);

// Get user's name (first + last)
export const getUserName = () => fetchWithSession(`${BASE_URL}/name`);

// Get owned items
export const getOwnedAnimations = () => fetchWithSession(`${BASE_URL}/owned/animations`);
export const getOwnedIdioms = () => fetchWithSession(`${BASE_URL}/owned/idioms`);
export const getOwnedCharacters = () => fetchWithSession(`${BASE_URL}/owned/characters`);

// Get equipped items
export const getEquippedAnimation = () => fetchWithSession(`${BASE_URL}/equipped/animation`);
export const getEquippedCharacter = () => fetchWithSession(`${BASE_URL}/equipped/character`);
export const getEquippedIdiom = () => fetchWithSession(`${BASE_URL}/equipped/idiom`);
