import { useState, useEffect } from 'react';
import type { PostProps } from '../components/Post';

interface DataSource {
  id: string;
  name: string;
  items: PostProps[];
  color?: string;
}

interface UseMultiSourceMasonryOptions {
  fetchSpotifyData?: () => Promise<PostProps[]>;
  fetchAppleMusicData?: () => Promise<PostProps[]>;
  fetchUserData?: () => Promise<PostProps[]>;
  fetchCustomData?: (sourceId: string) => Promise<PostProps[]>;
}

export function useMultiSourceMasonry(options: UseMultiSourceMasonryOptions) {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sources: DataSource[] = [];
      
      // Fetch Spotify data
      if (options.fetchSpotifyData) {
        try {
          const spotifyItems = await options.fetchSpotifyData();
          sources.push({
            id: 'spotify',
            name: 'Spotify',
            items: spotifyItems,
            color: '#1DB954'
          });
        } catch (err) {
          console.error('Failed to fetch Spotify data:', err);
        }
      }
      
      // Fetch Apple Music data
      if (options.fetchAppleMusicData) {
        try {
          const appleItems = await options.fetchAppleMusicData();
          sources.push({
            id: 'apple',
            name: 'Apple Music',
            items: appleItems,
            color: '#FA57C1'
          });
        } catch (err) {
          console.error('Failed to fetch Apple Music data:', err);
        }
      }
      
      // Fetch User data
      if (options.fetchUserData) {
        try {
          const userItems = await options.fetchUserData();
          sources.push({
            id: 'user',
            name: 'Your Library',
            items: userItems,
            color: '#FF6B6B'
          });
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      }
      
      setDataSources(sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addDataSource = (source: DataSource) => {
    setDataSources(prev => [...prev, source]);
  };

  const updateDataSource = (sourceId: string, newItems: PostProps[]) => {
    setDataSources(prev => 
      prev.map(source => 
        source.id === sourceId 
          ? { ...source, items: newItems }
          : source
      )
    );
  };

  const removeDataSource = (sourceId: string) => {
    setDataSources(prev => prev.filter(source => source.id !== sourceId));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    dataSources,
    loading,
    error,
    refetch: fetchAllData,
    addDataSource,
    updateDataSource,
    removeDataSource
  };
}

// Example API functions (replace with your actual API calls)
export const exampleAPIFunctions = {
  fetchSpotifyData: async (): Promise<PostProps[]> => {
    // Replace with actual Spotify API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return [
      {
        imgLink: 'https://via.placeholder.com/300x300/1DB954/white?text=Spotify+1',
        size: 'SQUARE',
        songName: 'Spotify Song 1',
        artistName: 'Spotify Artist 1'
      },
      {
        imgLink: 'https://via.placeholder.com/300x400/1DB954/white?text=Spotify+2',
        size: 'PORTRAIT',
        songName: 'Spotify Song 2',
        artistName: 'Spotify Artist 2'
      }
    ];
  },

  fetchAppleMusicData: async (): Promise<PostProps[]> => {
    // Replace with actual Apple Music API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        imgLink: 'https://via.placeholder.com/300x300/FA57C1/white?text=Apple+1',
        size: 'SQUARE',
        songName: 'Apple Song 1',
        artistName: 'Apple Artist 1'
      }
    ];
  },

  fetchUserData: async (): Promise<PostProps[]> => {
    // Replace with actual user library API call
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      {
        imgLink: 'https://via.placeholder.com/300x400/FF6B6B/white?text=User+1',
        size: 'PORTRAIT',
        songName: 'User Song 1',
        artistName: 'Local Artist'
      },
      {
        imgLink: 'https://via.placeholder.com/300x300/FF6B6B/white?text=User+2',
        size: 'SQUARE',
        songName: 'User Song 2',
        artistName: 'Independent Artist'
      }
    ];
  }
};