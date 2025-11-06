// data/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

// import models
import User from "../models/user.model.js";
import Song from "../models/song.model.js";
import Playlist from "../models/playlist.model.js";
import Post from "../models/post.model.js";

dotenv.config();

const { MONGO_URI, DB_NAME } = process.env;

// --- Config: tweak counts here ---

const NUM_SONGS = 60;
const NUM_USERS = 12;
const PLAYLISTS_PER_USER = [1, 3]; // min, max
const PLAYLIST_SIZE = [5, 15];     // min, max # of songs in a playlist
const POSTS_PER_USER = [1, 4];     // min, max

faker.seed(42);

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickMany(arr, min, max) {
  const n = randInt(min, max);
  return faker.helpers.arrayElements(arr, n);
}

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });
  console.log("Connected to MongoDB for seeding");
}

async function clearCollections() {
  await Promise.all([
    User.deleteMany({}),
    Song.deleteMany({}),
    Playlist.deleteMany({}),
    Post.deleteMany({}),
  ]);
  console.log("Cleared users, songs, playlists, posts");
}

function makeSpotifyId() {
  return faker.string.alphanumeric({ length: 22 });
}

async function createSongs() {
  const songs = [];
  const seen = new Set();
  for (let i = 0; i < NUM_SONGS; i++) {
    // ensure unique spotify_id
    let sid = makeSpotifyId();
    while (seen.has(sid)) sid = makeSpotifyId();
    seen.add(sid);

    songs.push({
      name: faker.music.songName(),
      api_info: {
        spotify_id: sid,
        duration: randInt(90, 420), // seconds
        artist: faker.person.fullName(),
      },
    });
  }
  const inserted = await Song.insertMany(songs, { ordered: false });
  console.log(`Inserted ${inserted.length} songs`);
  return inserted;
}

async function createUsers() {
    const users = [];
  
    for (let i = 0; i < 12; i++) {
      // Generate username & email
      const username = faker.internet.username({ firstName: faker.person.firstName() });
      const email = faker.internet.email({ firstName: username });
  
      users.push({
        username: `${username}_${i}`, // ensure uniqueness
        email,
        password: faker.internet.password({ length: 12 }), // matches schema’s "password"
        profile_picture: faker.image.avatar(),
        banner_picture: "",
        bio: faker.lorem.sentence().slice(0, 280),
        number_of_followers: 0,
        number_of_following: 0,
        social_links: [
          `https://instagram.com/${username.toLowerCase()}`,
          `https://x.com/${username.toLowerCase()}`,
        ],
      });
    }
  
    const inserted = await User.insertMany(users, { ordered: false });
    console.log(`👤 Inserted ${inserted.length} users`);
    return inserted;
  }
  

async function createPlaylists(users, songs) {
  const playlists = [];

  for (const user of users) {
    const howMany = randInt(...PLAYLISTS_PER_USER);
    for (let i = 0; i < howMany; i++) {
      const size = randInt(...PLAYLIST_SIZE);
      const songIds = pickMany(
        songs.map((s) => s._id),
        Math.min(3, size),
        size
      );
      playlists.push({
        user_id: user._id,
        name: faker.word.words({ count: { min: 1, max: 3 } }),
        songs: songIds,
      });
    }
  }

  const inserted = await Playlist.insertMany(playlists, { ordered: false });
  console.log(`Inserted ${inserted.length} playlists`);
  return inserted;
}

async function createPosts(users, songs) {
  const posts = [];

  for (const user of users) {
    const howMany = randInt(...POSTS_PER_USER);
    for (let i = 0; i < howMany; i++) {
      const song = pickOne(songs);
      const others = users.filter((u) => u._id.toString() !== user._id.toString());
      const shares = pickMany(
        others.map((u) => u._id),
        0,
        Math.min(4, others.length)
      );

      const likes = randInt(0, others.length);
      const comments = randInt(0, 12);

      posts.push({
        user_id: user._id,
        song_id: song?._id,
        caption: faker.lorem.sentence().slice(0, 120),
        gif_picture: "",
        number_of_likes: likes,
        number_of_comments: comments,
        share: shares,
      });
    }
  }

  const inserted = await Post.insertMany(posts, { ordered: false });
  console.log(`Inserted ${inserted.length} posts`);
  return inserted;
}

async function main() {
  try {
    await connectDB();
    await clearCollections();

    const songs = await createSongs();
    const users = await createUsers();
    // (optional: update follower/following counts realistically)
    const playlists = await createPlaylists(users, songs);
    const posts = await createPosts(users, songs);

    console.log("Seeding done.");
    console.table([
      { collection: "songs", count: songs.length },
      { collection: "users", count: users.length },
      { collection: "playlists", count: playlists.length },
      { collection: "posts", count: posts.length },
    ]);
  } catch (err) {
    console.error("Seed error:", err?.message || err);
  } finally {
    await mongoose.connection.close();
    console.log("Closed Mongo connection");
  }
}

main();
