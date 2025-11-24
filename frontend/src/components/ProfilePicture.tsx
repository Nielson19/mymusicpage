import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
type profilePictureProps = {
  imageUrl?: string;
  alt?: string;
};
export const Profile = ({
  imageUrl,
  alt = "profile picture",
}: profilePictureProps) => {
  const [imageError, setImageError] = useState(false);
  console.log("imageUrl prop:", imageUrl);
  console.log("imageError state:", imageError);
  let avatarIcon;
  if (imageUrl && !imageError) {
    console.log("Rendering image");
    avatarIcon = (
      <img
        src={imageUrl}
        alt={alt}
        onError={() => {
          console.log("Image failed to load!");
          setImageError(true);
        }}
        className="rounded-3xl w-full h-full object-cover"
      />
    );
  } else {
    console.log("Rendering icon fallback");
    avatarIcon = <UserIcon className="w-20 h-20 text-stone-300 stroke-1" />;
  }
  return (
    <div className="bg-stone-900 rounded-3xl p-1 shadow-2xl w-fit">
      <div className="relative bg-stone-700 rounded-3xl w-36 h-36 flex items-center justify-center overflow-hidden">
        {avatarIcon}
      </div>
    </div>
  );
};
