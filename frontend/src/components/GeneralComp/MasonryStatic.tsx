import type { PostProps } from "../Post";
import Post from "../Post";
import { useMemo } from "react";

export interface DataSource {
  id: string;
  name: string;
  items: PostProps[];
  color?: string;
}

interface MasonryProps {
  dataSource: DataSource;
  gap?: number;
  minColumnWidth?: number;
  columnCount?: number;
}

function randomSize(): "PORTRAIT" | "SQUARE" {
  return Math.random() > 0.5 ? "PORTRAIT" : "SQUARE";
}

function MasonryStatic({
  dataSource,
  gap = 16,
  minColumnWidth = 280,
  columnCount = 3,
}: MasonryProps) {
  // Distribute items across columns in round-robin fashion
  const columns = useMemo(() => {
    const cols: Array<{
      items: (PostProps & {
        sourceId: string;
        sourceName: string;
        sourceColor?: string;
        size: "PORTRAIT" | "SQUARE";
      })[];
    }> = Array.from({ length: columnCount }, () => ({ items: [] }));

    const processedItems = dataSource.items.map((item) => ({
      ...item,
      sourceId: dataSource.id,
      sourceName: dataSource.name,
      sourceColor: dataSource.color,
      size: randomSize(),
    }));

    // Distribute items across columns in round-robin fashion
    let currentColumn = 0;
    processedItems.forEach((item) => {
      cols[currentColumn].items.push(item);
      currentColumn = (currentColumn + 1) % columnCount;
    });

    return cols;
  }, [dataSource, columnCount]);

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
              flex: "1 1 auto",
              gap: `${gap}px`,
            }}
          >
            {/* Posts using the Post component */}
            {column.items.map((item, idx) => (
              <Post
                key={`${item.sourceId}-${idx}`}
                imgLink={item.imgLink}
                size={item.size}
                songName={item.songName}
                artistName={item.artistName}
                background={item.background}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasonryStatic;
