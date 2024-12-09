# Movie Information Application

## Features
- Redux state management
- TypeScript integration
- Infinite scroll movie list
- Responsive design with Tailwind CSS
- Async data fetching with Redux Thunk

## Prerequisites
- Node.js (v18+)
- npm or yarn
- TMDB API Key (https://www.themoviedb.org/documentation/api)

## Setup Instructions
1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file in project root
4. Add your TMDB API key
```bash
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

5. Run the development server
```bash
npm run dev
```

## Project Structure
- `src/redux/`: State management
- `src/components/`: Reusable React components
- `src/services/`: API interaction logic
- `src/app/`: Next.js routing and layout

## Technologies
- Next.js 14
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- The Movie Database (TMDB) API# movie-info-app
