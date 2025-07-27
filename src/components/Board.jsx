// // src/pages/BoardPage.jsx
// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// const STATUS_COLS = ['To-Do', 'In-Progress', 'Done'];

// // helper: read all lists from localStorage
// const readLists = () => JSON.parse(localStorage.getItem('lists') || '[]');
// // helper: write all lists back
// const writeLists = (lists) => localStorage.setItem('lists', JSON.stringify(lists));

// export default function BoardPage() {
//   const { listId } = useParams();
//   const [list, setList] = useState(null);

//   // load the specific list
//   useEffect(() => {
//     const found = readLists().find(l => l.id === listId);
//     setList(found || null);
//   }, [listId]);

//   // save the updated list back to localStorage
//   const saveList = (updated) => {
//     const all = readLists();
//     const idx = all.findIndex(l => l.id === listId);
//     if (idx !== -1) all[idx] = updated;
//     writeLists(all);
//   };

//   // status change handler
//   const changeStatus = (taskId, newStatus) => {
//     setList(prev => {
//       if (!prev) return prev;
//       const updatedTasks = prev.tasks.map(t =>
//         t.id === taskId ? { ...t, status: newStatus } : t
//       );
//       const updatedList = { ...prev, tasks: updatedTasks, taskCount: updatedTasks.length };
//       saveList(updatedList);
//       return updatedList;
//     });
//   };

//   if (!list) {
//     return (
//       <div className="max-w-xl mx-auto py-20 text-center">
//         <h2 className="text-2xl font-bold text-slate-800">List not found</h2>
//         <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
//           <ArrowLeftIcon className="w-5 h-5" />
//           Back to all lists
//         </Link>
//       </div>
//     );
//   }

//   // group tasks by status
//   const tasksByStatus = STATUS_COLS.reduce((acc, col) => {
//     acc[col] = list.tasks?.filter(t => t.status === col) || [];
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
//             <ArrowLeftIcon className="w-5 h-5" />
//             Lists
//           </Link>

//           <h1 className="text-xl font-bold text-slate-900 truncate">{list.title}</h1>

//           <span className="text-sm text-slate-500">{list.tasks?.length || 0} tasks</span>
//         </div>
//       </header>
// <h3 className='text-center text-[#314158] py-4'>Tap on Todo so it can be marked as In-Progress/Done</h3>
//       {/* Columns */}
//       <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {STATUS_COLS.map(status => (
//             <Column key={status} title={status} tasks={tasksByStatus[status]} onStatusChange={changeStatus} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ---------- Column ---------- */
// function Column({ title, tasks, onStatusChange }) {
//   return (
//     <div className="bg-slate-100 rounded-xl p-4">

//       <h2 className="font-semibold text-slate-700 mb-3">{title}</h2> 
//       <div className="space-y-3">
//         {tasks.map(task => (
//           <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
//         ))}
//         {tasks.length === 0 && (
//           <p className="text-sm text-slate-500 italic">No tasks yet</p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------- Task Card ---------- */
// function TaskCard({ task, onStatusChange }) {
//   const handleClick = () => {
//     if (task.status === 'To-Do') onStatusChange(task.id, 'In-Progress');
//   };
//   const handleDoubleClick = () => {
//     onStatusChange(task.id, 'Done');
//   };

//   return (
//    <div
//   className={`rounded-lg shadow-sm border border-slate-200 p-3 cursor-pointer select-none
//     ${task.status === 'Done'
//         ? 'bg-green-300'
//         : task.status === 'In-Progress'
//         ? 'bg-yellow-300'
//         : 'bg-white'
//     }`}
//   onClick={handleClick}
//   onDoubleClick={handleDoubleClick}
// >
//   <p className="font-medium text-slate-900">{task.title}</p>
//   {task.description && (
//     <p className="text-sm text-slate-600 mt-1">{task.description}</p>
//   )}
// </div>
//   );
// }
// src/pages/BoardPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const STATUS_COLS = ['To-Do', 'In-Progress', 'Done'];

const readLists = () => JSON.parse(localStorage.getItem('lists') || '[]');
const writeLists = (lists) => localStorage.setItem('lists', JSON.stringify(lists));

export default function BoardPage() {
  const { listId } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const found = readLists().find(l => String(l.id) === String(listId));
    setList(found || null);
  }, [listId]);

  const saveList = (updated) => {
    const all = readLists();
    const idx = all.findIndex(l => String(l.id) === String(listId));
    if (idx !== -1) all[idx] = updated;
    writeLists(all);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setList(prevList => {
      if (!prevList) return prevList;

      // Moving within the same column
      if (source.droppableId === destination.droppableId) {
        const columnTasks = [...prevList.tasks.filter(t => t.status === source.droppableId)];
        const reorderedTasks = reorder(
          columnTasks,
          source.index,
          destination.index
        );

        const newTasks = prevList.tasks.map(task => {
          if (task.status !== source.droppableId) return task;
          return reorderedTasks.shift();
        });

        const updatedList = { ...prevList, tasks: newTasks };
        saveList(updatedList);
        return updatedList;
      }

      // Moving between columns
      const sourceTasks = [...prevList.tasks.filter(t => t.status === source.droppableId)];
      const destTasks = [...prevList.tasks.filter(t => t.status === destination.droppableId)];
      const [removed] = sourceTasks.splice(source.index, 1);

      // Update status of the moved task
      removed.status = destination.droppableId;

      // Insert into destination column
      destTasks.splice(destination.index, 0, removed);

      // Combine all tasks
      const newTasks = prevList.tasks
        .filter(t => t.status !== source.droppableId && t.status !== destination.droppableId)
        .concat(sourceTasks)
        .concat(destTasks);

      const updatedList = { ...prevList, tasks: newTasks };
      saveList(updatedList);
      return updatedList;
    });
  };

  if (!list) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">List not found</h2>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:text-sky-800">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to all lists
          </Link>
        </div>
      </div>
    );
  }

  const tasksByStatus = STATUS_COLS.reduce((acc, col) => {
    acc[col] = list.tasks?.filter(t => t.status === col) || [];
    return acc;
  }, {});

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header  className="  z-50 py-5 backdrop-blur-sm   shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 truncate">{list.title}</h1>

          <span className="text-sm text-slate-500">{list.tasks?.length || 0} tasks</span>
        </div>
      </header>

      <h3 className="text-center text-[#314158] py-3 text-sm italic">
        Drag tasks to move between columns or reorder within a column
      </h3>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATUS_COLS.map(status => (
              <Column 
                key={status} 
                id={status}
                title={status} 
                tasks={tasksByStatus[status]} 
              />
            ))}
          </div>
        </DragDropContext>
      </main>
      <p className='text-gray-400 text-sm italic text-center'>Note: We are improving this web daily keep using for more intresting features</p>
    </div>
  );
}

function Column({ id, title, tasks }) {
  const color =
    title === 'To-Do' ? 'border-sky-300' :
    title === 'In-Progress' ? 'border-yellow-300' :
    'border-green-400';

  return (
    <div className={`bg-white rounded-xl p-4 border-t-4 ${color} shadow-sm`}>
      <h2 className="font-semibold text-slate-700 mb-3 text-lg">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {tasks.length === 0 && (
              <p className="text-sm text-slate-400 italic">No tasks here</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function TaskCard({ task, index }) {
  const bgColor =
    task.status === 'Done' ? 'bg-green-100 border-green-300' :
    task.status === 'In-Progress' ? 'bg-yellow-100 border-yellow-300' :
    'bg-white border-slate-200';

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg border ${bgColor} p-4 shadow hover:shadow-md transition duration-200 cursor-pointer`}
        >
          <p className="font-medium text-slate-800">{task.title}</p>
          {task.description && (
            <p className="text-sm text-slate-600 mt-1">{task.description}</p>
          )}
        </div>
      )}
    </Draggable>
  );
}

// Helper function to reorder items in a list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};