import { useState } from "react";
import MasonryAdvanced from "../components/GeneralComp/MasonryAdvanced";
import {
  useMultiSourceMasonry,
  exampleAPIFunctions,
} from "../hooks/useMultiSourceMasonry";

function MusicDashboard() {
  const [distributionStrategy, setDistributionStrategy] = useState<
    "round-robin" | "fill-columns" | "source-per-column"
  >("round-robin");
  const [columnCount, setColumnCount] = useState(3);

  const { dataSources, loading, error, refetch } = useMultiSourceMasonry({
    fetchSpotifyData: exampleAPIFunctions.fetchSpotifyData,
    fetchAppleMusicData: exampleAPIFunctions.fetchAppleMusicData,
    fetchUserData: exampleAPIFunctions.fetchUserData,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your music collections...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Controls */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Music Collections</h1>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Layout Strategy
              </label>
              <select
                value={distributionStrategy}
                onChange={(e) => setDistributionStrategy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="round-robin">Mixed Layout (Round Robin)</option>
                <option value="source-per-column">Source Per Column</option>
                <option value="fill-columns">Fill Columns</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Number of Columns
              </label>
              <select
                value={columnCount}
                onChange={(e) => setColumnCount(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
                <option value={5}>5 Columns</option>
              </select>
            </div>

            <button
              onClick={refetch}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh All Sources
            </button>
          </div>

          {/* Data source info */}
          <div className="mt-4 flex flex-wrap gap-3">
            {dataSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: source.color }}
              >
                <span>{source.name}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {source.items.length} items
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        {dataSources.length > 0 ? (
          <MasonryAdvanced
            dataSources={dataSources}
            columnCount={columnCount}
            distributionStrategy={distributionStrategy}
            gap={24}
            minColumnWidth={300}
          />
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No music data available
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicDashboard;
