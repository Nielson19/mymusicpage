import React from "react";
import Post from "../Post";

interface ColumnProps {
  posts?: Array<{
    imgLink?: string;
    songTitle?: string;
    artistName?: string;
    size?: "SQUARE" | "PORTRAIT";
  }>;
  spacing?: "tight" | "normal" | "loose";
  maxWidth?: string;
}

function Column({
  posts = [],
  spacing = "normal",
  maxWidth = "max-w-sm",
}: ColumnProps) {
  const spacingClasses = {
    tight: "space-y-2",
    normal: "space-y-4",
    loose: "space-y-8",
  };

  return (
    <div className={`flex flex-col ${spacingClasses[spacing]} ${maxWidth}`}>
      {posts.map((post, index) => (
        <Post key={index} imgLink={post.imgLink} size={post.size || "SQUARE"} />
      ))}
    </div>
  );
}

export default Column;
