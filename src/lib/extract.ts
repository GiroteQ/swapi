export const extractIdFromMovieUrl = (url: string) => {
  const parts = url.split('/');
  const idString = parts.filter(part => part !== '').pop();

  return Number(idString);
}