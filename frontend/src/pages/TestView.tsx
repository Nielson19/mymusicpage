import Post from "../components/Post";
import SongTest from "../assets/audio/Victory Lap Klop Remix 11-10.wav";

function TestView() {
  return (
    <div>
      {/* <GiphyPicker
        onSelectGif={(url) => console.log("Selected GIF URL:", url)} */}
      {/* <BurgerMenu
        iconImage="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
        items={[
          { label: "Profile", onClick: () => console.log("Profile clicked") },
          { label: "Settings", onClick: () => console.log("Settings clicked") },
          { label: "Logout", onClick: () => console.log("Logout clicked") },
        ]}
      /> */}
      <Post
        songID="test"
        userID="testUser"
        songName="Victory Lap Klop Remix"
        artistName="Artist Name"
        size="PORTRAIT"
        imgLink="../images/stock.jpg"
        background="../images/stock.jpg"
      />
      <audio src={SongTest} controls />
      <Post
        songID="test"
        userID="testUser"
        songName="Victory Lap Klop Remix"
        artistName="Artist Name"
        size="PORTRAIT"
        imgLink="../images/stock.jpg"
        background="../images/stock.jpg"
      />
      <audio src={SongTest} controls />
    </div>
  );
}

export default TestView;
