// // src/components/MovieRating.tsx
// import React, { useState, useEffect } from 'react';
// import { Star } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '../redux/store';
// import { 
//   fetchMovieRatingsThunk, 
//   addRatingThunk 
// } from '@/redux/slices/ratingsSlice';

// interface MovieRatingProps {
//   movieId: number;
// }

// const MovieRating: React.FC<MovieRatingProps> = ({ movieId }) => {
//   const [userRating, setUserRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
  
//   const dispatch = useAppDispatch();
//   const { 
//     averageRating, 
//     userCurrentRating, 
//     totalRatings 
//   } = useAppSelector((state) => state.ratings);
//   const user = useAppSelector((state) => state.user.currentUser);

//   // Fetch movie ratings when component mounts
//   useEffect(() => {
//     dispatch(fetchMovieRatingsThunk(movieId));
//   }, [movieId, dispatch]);

//   // Set user's current rating if available
//   useEffect(() => {
//     if (userCurrentRating) {
//       setUserRating(userCurrentRating);
//     }
//   }, [userCurrentRating]);

//   // Handle star rating submission
//   const handleRatingSubmit = (rating: number) => {
//     if (user) {
//       dispatch(addRatingThunk({
//         movieId,
//         userId: user.id,
//         rating
//       }));
//     } else {
//       // Show login prompt or redirect to login
//       alert('Please log in to rate the movie');
//     }
//   };

//   // Render star rating UI
//   const renderStars = (rating: number, interactive = false) => {
//     return Array(5).fill(0).map((_, index) => {
//       const starValue = index + 1;
//       return (
//         <Star
//           key={index}
//           className={`
//             ${starValue <= (interactive ? hoverRating || rating : rating) 
//               ? 'text-yellow-500 fill-current' 
//               : 'text-gray-400'}
//             cursor-pointer transition-colors duration-200
//           `}
//           size={32}
//           onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
//           onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
//           onClick={interactive ? () => handleRatingSubmit(starValue) : undefined}
//         />
//       );
//     });
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg p-6 mb-6">
//       <div className="flex flex-col md:flex-row items-center justify-between">
//         {/* Average Rating */}
//         <div className="flex flex-col items-center mb-4 md:mb-0">
//           <h3 className="text-xl font-semibold mb-2">Average Rating</h3>
//           <div className="flex items-center">
//             {renderStars(Math.round(averageRating))}
//             <span className="ml-2 text-white">
//               {averageRating.toFixed(1)} ({totalRatings} ratings)
//             </span>
//           </div>
//         </div>

//         {/* User Rating */}
//         <div className="flex flex-col items-center">
//           <h3 className="text-xl font-semibold mb-2">
//             {user ? 'Your Rating' : 'Rate This Movie'}
//           </h3>
//           {user ? (
//             <div className="flex items-center">
//               {renderStars(userRating, true)}
//             </div>
//           ) : (
//             <p className="text-gray-400">Log in to rate</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieRating;