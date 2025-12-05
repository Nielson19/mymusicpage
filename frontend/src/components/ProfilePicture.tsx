import { UserIcon } from "lucide-react";
import { useState } from "react";
import DefaultProfilePic from "../assets/images/image10.jpg";

interface profilePictureProps {
  imageUrl?: string;
  alt?: string;
}
const Profile = ({
  imageUrl = DefaultProfilePic,
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
        className="object-cover w-full h-full"
      />
    );
  } else {
    console.log("Rendering icon fallback");
    avatarIcon = <UserIcon className="w-1/2 h-1/2 text-stone-300 stroke-1" />;
  }
  return (
    <div className="relative bg-stone-700 rounded-sm w-30 h-30 flex items-center justify-center overflow-hidden">
      {avatarIcon}
    </div>
  );
};

export default Profile;
