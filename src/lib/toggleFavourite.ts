export const toggleFavorite = (characterId: number | string) => {
  const favoritesCookie = document.cookie.split('; ').find(row => row.startsWith('favorites='));
  const favorites = favoritesCookie ? decodeURIComponent(favoritesCookie.split('=')[1]) : '';
  let favoriteIds = favorites ? JSON.parse(favorites) : [];

  if (favoriteIds.includes(characterId)) {
    favoriteIds = favoriteIds.filter((id: string | number) => id !== characterId);
    alert('This item has been removed from favorites');
  } else {
    favoriteIds.push(characterId);
    alert('This item has been added to favorites');
  }

  document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favoriteIds))};path=/;max-age=${60 * 60 * 24 * 365}`;
}

export const isFavorite = (characterId: number | string) => {
  const favoritesCookie = document.cookie.split('; ').find(row => row.startsWith('favorites='));
  const favorites = favoritesCookie ? decodeURIComponent(favoritesCookie.split('=')[1]) : '';
  const favoriteIds = favorites ? JSON.parse(favorites) : [];

  return favoriteIds.includes(characterId);
}