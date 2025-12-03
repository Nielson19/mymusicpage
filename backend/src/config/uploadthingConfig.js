import { createUploadthing } from "uploadthing/server";
import User from '../models/userModel.js';

const f = createUploadthing();

/* THIS IS A PLACEHOLDER FOR THE AUTH FUNCTION
// Mock auth function - replace this with your actual auth middleware
const auth = (req) => {
  // For testing, you can use a header or mock user
  const userId = req.headers.userid || '507f1f77bcf86cd799439011';
  if (!userId) return null;
  return { id: userId };
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}; THIS IS A PLACE HOLDER FOR THE AUTH FUNCTION
*/

// FileRouter
export const ourFileRouter = {

  profileImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions
    .middleware(async ({ req }) => {

      const user = auth(req);


      if (!user) throw new Error("Unauthorized");


      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Update user's profile picture in database
      try {
        await User.findByIdAndUpdate(
          metadata.userId,
          { profile_picture: file.url }
        );
        console.log("Profile picture updated in database");
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }


      return { uploadedBy: metadata.userId, url: file.url };
    }),

  bannerImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Banner upload complete for userId:", metadata.userId);

      try {
        await User.findByIdAndUpdate(
          metadata.userId,
          { banner_picture: file.url }
        );
        console.log("Banner picture updated in database");
      } catch (error) {
        console.error("Failed to update banner picture:", error);
      }

      return { uploadedBy: metadata.userId, url: file.url };
    }),
};