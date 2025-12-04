import type { PostProps } from "../Post";
import Post from "../Post";
import { useMemo, useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  columnCount?: number;
  distributionStrategy?: "round-robin" | "source-per-column" | "fill-columns";
  infiniteScroll?: boolean;
  duplicateCount?: number;
  onPlaylistClick?: (playlistId: string) => void;
  dark?: boolean;
}

function MasonryDynamic({
  dark,
  dataSources,
  gap = 16,
  minColumnWidth = 280,
  columnCount = 3,
  distributionStrategy = "round-robin",
  infiniteScroll = false,
  duplicateCount = 3,
  onPlaylistClick,
}: MasonryAdvancedProps) {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function randomSize(): "PORTRAIT" | "SQUARE" {
    return Math.random() > 0.5 ? "PORTRAIT" : "SQUARE";
  }

  useEffect(() => {
    scrollRefs.current = new Array(columnCount).fill(null);
  }, [columnCount]);

  const duplicateItems = (items: any[]) => {
    if (!infiniteScroll) return items;

    const duplicated = [];
    for (let i = 0; i < duplicateCount; i++) {
      duplicated.push(
        ...items.map((item, index) => ({
          ...item,
          uniqueKey: `${item.sourceId}-${index}-duplicate-${i}`,
        }))
      );
    }
    return duplicated;
  };

  const handleScroll = useCallback(
    (columnIndex: number) => {
      const scrollContainer = scrollRefs.current[columnIndex];
      if (!scrollContainer) return;

      if (infiniteScroll) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrollPercentage > 0.66) {
          const resetPosition = scrollHeight / duplicateCount;
          scrollContainer.scrollTop = resetPosition;
        }
      }
    },
    [infiniteScroll, duplicateCount]
  );

  const columns = useMemo(() => {
    const cols: Array<{
      items: (PostProps & {
        sourceId: string;
        sourceName: string;
        sourceColor?: string;
        size: "PORTRAIT" | "SQUARE";
        uniqueKey?: string;
      })[];
      sourceInfo?: DataSource;
    }> = Array.from({ length: columnCount }, () => ({ items: [] }));

    const processItems = (items: any[]) => {
      const processedItems = items.map((item) => ({
        ...item,
        size: item.size ?? randomSize(),
      }));
      return infiniteScroll ? duplicateItems(processedItems) : processedItems;
    };

    switch (distributionStrategy) {
      case "round-robin":
        let currentColumn = 0;
        dataSources.forEach((source) => {
          const processedItems = processItems(
            source.items.map((item) => ({
              ...item,
              sourceId: source.id,
              sourceName: source.name,
              sourceColor: source.color,
            }))
          );
          processedItems.forEach((item) => {
            cols[currentColumn].items.push(item);
            currentColumn = (currentColumn + 1) % columnCount;
          });
        });
        break;

      case "fill-columns":
        let columnIndex = 0;
        const totalItems = dataSources.reduce(
          (total, source) => total + source.items.length,
          0
        );
        const baseItemsPerColumn = Math.ceil(totalItems / columnCount);
        const itemsPerColumn = infiniteScroll
          ? baseItemsPerColumn * duplicateCount
          : baseItemsPerColumn;

        dataSources.forEach((source) => {
          const processedItems = processItems(
            source.items.map((item) => ({
              ...item,
              sourceId: source.id,
              sourceName: source.name,
              sourceColor: source.color,
            }))
          );

          processedItems.forEach((item) => {
            if (
              cols[columnIndex].items.length >= itemsPerColumn &&
              columnIndex < columnCount - 1
            ) {
              columnIndex++;
            }
            cols[columnIndex].items.push(item);
          });
        });
        break;

      case "source-per-column":
      default:
        return dataSources.slice(0, columnCount).map((source) => ({
          items: processItems(
            source.items.map((item) => ({
              ...item,
              sourceId: source.id,
              sourceName: source.name,
              sourceColor: source.color,
            }))
          ),
          sourceInfo: source,
        }));
    }

    return cols;
  }, [
    dataSources,
    columnCount,
    distributionStrategy,
    infiniteScroll,
    duplicateCount,
  ]);

  // --- RETURN: mobile shows one full column at a time (swipe), desktop behaves as before
  return (
    <div
      className={`w-full flex justify-center px-4 ${
        dark
          ? "text-white transition-colors ease-in-out duration-200"
          : "text-gray-800 transition-colors ease-in-out duration-200"
      }`}
      style={{ padding: `${gap}px 0` }}
    >
      <div className="w-full" style={{ maxWidth: "100%", padding: 0 }}>
        {/* Column wrapper:
            - mobile (isMobile): horizontal scrolling of columns, snap between whole columns
            - desktop: wrap & center columns (no horizontal overflow)
        */}
        <div
          className={`
            flex
            ${
              isMobile
                ? "flex-row overflow-x-auto snap-x snap-mandatory -mx-2"
                : "flex-wrap justify-center"
            }
          `}
          style={{
            gap: `${gap}px`,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {columns.map((column, index) => (
            <div
              key={index}
              className={
                isMobile ? "flex-none w-full snap-start px-2" : "flex flex-col"
              }
              style={{
                minWidth: isMobile ? "100vw" : `${minColumnWidth}px`,
                maxWidth: isMobile ? "100vw" : `${minColumnWidth * 1.2}px`,
                flex: "1 1 auto",
                maxHeight: "70vh",
              }}
            >
              {distributionStrategy === "source-per-column" &&
                column.sourceInfo && (
                  <div
                    onClick={() => onPlaylistClick?.(column.sourceInfo!.id)} // NAVIGATION CLICK
                    className={`
                    text-md font-medium mb-2 p-2 cursor-pointer bg-transparent
                    transition-colors duration-500 shrink-0 justify-center flex items-center
                    hover:brightness-80 border-b-1 mb-8
                  `}
                  >
                    {column.sourceInfo.name}
                  </div>
                )}

              <div
                ref={(el) => {
                  scrollRefs.current[index] = el;
                }}
                className={`flex flex-col flex-1 overflow-y-auto scrollbar-none ${
                  isMobile ? "items-center" : ""
                }`}
                style={{ gap: `${gap}px` }}
                onScroll={() => handleScroll(index)}
              >
                {column.items.map((item, idx) => (
                  <div
                    key={item.uniqueKey || `${item.sourceId}-${idx}`}
                    className="relative"
                  >
                    {distributionStrategy !== "source-per-column" &&
                      column.sourceInfo && (
                        <div
                          onClick={() =>
                            navigate(
                              `/playlist/${encodeURIComponent(
                                column.sourceInfo!.id
                              )}`,
                              {
                                state: { playlist: column.sourceInfo },
                              }
                            )
                          }
                          className="absolute top-8 right-8 z-20 px-2 py-1 text-xs rounded-full cursor-pointer"
                          style={{
                            backgroundColor: item.sourceColor || "#6b7280",
                          }}
                        >
                          {column.sourceInfo.name}
                        </div>
                      )}

                    <Post
                      userID=""
                      songID=""
                      imgLink={item.imgLink}
                      size={item.size}
                      songName={item.songName}
                      artistName={item.artistName}
                      background={item.background || item.imgLink}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MasonryDynamic;
