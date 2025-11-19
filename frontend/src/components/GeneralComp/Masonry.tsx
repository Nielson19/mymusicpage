import type { PostProps } from "../Post";
import Post from "../Post";

interface ColumnData {
  id: string;
  items: PostProps[];
  dataSource?: string; // Optional identifier for the data source
}

interface MasonryProps {
  columns: ColumnData[];
  gap?: number;
  minColumnWidth?: number;
}

function Masonry({ columns, gap = 16, minColumnWidth = 280 }: MasonryProps) {
  const columnCount = columns.length;

  return (
    <div
      className="flex justify-center w-full px-4"
      style={{ gap: `${gap}px` }}
    >
      {columns.map((column, index) => (
        <div
          key={column.id || index}
          className="flex flex-col"
          style={{
            gap: `${gap}px`,
            minWidth: `${minColumnWidth}px`,
            flex: `1 1 ${Math.floor(100 / columnCount)}%`,
          }}
        >
          {/* Optional column header */}
          {column.dataSource && (
            <div className="text-sm text-gray-500 font-medium mb-2">
              {column.dataSource}
            </div>
          )}

          {column.items.map((item, itemIndex) => (
            <Post
              key={`${column.id}-${itemIndex}`}
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
  );
}

export default Masonry;
