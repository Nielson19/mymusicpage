# MyMusicPage 🎧

> A modern music sharing and playlist-management platform built with Figma, React, Tailwind CSS, Node.js, Express, and MongoDB for fast and intuitive user experiences. Presented the project to an audience of 100+ students and recruiters, demonstrating core features and interactive functionality.
>
> **Frontend Developers:** [Asad Chaudhry](https://www.linkedin.com/in/asad-a-chaudhry/), [Daniel Escobar](https://www.linkedin.com/in/daniel-escobar-cs/en), [Lauren Stone](https://www.linkedin.com/in/llaurenstone), [Shirina Daniel](https://www.linkedin.com/in/shirinadan), [Paola Arraut](https://www.linkedin.com/in/paola-arraut-54700b224/), [Frank Diaz](https://www.linkedin.com/in/frankdiazprogramming) 
>
> **Backend Developers:** [Zara Maraj](https://www.linkedin.com/in/zmaraj), [Chris Sanchez](https://www.linkedin.com/in/chrissanchezdev), [Elkin Correa](https://www.linkedin.com/in/elkin-correa-6904731ba), [Brianna Talley](https://www.linkedin.com/in/brianna-talley-9b6112195)

## Getting Started

Follow these steps to run **MyMusicPage** locally.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mymusicpage.git
cd mymusicpage
```

### 2. Install dependencies
Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
cd ../backend
npm install
```

### 3. Configure environment variables
Create a file inside the backend folder:
```bash
/backend/.env
```

Add the following:
```bash
PORT=3002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Required for Spotify authentication
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=your_redirect_uri
```

### 4. Start the application
Start Backend:
```bash
cd backend
npm start
```

Start Frontend:
```bash
cd frontend
npm run dev
```

### 5. Open in your browser
Navigate to frontend port:
```bash
http://localhost:5173
```

## Features

* **Modern React Frontend Architecture:**  
  Functional components, React hooks, and Tailwind utility-first styling applied within a responsive layout derived from a Figma design system.

* **User Authentication & Data Modeling:**  
  Login and sign-up flows implemented through a basic authentication layer, with mock playlist data structured to mirror real API schemas and ready for integration with future backend endpoints.

* **Advanced UI Layout & Interactions:**  
  Masonry-style grid with infinite scroll, optimized rendering, and custom Tailwind animations for smooth, high-performance interactions.

* **Music Playback on Hover:**  
  Dynamic audio preview: songs play on hover in the dashboard, enhancing the user experience without requiring page navigation.

* **Giphy Picker Integration:**  
  Users can search for and attach GIFs to posts using an integrated Giphy API picker for richer content.

* **Music Search Functionality:**  
  Search across available songs directly within the platform, with results dynamically displayed for easy playlist additions.

* **Custom Banner Images for Playlists:**  
  Users can select unique banner images when creating playlists, adding a personalized visual touch.

* **Scalable Component Architecture:**  
  Modular and reusable components (cards, modals, grids) enable rapid expansion and future feature additions.

## Project Walkthrough

[![Watch the Demo](https://img.youtube.com/vi/3RFXkWwCP4E/0.jpg)](https://m.youtube.com/watch?v=3RFXkWwCP4E)

## Wireframes

<p align="center">
  <img src="https://github.com/user-attachments/assets/a466297e-900a-4e71-99d6-d2b2685e4c9a" width="600" />
  <img src="https://github.com/user-attachments/assets/567be6ae-2442-4c60-9917-bd3c57e49f93" width="600" />
  <img src="https://github.com/user-attachments/assets/52b40227-cf39-46e0-9705-79e1b38f7169" width="600" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/46c2aeb5-3b04-4f99-a9b3-69123aa1525e" width="600" />
  <img src="https://github.com/user-attachments/assets/576fe05c-3cae-4b08-82c0-91ec129318b8" width="600" />
  <img src="https://github.com/user-attachments/assets/3c077836-e4f7-451e-b271-0cc5563672f0" width="600" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/28782772-a376-4b4d-827b-fa39fd29b6b6" width="600" />
  <img src="https://github.com/user-attachments/assets/93d456ad-ea8d-44ab-a1ba-dc23c9035378" width="600" />
  <img src="https://github.com/user-attachments/assets/2aabf1ad-d9af-49c5-856f-bdba06950871" width="600" />
</p>

## Tech Stack

* **Frontend:** React, TailwindCSS, React Icons ([react-icons](https://react-icons.github.io/react-icons/)), React Toast  
* **Backend:** Node.js, Express.js  
* **Database:** MongoDB  
* **Design & Prototyping:** Figma  
* **Project Management & Collaboration:** Git, Notion  
* **Assets & Media:** Pinterest images for playlist visuals

## Future Enhancements

* **Full API Integration:**  
  Replace mock data with real backend endpoints for playlists, users, and media items.

* **CRUD Functionality:**  
  Implement full Create, Read, Update, and Delete operations for playlists and songs, enabling dynamic data management.
