export default async function fetchFromApi(url: string){
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log("Fetching from API:", process.env.NEXT_PUBLIC_API_URL + url);
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
    
  } catch (error) {
    console.error('Error fetching people data:', error);

    return [];
  }
}