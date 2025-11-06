import PlaceholderPic from "../assets/images/stock.jpg";
import PostPic from "../assets/images/postpic.png";

interface PostProps {
  imgLink: string;
}
// TODO: we need to make the gradient and pictured when hovered so we need to make a SetState for hover

function Post({ imgLink }: PostProps) {
  const backgroundImage = imgLink || PlaceholderPic;

  return (
    <div className="p-6 border bg-black">
      <div
        className="flex flex-col aspect-square bg-cover bg-center bg-no-repeat  justify-end w-64 h-64 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="w-full h-1/4 flex flex-row items-center justify-start gap-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-4 space-x-3">
          <div>
            <img
              src={PostPic}
              alt="Song"
              className="w-12 h-12  aspect-square rounded-md flex-shrink-0"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold"> Song Name </h3>
            <p className="text-sm opacity-90">Artist Name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
