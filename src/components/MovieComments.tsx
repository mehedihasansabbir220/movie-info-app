// // src/components/MovieComments.tsx
// import React, { useState, useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../redux/store';
// import { 
//   fetchCommentsThunk, 
//   addCommentThunk 
// } from '../redux/slices/commentsSlice';
// import { User, MessageSquare, Send } from 'lucide-react';

// interface MovieCommentsProps {
//   movieId: number;
// }

// const MovieComments: React.FC<MovieCommentsProps> = ({ movieId }) => {
//   const [newComment, setNewComment] = useState('');
//   const dispatch = useAppDispatch();
//   const { comments, status } = useAppSelector((state) => state.comments);
//   const user = useAppSelector((state) => state.user.currentUser);

//   // Fetch comments when component mounts
//   useEffect(() => {
//     dispatch(fetchCommentsThunk(movieId));
//   }, [movieId, dispatch]);

//   // Handle adding a new comment
//   const handleAddComment = () => {
//     if (newComment.trim() && user) {
//       dispatch(addCommentThunk({
//         movieId,
//         comment: newComment,
//         userId: user.id,
//         username: user.username
//       }));
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg p-6">
//       <div className="flex items-center mb-6">
//         <MessageSquare className="mr-2" />
//         <h2 className="text-2xl font-bold">Comments</h2>
//       </div>

//       {/* Comment Input */}
//       {user ? (
//         <div className="flex mb-6">
//           <input 
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Write a comment..."
//             className="flex-grow bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-400 mb-6">Please log in to leave a comment</p>
//       )}

//       {/* Comments List */}
//       {status === 'loading' ? (
//         <div className="flex justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
//         </div>
//       ) : comments.length === 0 ? (
//         <p className="text-center text-gray-400">No comments yet</p>
//       ) : (
//         <div className="space-y-4">
//           {comments.map((comment:any) => (
//             <div 
//               key={comment.id} 
//               className="bg-gray-700 p-4 rounded-lg flex items-start"
//             >
//               <div className="mr-4">
//                 <User className="text-gray-400" />
//               </div>
//               <div>
//                 <p className="font-semibold text-white">{comment.username}</p>
//                 <p className="text-gray-300">{comment.text}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(comment.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieComments;