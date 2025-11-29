export interface PostProps {
  imgLink: string;
  size: "SQUARE" | "PORTRAIT";
  songName: string;
  artistName: string;
  background?: string;
}

function Post({
  imgLink,
  size,
  songName,
  artistName,
  background = imgLink,
}: PostProps) {
  if (background === "") {
    background = imgLink;
  }

  return (
    <div className="group p-6">
      <div
        className={`w-64 h-64 overflow-hidden ${
          size === "PORTRAIT" ? "h-96" : ""
        }`}
      >
        <div
          className="flex flex-col aspect-square bg-cover bg-center bg-no-repeat justify-end relative w-full h-full group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="w-full h-20% flex flex-row items-center justify-start gap-2 bg-linear-to-t from-black/0 group-hover:from-black/80 group-hover:via-black/50 to-transparent text-white p-4 space-x-3 transition-all duration-700">
            <div>
              <img
                src={imgLink}
                alt="Song"
                className="w-12 h-12 aspect-square rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>
            <div className="mb-2">
              <h3 className="opacity-0 text-lg text-white font-bold group-hover:opacity-100 transition-opacity duration-700">
                {songName}
              </h3>
              <p className="opacity-0 text-sm text-white group-hover:opacity-100 transition-opacity duration-900">
                {artistName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
