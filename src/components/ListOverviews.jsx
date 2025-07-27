// // ListsOverview.jsx
// import { Link, useNavigate } from "react-router-dom";     // or NextLink if using Next.js
// import { CalendarDaysIcon, ClockIcon, ListBulletIcon,TrashIcon } from "@heroicons/react/24/outline";

// export default function ListsOverview({ lists,setLists }) {
//   const navigate = useNavigate();
//   // `lists` shape: [{ id, title, description, createdAt, taskCount, tags[] }]
//   if (!lists?.length) return <EmptyState />;
//   const deleteList = (listId) => {
//     // Implement your delete logic here
//     // For example, remove from local storage or make an API call
//     let updatedLists = lists.filter(list => list.id !== listId);
//     localStorage.setItem('lists', JSON.stringify(updatedLists));
//     setLists(updatedLists);
//     navigate('/'); // Redirect to home or refresh the list view

//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <header className="mb-10">
//         <h1 className="text-3xl font-bold text-slate-900">Your Tasks<span className="text-sky-600">Board</span></h1>
//         <p className="text-slate-600 mt-1">
//           All paragraphs you’ve turned into interactive boards.
//         </p>
//       </header>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
//         {lists.map((list) => (
//           <ListCard key={list.id} list={list} deleteList={deleteList} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ListCard({ list,deleteList }) {
  
//   return (
//     <Link
//       to={`/board/${list.id}`}
//       className="block bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition"
//     >
//       <div className="p-5 space-y-3">
      
//         <div className="flex items-center justify-between">
//           <div>
//         <h3 className="text-lg font-semibold text-slate-900 truncate">
//           {list.title}
//         </h3>
//         <p className="text-sm text-slate-600 line-clamp-2">
//           {list.description}
//         </p>
//         </div>
//         <div className=" -mt-10 rounded-full  bg-red-100 p-[6px] hover:bg-red-200 text-center w-8 h-8  z-20" onClick={(e)=>{
         
//     e.stopPropagation(); 
//     e.preventDefault();  
//     deleteList(list.id);
  
//         }}>
//           <TrashIcon className="w-5 h-5 text-red-500 cursor-pointer"/> 
//         </div>
//         </div>

      
//         <div className="flex items-center gap-4 text-sm text-slate-500">
//           <span className="flex items-center gap-1">
//             <ListBulletIcon className="w-4 h-4" />
//             {list.taskCount} tasks
//           </span>
//           <span className="flex items-center gap-1">
//             <CalendarDaysIcon className="w-4 h-4" />
//             {new Date(list.createdAt).toLocaleDateString()}
//           </span>
//         </div>

//         {/* Optional tags */}
//         {list.tags?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-2">
//             {list.tags.slice(0, 3).map((tag) => (
//               <span
//                 key={tag}
//                 className="px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </Link>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="max-w-xl mx-auto py-20 text-center">
//       <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-sky-100">
//         <ListBulletIcon className="w-12 h-12 text-sky-600" />
//       </div>
//       <h2 className="mt-4 text-xl font-semibold text-slate-900">
//         No lists yet
//       </h2>
//       <p className="mt-1 text-slate-600">
//         Paste your first paragraph on the home page to see it here.
//       </p>
//       <a
//         href="/"
//         className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition"
//       >
//         Create my first list
//       </a>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  ListBulletIcon,
  TrashIcon,
  PlusIcon,
  ArrowRightIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function ListsOverview({ lists, setLists }) {
  const navigate = useNavigate();

  const deleteList = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    setLists(updatedLists);
  };

  if (!lists?.length) return <EmptyState />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Task Boards</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 max-w-2xl">
              All your converted text organized into beautiful, interactive boards
              <SparklesIcon className="w-5 h-5 text-amber-400 inline-block ml-2" />
            </p>
          </div>
        <Link
  to="/" // Navigate to home page first
  onClick={(e) => {
    // Only prevent default if we're already on home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // Otherwise, let the Link navigate to home page normally
  }}
  className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white font-medium hover:shadow-lg transition-all group"
>
  <PlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
  Create New
</Link>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} deleteList={deleteList} />
        ))}
        
        {/* Add New Card */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors group"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
            <PlusIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-slate-700">New Board</h3>
          <p className="text-sm text-slate-500 mt-1 text-center">Convert another text to tasks</p>
        </Link>
      </div>
    </div>
  );
}

function ListCard({ list, deleteList }) {
  return (
    <div className="group relative">
      {/* Delete Button */}
 <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this board?')) {
      deleteList(list.id);
    }
  }}
  className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
  aria-label="Delete board"
>
  <TrashIcon className="w-5 h-5 text-red-500" />
</button>
      
      <Link
        to={`/board/${list.id}`}
        className="block h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:border-indigo-200 overflow-hidden"
      >
        <div className="p-6 space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="text-xl font-semibold text-slate-800 line-clamp-2">
              {list.title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 line-clamp-3">
              {list.description || "No description"}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
              <ListBulletIcon className="w-4 h-4" />
              {list.taskCount} tasks
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
              <CalendarDaysIcon className="w-4 h-4" />
              {new Date(list.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Tags */}
          {list.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {list.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {list.tags.length > 3 && (
                <span className="px-2 py-1 text-xs text-slate-500">
                  +{list.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* View Button */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
            <span className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              View Board
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <div className="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-6">
        <div className="relative">
          <ListBulletIcon className="w-12 h-12 text-indigo-600" />
          <SparklesIcon className="w-6 h-6 text-amber-400 absolute -top-2 -right-4" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">
        No task boards yet
      </h2>
      <p className="mt-2 text-slate-600">
        Get started by converting your first text into an organized task board
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white font-medium hover:shadow-lg transition-all"
      >
        <PlusIcon className="w-5 h-5" />
        Create First Board
      </Link>
    </div>
  );
}