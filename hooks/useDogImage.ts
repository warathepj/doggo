import { useState, useEffect } from 'react';

interface DogApiResponse {
  message: string;
  status: string;
}

export function useDogImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBreed, setCurrentBreed] = useState<string | null>(null);

  const fetchRandomDog = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data: DogApiResponse = await response.json();
      
      if (data.status === 'success') {
        setImageUrl(data.message);
        // Extract breed from the response URL (e.g., "terrier-tibetan" from the URL)
        const breed = data.message.split('/breeds/')[1].split('/')[0];
        setCurrentBreed(breed);
        console.log('Dog breed:', breed);
      } else {
        setError('Failed to fetch dog image');
      }
    } catch (err) {
      setError('Error fetching dog image');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDog();
  }, []);

  return { imageUrl, isLoading, error, refetch: fetchRandomDog, currentBreed };
}
