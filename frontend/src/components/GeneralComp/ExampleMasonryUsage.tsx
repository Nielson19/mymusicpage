import Masonry from "./Masonry";
import MasonryAdvanced from "./MasonryAdvanced";
import type { PostProps } from "../Post";

// Example usage in a page component
function ExampleMasonryUsage() {
  // Example data sources
  const spotifyData: PostProps[] = [
    {
      imgLink: "https://example.com/spotify1.jpg",
      size: "SQUARE",
      songName: "Song from Spotify",
      artistName: "Spotify Artist",
    },
    {
      imgLink: "https://example.com/spotify2.jpg",
      size: "PORTRAIT",
      songName: "Another Spotify Song",
      artistName: "Another Artist",
    },
  ];

  const appleMusicData: PostProps[] = [
    {
      imgLink: "https://example.com/apple1.jpg",
      size: "SQUARE",
      songName: "Apple Music Song",
      artistName: "Apple Artist",
    },
  ];

  const userGeneratedData: PostProps[] = [
    {
      imgLink: "https://example.com/user1.jpg",
      size: "PORTRAIT",
      songName: "User Upload",
      artistName: "Local Artist",
    },
  ];

  // Method 1: Using basic Masonry with predefined columns
  const basicColumns = [
    {
      id: "spotify",
      items: spotifyData,
      dataSource: "Spotify",
    },
    {
      id: "apple",
      items: appleMusicData,
      dataSource: "Apple Music",
    },
    {
      id: "user",
      items: userGeneratedData,
      dataSource: "User Generated",
    },
  ];

  // Method 2: Using advanced Masonry with multiple distribution strategies
  const dataSources = [
    {
      id: "spotify",
      name: "Spotify",
      items: spotifyData,
      color: "#1DB954",
    },
    {
      id: "apple",
      name: "Apple Music",
      items: appleMusicData,
      color: "#FA57C1",
    },
    {
      id: "user",
      name: "User Generated",
      items: userGeneratedData,
      color: "#FF6B6B",
    },
  ];

  return (
    <div className="space-y-12 py-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Basic Masonry - Independent Columns
        </h2>
        <Masonry columns={basicColumns} gap={20} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Advanced Masonry - Round Robin
        </h2>
        <MasonryAdvanced
          dataSources={dataSources}
          columnCount={3}
          distributionStrategy="round-robin"
          gap={20}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Advanced Masonry - Source Per Column
        </h2>
        <MasonryAdvanced
          dataSources={dataSources}
          columnCount={3}
          distributionStrategy="source-per-column"
          gap={20}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Advanced Masonry - Fill Columns
        </h2>
        <MasonryAdvanced
          dataSources={dataSources}
          columnCount={2}
          distributionStrategy="fill-columns"
          gap={20}
        />
      </section>
    </div>
  );
}

export default ExampleMasonryUsage;
