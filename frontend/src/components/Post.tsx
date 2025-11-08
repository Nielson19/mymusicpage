import PlaceholderPic from "../assets/images/stock.jpg";
import PostPic from "../assets/images/postpic.png";

interface PostProps {
  imgLink?: string;
  size: "SQUARE" | "PORTRAIT";
}
// TODO: we need to make the gradient and pictured when hovered so we need to make a SetState for hover

function Post({ imgLink, size }: PostProps) {
  const backgroundImage = imgLink || PlaceholderPic;

  return (
    <div className="group p-6 border bg-black">
      <div
        className={`w-64 h-64 overflow-hidden ${
          size === "PORTRAIT" ? "h-96" : ""
        }`}
      >
        <div
          className="flex flex-col aspect-square bg-cover bg-center bg-no-repeat justify-end relative w-full h-full group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="w-full h-20% flex flex-row items-center justify-start gap-2 bg-gradient-to-t from-black/0 group-hover:from-black/80 group-hover:via-black/50 to-transparent text-white p-4 space-x-3 transition-all duration-700">
            <div>
              <img
                src={PostPic}
                alt="Song"
                className="w-12 h-12 aspect-square rounded-md flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div>
              <h3 className="opacity-0 text-lg text-white font-bold group-hover:opacity-100 transition-opacity duration-700">
                Song Name
              </h3>
              <p className="opacity-0 text-sm text-white group-hover:opacity-100 transition-opacity duration-900">
                Artist Name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
