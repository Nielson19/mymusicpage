import type { PostProps } from "../Post";
import Post from "../Post";
import { useMemo } from "react";

interface DataSource {
  id: string;
  name: string;
  items: PostProps[];
  color?: string; // Optional color theme for the column
}

interface MasonryAdvancedProps {
  dataSources: DataSource[];
  columnCount?: number;
  gap?: number;
  minColumnWidth?: number;
  distributionStrategy?: "round-robin" | "fill-columns" | "source-per-column";
}

function MasonryAdvanced({
  dataSources,
  columnCount = 3,
  gap = 16,
  minColumnWidth = 280,
  distributionStrategy = "round-robin",
}: MasonryAdvancedProps) {
  const columns = useMemo(() => {
    const cols: Array<{
      items: (PostProps & {
        sourceId: string;
        sourceName: string;
        sourceColor?: string;
      })[];
      sourceInfo?: DataSource;
    }> = Array.from({ length: columnCount }, () => ({ items: [] }));

    switch (distributionStrategy) {
      case "round-robin":
        // Distribute all items across columns in round-robin fashion
        let currentColumn = 0;
        dataSources.forEach((source) => {
          source.items.forEach((item) => {
            cols[currentColumn].items.push({
              ...item,
              sourceId: source.id,
              sourceName: source.name,
              sourceColor: source.color,
            });
            currentColumn = (currentColumn + 1) % columnCount;
          });
        });
        break;

      case "fill-columns":
        // Fill columns sequentially
        let columnIndex = 0;
        let itemsPerColumn = Math.ceil(
          dataSources.reduce(
            (total, source) => total + source.items.length,
            0
          ) / columnCount
        );

        dataSources.forEach((source) => {
          source.items.forEach((item) => {
            if (
              cols[columnIndex].items.length >= itemsPerColumn &&
              columnIndex < columnCount - 1
            ) {
              columnIndex++;
            }
            cols[columnIndex].items.push({
              ...item,
              sourceId: source.id,
              sourceName: source.name,
              sourceColor: source.color,
            });
          });
        });
        break;

      case "source-per-column":
        // Each data source gets its own column(s)
        dataSources.forEach((source, index) => {
          if (index < columnCount) {
            cols[index] = {
              items: source.items.map((item) => ({
                ...item,
                sourceId: source.id,
                sourceName: source.name,
                sourceColor: source.color,
              })),
              sourceInfo: source,
            };
          }
        });
        break;
    }

    return cols;
  }, [dataSources, columnCount, distributionStrategy]);

  return (
    <div className="w-full px-4">
      <div className="flex justify-center" style={{ gap: `${gap}px` }}>
        {columns.map((column, index) => (
          <div
            key={index}
            className="flex flex-col"
            style={{
              gap: `${gap}px`,
              minWidth: `${minColumnWidth}px`,
              flex: `1 1 ${Math.floor(100 / columnCount)}%`,
            }}
          >
            {/* Column header for source-per-column strategy */}
            {distributionStrategy === "source-per-column" &&
              column.sourceInfo && (
                <div
                  className="text-sm font-medium mb-2 p-2 rounded-lg"
                  style={{
                    backgroundColor: column.sourceInfo.color || "#f3f4f6",
                    color: column.sourceInfo.color ? "#ffffff" : "#374151",
                  }}
                >
                  {column.sourceInfo.name}
                </div>
              )}

            {column.items.map((item, itemIndex) => (
              <div key={`${item.sourceId}-${itemIndex}`} className="relative">
                {/* Source indicator for mixed strategies */}
                {distributionStrategy !== "source-per-column" && (
                  <div
                    className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded-full text-white"
                    style={{ backgroundColor: item.sourceColor || "#6b7280" }}
                  >
                    {item.sourceName}
                  </div>
                )}

                <Post
                  imgLink={item.imgLink}
                  size={item.size}
                  songName={item.songName}
                  artistName={item.artistName}
                  background={item.background}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasonryAdvanced;
