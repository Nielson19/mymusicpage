import type { DataSource } from "../components/GeneralComp/MasonryAdvanced";

// Example 1: Static data sources for different music categories
export const musicDataSources: DataSource[] = [
  {
    id: "trending",
    name: "Trending Now",
    color: "#ff6b6b",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=1",
        size: "SQUARE",
        songName: "Blinding Lights",
        artistName: "The Weeknd"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=2",
        size: "PORTRAIT", 
        songName: "Levitating",
        artistName: "Dua Lipa"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=3",
        size: "SQUARE",
        songName: "Good 4 U",
        artistName: "Olivia Rodrigo"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=4",
        size: "PORTRAIT",
        songName: "Stay",
        artistName: "The Kid LAROI & Justin Bieber"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=101",
        size: "SQUARE",
        songName: "Anti-Hero",
        artistName: "Taylor Swift"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=102",
        size: "PORTRAIT",
        songName: "As It Was",
        artistName: "Harry Styles"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=103",
        size: "SQUARE",
        songName: "Bad Habit",
        artistName: "Steve Lacy"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=104",
        size: "PORTRAIT",
        songName: "Flowers",
        artistName: "Miley Cyrus"
      }
    ]
  },
  {
    id: "rock",
    name: "Rock Classics",
    color: "#4ecdc4",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=5",
        size: "SQUARE",
        songName: "Bohemian Rhapsody",
        artistName: "Queen"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=6",
        size: "PORTRAIT",
        songName: "Stairway to Heaven",
        artistName: "Led Zeppelin"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=7",
        size: "SQUARE",
        songName: "Hotel California",
        artistName: "Eagles"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=105",
        size: "PORTRAIT",
        songName: "Sweet Child O' Mine",
        artistName: "Guns N' Roses"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=106",
        size: "SQUARE",
        songName: "Don't Stop Believin'",
        artistName: "Journey"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=107",
        size: "PORTRAIT",
        songName: "Back in Black",
        artistName: "AC/DC"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=108",
        size: "SQUARE",
        songName: "Thunderstruck",
        artistName: "AC/DC"
      }
    ]
  },
  {
    id: "electronic",
    name: "Electronic Vibes",
    color: "#45b7d1",
    items: [
      {
        imgLink: "https://picsum.photos/300/400?random=8",
        size: "PORTRAIT",
        songName: "Midnight City",
        artistName: "M83"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=9",
        size: "SQUARE",
        songName: "Strobe",
        artistName: "Deadmau5"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=10",
        size: "PORTRAIT",
        songName: "Scary Monsters and Nice Sprites",
        artistName: "Skrillex"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=109",
        size: "SQUARE",
        songName: "Levels",
        artistName: "Avicii"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=110",
        size: "PORTRAIT",
        songName: "Clarity",
        artistName: "Zedd ft. Foxes"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=111",
        size: "SQUARE",
        songName: "Titanium",
        artistName: "David Guetta ft. Sia"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=112",
        size: "PORTRAIT",
        songName: "Bangarang",
        artistName: "Skrillex"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=113",
        size: "SQUARE",
        songName: "Animals",
        artistName: "Martin Garrix"
      }
    ]
  },
  {
    id: "jazz",
    name: "Jazz Standards",
    color: "#f39c12",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=11",
        size: "SQUARE",
        songName: "Take Five",
        artistName: "Dave Brubeck"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=12",
        size: "PORTRAIT",
        songName: "Kind of Blue",
        artistName: "Miles Davis"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=114",
        size: "SQUARE",
        songName: "What a Wonderful World",
        artistName: "Louis Armstrong"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=115",
        size: "PORTRAIT",
        songName: "Autumn Leaves",
        artistName: "Bill Evans"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=116",
        size: "SQUARE",
        songName: "Fly Me to the Moon",
        artistName: "Frank Sinatra"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=117",
        size: "PORTRAIT",
        songName: "Giant Steps",
        artistName: "John Coltrane"
      }
    ]
  },
  {
    id: "hiphop",
    name: "Hip Hop Hits",
    color: "#9b59b6",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=120",
        size: "SQUARE",
        songName: "God's Plan",
        artistName: "Drake"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=121",
        size: "PORTRAIT",
        songName: "HUMBLE.",
        artistName: "Kendrick Lamar"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=122",
        size: "SQUARE",
        songName: "Sicko Mode",
        artistName: "Travis Scott"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=123",
        size: "PORTRAIT",
        songName: "Old Town Road",
        artistName: "Lil Nas X"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=124",
        size: "SQUARE",
        songName: "Lose Yourself",
        artistName: "Eminem"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=125",
        size: "PORTRAIT",
        songName: "Stronger",
        artistName: "Kanye West"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=126",
        size: "SQUARE",
        songName: "Hotline Bling",
        artistName: "Drake"
      }
    ]
  },
  {
    id: "indie",
    name: "Indie Favorites",
    color: "#e74c3c",
    items: [
      {
        imgLink: "https://picsum.photos/300/400?random=130",
        size: "PORTRAIT",
        songName: "Electric Feel",
        artistName: "MGMT"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=131",
        size: "SQUARE",
        songName: "Somebody That I Used to Know",
        artistName: "Gotye"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=132",
        size: "PORTRAIT",
        songName: "Pumped Up Kicks",
        artistName: "Foster the People"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=133",
        size: "SQUARE",
        songName: "Mr. Brightside",
        artistName: "The Killers"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=134",
        size: "PORTRAIT",
        songName: "Float On",
        artistName: "Modest Mouse"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=135",
        size: "SQUARE",
        songName: "Two Door Cinema Club",
        artistName: "What You Know"
      }
    ]
  },
  {
    id: "pop",
    name: "Pop Anthems",
    color: "#2ecc71",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=140",
        size: "SQUARE",
        songName: "Shape of You",
        artistName: "Ed Sheeran"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=141",
        size: "PORTRAIT",
        songName: "Uptown Funk",
        artistName: "Mark Ronson ft. Bruno Mars"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=142",
        size: "SQUARE",
        songName: "Can't Stop the Feeling!",
        artistName: "Justin Timberlake"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=143",
        size: "PORTRAIT",
        songName: "Shake It Off",
        artistName: "Taylor Swift"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=144",
        size: "SQUARE",
        songName: "Happy",
        artistName: "Pharrell Williams"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=145",
        size: "PORTRAIT",
        songName: "Roar",
        artistName: "Katy Perry"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=146",
        size: "SQUARE",
        songName: "Counting Stars",
        artistName: "OneRepublic"
      }
    ]
  },
  {
    id: "rnb",
    name: "R&B Soul",
    color: "#8e44ad",
    items: [
      {
        imgLink: "https://picsum.photos/300/400?random=150",
        size: "PORTRAIT",
        songName: "Golden",
        artistName: "Jill Scott"
      },
      {
        imgLink: "https://picsum.photos/300/300?random=151",
        size: "SQUARE",
        songName: "Crazy",
        artistName: "Gnarls Barkley"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=152",
        size: "PORTRAIT",
        songName: "Best Part",
        artistName: "Daniel Caesar ft. H.E.R."
      },
      {
        imgLink: "https://picsum.photos/300/300?random=153",
        size: "SQUARE",
        songName: "Adorn",
        artistName: "Miguel"
      },
      {
        imgLink: "https://picsum.photos/300/400?random=154",
        size: "PORTRAIT",
        songName: "Come Through and Chill",
        artistName: "Miguel ft. J. Cole"
      }
    ]
  }
];

// Example 2: Function to create data sources from API response
export function createDataSourcesFromAPI(apiData: any[]): DataSource[] {
  return apiData.map((playlist, index) => ({
    id: playlist.id || `playlist-${index}`,
    name: playlist.name || `Playlist ${index + 1}`,
    color: playlist.color || getRandomColor(),
    items: playlist.songs?.map((song: any) => ({
      imgLink: song.coverImage || song.albumArt || "https://picsum.photos/300/300",
      size: Math.random() > 0.5 ? "SQUARE" : "PORTRAIT" as "SQUARE" | "PORTRAIT",
      songName: song.title || song.name || "Unknown Song",
      artistName: song.artist || "Unknown Artist",
      background: song.background || song.coverImage || song.albumArt
    })) || []
  }));
}

// Example 3: Helper function for random colors
function getRandomColor(): string {
  const colors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#f39c12", 
    "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Example 4: Function to combine multiple data sources
export function combineDataSources(...sources: DataSource[][]): DataSource[] {
  return sources.flat();
}

// Example 5: User's personal playlists structure
export const userPlaylists: DataSource[] = [
  {
    id: "favorites",
    name: "My Favorites",
    color: "#e74c3c",
    items: [
      {
        imgLink: "https://picsum.photos/300/300?random=20",
        size: "SQUARE",
        songName: "Your favorite song 1",
        artistName: "Your favorite artist 1"
      }
    ]
  },
  {
    id: "recently-played",
    name: "Recently Played",
    color: "#9b59b6",
    items: [
      {
        imgLink: "https://picsum.photos/300/400?random=21",
        size: "PORTRAIT",
        songName: "Last played song",
        artistName: "Recent artist"
      }
    ]
  }
];