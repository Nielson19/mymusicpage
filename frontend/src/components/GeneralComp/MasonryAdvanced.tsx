import type { PostProps } from "../Post";
import Post from "../Post";
import { useMemo, useEffect, useRef, useCallback } from "react";

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
  autoScroll?: boolean;
  autoScrollSpeed?: number;
  pauseOnHover?: boolean;
}

function randomSize(): "PORTRAIT" | "SQUARE" {
  return Math.random() > 0.5 ? "PORTRAIT" : "SQUARE";
}

/**
 * MasonryAdvanced Component
 *
 * A flexible masonry layout component that displays music posts in multiple columns with independent scrolling.
 * Supports different distribution strategies for organizing content from multiple data sources.
 *
 * @param {DataSource[]} dataSources - Array of data sources containing music/post items. Each source represents
 *                                     a different playlist or category (e.g., "Rock Classics", "Jazz Standards").
 *                                     Each DataSource contains:
 *                                     - id: unique identifier
 *                                     - name: display name for the source
 *                                     - items: array of PostProps (songs/posts)
 *                                     - color: optional hex color for theming
 *
 * @param {number} [gap=16] - Space between columns and items in pixels. Controls both horizontal
 *                            spacing between columns and vertical spacing between posts within columns.
 *
 * @param {number} [minColumnWidth=280] - Minimum width for each column in pixels. Ensures columns
 *                                        don't become too narrow on smaller screens while maintaining
 *                                        responsive behavior.
 *
 * @param {number} [columnCount=3] - Number of columns to display. Determines how many vertical columns
 *                                   the masonry layout will have. Works differently based on distribution strategy:
 *                                   - "source-per-column": Shows first N data sources as separate columns
 *                                   - "round-robin": Distributes all items evenly across N columns
 *                                   - "fill-columns": Fills N columns sequentially
 *
 * @param {"round-robin" | "source-per-column" | "fill-columns"} [distributionStrategy="round-robin"]
 *        Controls how items from data sources are distributed across columns:
 *
 *        - "source-per-column": Each data source gets its own dedicated column. Shows playlist headers
 *                               with source colors. Best for displaying distinct categories/playlists.
 *
 *        - "round-robin": Items from all sources are mixed and distributed evenly across columns in
 *                        alternating fashion. Creates balanced columns with diverse content. Shows
 *                        source tags on individual items.
 *
 *        - "fill-columns": Fills columns sequentially until reaching target capacity, then moves to
 *                         next column. Creates more balanced column heights. Shows source tags on items.
 *
 * @param {boolean} [infiniteScroll=false] - Enables infinite scrolling by duplicating content multiple times.
 *                                          When enabled, creates seamless looping effect that restarts content
 *                                          when reaching the end. Automatically handles scroll position reset.
 *
 * @param {number} [duplicateCount=3] - Number of times to duplicate the content for infinite scroll.
 *                                     Higher values provide smoother infinite scrolling but use more memory.
 *                                     Only applies when infiniteScroll is enabled.
 *
 * @param {boolean} [autoScroll=false] - Enables automatic scrolling animation. Columns will automatically
 *                                      scroll in alternating directions (up/down/up/etc). Pauses when user
 *                                      interacts and resumes after 5 seconds of inactivity.
 *
 * @param {number} [autoScrollSpeed=1] - Speed of automatic scrolling animation in pixels per frame.
 *                                      Higher values = faster scrolling. Recommended range: 0.5-3.
 *
 * @param {boolean} [pauseOnHover=true] - Whether to pause auto-scroll when hovering over columns.
 *                                       Also pauses on manual scroll with 5-second resume timer.
 *
 * Features:
 * - Independent column scrolling (each column scrolls separately)
 * - Hidden scrollbars for clean appearance
 * - Responsive design with flex-wrap
 * - Hover effects and transitions from Post component
 * - Random SQUARE/PORTRAIT sizing for visual variety
 * - Source identification via headers or tags
 * - Color-coded theming based on data source colors
 * - Optional infinite scrolling with seamless content looping
 * - Automatic scrolling with alternating directions per column
 * - Smart pause/resume on user interaction
 *
 * @example
 * // Display playlists as separate columns
 * <MasonryAdvanced
 *   dataSources={musicPlaylists}
 *   distributionStrategy="source-per-column"
 *   columnCount={4}
 *   gap={20}
 * />
 *
 * @example
 * // Auto-scrolling columns with infinite scroll
 * <MasonryAdvanced
 *   dataSources={musicPlaylists}
 *   distributionStrategy="round-robin"
 *   columnCount={3}
 *   infiniteScroll={true}
 *   autoScroll={true}
 *   autoScrollSpeed={1.5}
 *   pauseOnHover={true}
 * />
 */

function MasonryAdvanced({
  dataSources,
  gap = 16,
  minColumnWidth = 280,
  columnCount = 3,
  distributionStrategy = "round-robin",
  infiniteScroll = false,
  duplicateCount = 3,
  autoScroll = false,
  autoScrollSpeed = 1,
  pauseOnHover = true,
}: MasonryAdvancedProps) {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameIds = useRef<number[]>([]);
  const isScrollingManually = useRef<boolean[]>([]);
  const scrollTimeouts = useRef<number[]>([]);
  const isHovering = useRef<boolean[]>([]);
  const scrollDirections = useRef<boolean[]>([]); // true = down, false = up

  // Initialize refs
  useEffect(() => {
    scrollRefs.current = new Array(columnCount).fill(null);
    animationFrameIds.current = new Array(columnCount).fill(0);
    isScrollingManually.current = new Array(columnCount).fill(false);
    scrollTimeouts.current = new Array(columnCount).fill(0);
    isHovering.current = new Array(columnCount).fill(false);
    // Initialize alternating scroll directions: down, up, down, up...
    scrollDirections.current = new Array(columnCount)
      .fill(false)
      .map((_, index) => index % 2 === 0); // true = down, false = up
  }, [columnCount]);

  // Set initial scroll positions after content loads
  useEffect(() => {
    if (!autoScroll && !infiniteScroll) return;

    const setInitialPositions = () => {
      scrollRefs.current.forEach((scrollContainer, index) => {
        if (!scrollContainer) return;

        const { scrollHeight, clientHeight } = scrollContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          // Odd columns (index 0, 2, 4...) start at top, even columns (index 1, 3, 5...) start at bottom
          const startPosition = index % 2 === 0 ? 0 : maxScroll;
          scrollContainer.scrollTop = startPosition;
        }
      });
    };

    // Set positions after content is rendered
    const timeout = setTimeout(setInitialPositions, 200);
    return () => clearTimeout(timeout);
  }, [columnCount, autoScroll, infiniteScroll]);

  // Auto scroll animation function
  const autoScrollColumn = useCallback(
    (columnIndex: number) => {
      const scrollContainer = scrollRefs.current[columnIndex];
      if (
        !scrollContainer ||
        !autoScroll ||
        isScrollingManually.current[columnIndex] ||
        isHovering.current[columnIndex]
      ) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollingDown = scrollDirections.current[columnIndex];
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        // Not enough content to scroll
        return;
      }

      if (isScrollingDown) {
        // Scroll down
        const newScrollTop = Math.min(scrollTop + autoScrollSpeed, maxScroll);
        scrollContainer.scrollTop = newScrollTop;

        if (newScrollTop >= maxScroll) {
          // Reverse direction when reaching bottom
          scrollDirections.current[columnIndex] = false;
        }
      } else {
        // Scroll up
        const newScrollTop = Math.max(scrollTop - autoScrollSpeed, 0);
        scrollContainer.scrollTop = newScrollTop;

        if (newScrollTop <= 0) {
          // Reverse direction when reaching top
          scrollDirections.current[columnIndex] = true;
        }
      }

      // Continue animation
      animationFrameIds.current[columnIndex] = requestAnimationFrame(() =>
        autoScrollColumn(columnIndex)
      );
    },
    [autoScroll, autoScrollSpeed]
  );

  // Start auto scroll for all columns after content is ready
  useEffect(() => {
    if (!autoScroll) return;

    const startAutoScroll = () => {
      for (let i = 0; i < columnCount; i++) {
        if (scrollRefs.current[i]) {
          autoScrollColumn(i);
        }
      }
    };

    // Start auto scroll after content is loaded and positioned
    const timeout = setTimeout(startAutoScroll, 300);

    return () => {
      clearTimeout(timeout);
      // Cleanup animation frames
      animationFrameIds.current.forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, [autoScroll, columnCount, autoScrollColumn]);

  // Handle manual scroll - pause auto scroll
  const handleManualScroll = useCallback(
    (columnIndex: number) => {
      if (!autoScroll) return;

      // Cancel current animation
      if (animationFrameIds.current[columnIndex]) {
        cancelAnimationFrame(animationFrameIds.current[columnIndex]);
      }

      // Mark as manually scrolling
      isScrollingManually.current[columnIndex] = true;

      // Clear existing timeout
      if (scrollTimeouts.current[columnIndex]) {
        clearTimeout(scrollTimeouts.current[columnIndex]);
      }

      // Resume auto scroll after 5 seconds
      scrollTimeouts.current[columnIndex] = window.setTimeout(() => {
        isScrollingManually.current[columnIndex] = false;
        autoScrollColumn(columnIndex);
      }, 5000);
    },
    [autoScroll, autoScrollColumn]
  );

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = useCallback(
    (columnIndex: number) => {
      if (!pauseOnHover || !autoScroll) return;

      isHovering.current[columnIndex] = true;
      if (animationFrameIds.current[columnIndex]) {
        cancelAnimationFrame(animationFrameIds.current[columnIndex]);
      }
    },
    [pauseOnHover, autoScroll]
  );

  const handleMouseLeave = useCallback(
    (columnIndex: number) => {
      if (!pauseOnHover || !autoScroll) return;

      isHovering.current[columnIndex] = false;
      if (!isScrollingManually.current[columnIndex]) {
        autoScrollColumn(columnIndex);
      }
    },
    [pauseOnHover, autoScroll, autoScrollColumn]
  );

  // Function to duplicate items for infinite scroll
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

  // Handle infinite scroll logic and manual scroll detection
  const handleScroll = useCallback(
    (columnIndex: number) => {
      const scrollContainer = scrollRefs.current[columnIndex];
      if (!scrollContainer) return;

      // Handle infinite scroll reset
      if (infiniteScroll) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        // When we've scrolled past 2/3 of the content, reset to the beginning
        if (scrollPercentage > 0.66) {
          const resetPosition = scrollHeight / duplicateCount;
          scrollContainer.scrollTop = resetPosition;
        }
      }

      // Handle auto-scroll pause on manual scroll
      handleManualScroll(columnIndex);
    },
    [infiniteScroll, duplicateCount, handleManualScroll]
  );
  // Prepare columns based on distribution strategy
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
        size: randomSize(),
      }));
      return infiniteScroll ? duplicateItems(processedItems) : processedItems;
    };

    switch (distributionStrategy) {
      case "round-robin":
        // Distribute all items across columns in round-robin fashion
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
        // Fill columns sequentially
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
        // Each data source gets its own column(s) - original behavior
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

  // Restart auto-scroll when columns content changes
  useEffect(() => {
    if (!autoScroll) return;

    const restartAutoScroll = () => {
      // Cancel any existing animations
      animationFrameIds.current.forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });

      // Reset staggered starting positions after content change
      scrollRefs.current.forEach((scrollContainer, index) => {
        if (!scrollContainer) return;

        const { scrollHeight, clientHeight } = scrollContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          // Odd columns (index 0, 2, 4...) start at top, even columns (index 1, 3, 5...) start at bottom
          const startPosition = index % 2 === 0 ? 0 : maxScroll;
          scrollContainer.scrollTop = startPosition;
        }
      });

      // Start auto scroll for all columns
      for (let i = 0; i < columnCount; i++) {
        if (scrollRefs.current[i]) {
          setTimeout(() => autoScrollColumn(i), 400 + i * 100); // Stagger start times
        }
      }
    };

    const timeout = setTimeout(restartAutoScroll, 100);
    return () => clearTimeout(timeout);
  }, [columns, autoScroll, columnCount, autoScrollColumn]);

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
            className="flex flex-col overflow-y-auto scrollbar-none"
            style={{
              minWidth: `${minColumnWidth}px`,
              maxWidth: `${minColumnWidth * 1.2}px`,
              gap: `${gap}px`,
              flex: "1 1 auto",
              maxHeight: "70vh", // Set a fixed height for independent scrolling
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Column header - only show for source-per-column strategy */}
            {/* {distributionStrategy === "source-per-column" &&
              column.sourceInfo && (
                <div
                  className={`
                  text-md font-medium mb-2 p-2 rounded-lg cursor-pointer bg-transparent
                  transition-colors duration-500 shrink-0 justify-center flex items-center
                  ${column.sourceInfo.color ? "text-white" : "text-gray-700"}
                  hover:brightness-80 
                `}
                >
                  {column.sourceInfo.name}
                </div>
              )} */}

            {/* Scrollable Posts Container */}
            <div
              ref={(el) => {
                scrollRefs.current[index] = el;
              }}
              className="flex flex-col flex-1 overflow-y-auto scrollbar-none"
              style={{ gap: `${gap}px` }}
              onScroll={() => handleScroll(index)}
            >
              {/* Posts using the Post component */}
              {column.items.map((item, idx) => (
                <div
                  key={item.uniqueKey || `${item.sourceId}-${idx}`}
                  className="relative"
                >
                  {/* Source indicator for mixed strategies */}
                  {distributionStrategy !== "source-per-column" && (
                    <div
                      className="absolute top-8 right-8 z-20 px-2 py-1 text-xs rounded-full text-white"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasonryAdvanced;
