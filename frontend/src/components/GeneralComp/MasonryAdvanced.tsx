import type { PostProps } from "../Post";
import Post from "../Post";
import { useMemo } from "react";

export interface DataSource {
  id: string;
  name: string;
  items: PostProps[];
  color?: string;
}

interface MasonryAdvancedProps {
  dataSources: DataSource[];
  gap?: number;
  minColumnWidth?: number;
}

function randomSize(): "PORTRAIT" | "SQUARE" {
  return Math.random() > 0.5 ? "PORTRAIT" : "SQUARE";
}

function MasonryAdvanced({
  dataSources,
  gap = 16,
  minColumnWidth = 280,
}: MasonryAdvancedProps) {
  // Prepare columns: one playlist per column
  const columns = useMemo(() => {
    return dataSources.map((source) => ({
      items: source.items.map((item) => ({
        ...item,
        size: randomSize(),
        sourceId: source.id,
        sourceName: source.name,
        sourceColor: source.color,
      })),
      sourceInfo: source,
    }));
  }, [dataSources]);

  return (
    <div
      className="w-full flex justify-center px-4"
      style={{ padding: `${gap}px 0` }}
    >
      <div
        className="flex justify-center flex-wrap"
        style={{ gap: `${gap}px`, maxWidth: "100%" }}
      >
        {columns.map((column, index) => (
          <div
            key={index}
            className="flex flex-col"
            style={{
              minWidth: `${minColumnWidth}px`,
              maxWidth: `${minColumnWidth * 1.2}px`,
              gap: `${gap}px`,
              flex: "1 1 auto",
            }}
          >
            {/* Playlist header with hover */}
            {column.sourceInfo && (
              <div
                className={`
                  text-sm font-medium mb-2 p-2 rounded-lg cursor-pointer 
                  transition-colors duration-300
                  ${column.sourceInfo.color ? "text-white" : "text-gray-700"}
                  hover:brightness-90
                `}
                style={{
                  backgroundColor: column.sourceInfo.color || "#f3f4f6",
                }}
              >
                {column.sourceInfo.name}
              </div>
            )}

            {/* Posts */}
            {column.items.map((item, idx) => (
              <div
                key={`${item.sourceId}-${idx}`}
                className="rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                style={{
                  aspectRatio: item.size === "PORTRAIT" ? "3 / 4" : "1 / 1",
                  backgroundColor: item.background || "#f3f4f6",
                }}
              >
                <img
                  src={item.imgLink}
                  alt={item.songName}
                  className="w-full h-full object-cover"
                />
                <div className="p-2">
                  <p className="font-medium">{item.songName}</p>
                  <p className="text-sm text-gray-500">{item.artistName}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasonryAdvanced;
