import React from "react";
import { motion } from "framer-motion";

const items = [
  { id: 1, img: "https://placehold.co/400x600", title: "Desert Walk" },
  { id: 2, img: "https://placehold.co/500x400", title: "Soft Shadows" },
  { id: 3, img: "https://placehold.co/350x500", title: "Industrial Speaker" },
  { id: 4, img: "https://placehold.co/450x450", title: "Sculpture" },
  { id: 5, img: "https://placehold.co/300x450", title: "Abstract Hair" },
  { id: 6, img: "https://placehold.co/500x700", title: "Minimal Form" },
  { id: 7, img: "https://placehold.co/300x300", title: "Balance Mobile" },
  { id: 8, img: "https://placehold.co/400x500", title: "Studio Shot" },
];

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-gray-200 p-6 cursor-default">
      {/* Header */}
      <div className="w-full py-10">
        <h1 className="text-4xl font-light tracking-tight mb-2">Main Dashboard</h1>
        <p className="text-gray-400 max-w-xl">
          This will be our main dashboard. It uses framer motion to animate cards   
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="break-inside-avoid rounded-xl overflow-hidden bg-[#111] shadow-lg hover:shadow-xl"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium tracking-wide">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
