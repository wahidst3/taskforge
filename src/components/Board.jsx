
// src/pages/BoardPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import { CheckIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/solid';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { FilterIcon } from 'lucide-react';

import Navbar from './Nav';

const STATUS_COLS = ['To-Do', 'In-Progress', 'Done'];

const readLists = () => JSON.parse(localStorage.getItem('lists') || '[]');
const writeLists = (lists) => localStorage.setItem('lists', JSON.stringify(lists));

export default function BoardPage() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('low'); // Default priority
  const [newTags, setNewTags] = useState('');

  const [editPopup, setEditPopup] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null); // Add this in state
//task delete function
  const deleteTask = (taskId) => {
    setList(prevList => {
      if (!prevList) return prevList;
const updatedList = { ...prevList, tasks: prevList.tasks.filter(task => task.id !== taskId) };
saveList(updatedList);
return updatedList;
    });
  };
  
 const notify = () => toast("Task Edited successfully!",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,

    });
  

  //task edit function
  const editTask=(taskId,newTitle,newDescription)=>{
    setList(prevList => {
      if (!prevList) return prevList;
      const updatedTasks = prevList.tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, title: newTitle, description: newDescription,tags: newTags.split(',').map(tag => tag.trim()), dueDate: newDueDate, priority: newPriority };
        }
        return task;
      });
      const updatedList = { ...prevList, tasks: updatedTasks };
      saveList(updatedList);
      return updatedList;
    });
    setEditPopup(false);
    setEditingTaskId(null);
    setNewTitle('');
    setNewDescription('');
    notify();

  }
  
//edit popup
const openEditPopup = (id) => {
  setEditingTaskId(id);
  setNewTitle(list.tasks.find(task => task.id === id).title);
  setNewDescription(list.tasks.find(task => task.id === id).description);
  setNewDueDate(list.tasks.find(task => task.id === id).dueDate || '');
  setNewPriority(list.tasks.find(task => task.id === id).priority || 'low');
  setNewTags(list.tasks.find(task => task.id === id).tags.join(', '));

 
  
  setEditPopup(true);
 
  }
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
<div className="min-h-screen ">
{/* <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"> */}
<div className='mb-14'>
  <Navbar />
  </div>
      {/* Header */}
      {/* <header  className="z-50  mt-30 backdrop-blur-sm  h-60 w-[70%] mx-auto rounded-xl  shadow-md bg-[url('/board1.png')]
      bg-cover bg-center bg-no-repeat px-2">
      
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
       
          <div className='flex items-start gap-4 flex-col justify-between p-6'>
            <Link to="/" className="flex items-center gap-2 text-xl  hover:text-slate-600 text-slate-100 hover:bg-gray-200/70 bg-gray-500/50 w-9 h-9 text-center rounded-full p-1 transition">
            <ArrowLeftIcon className="w-7 h-7" />
      
          </Link>
          <div className='mt-5 '>
          <h1 className='text-4xl font-bold  text-[#1A2B4C] opacity-80'>TaskBoard </h1>
           <h1 className="text-5xl font-bold text-white opacity-90 ">{list.title}</h1>
             
           </div>
           </div>
           <div className='flex items-center gap-1 h-44 w-68 flex-col justify-end'>
                <span className="text-4xl font-bold mt-2 text-slate-100">{list.tasks?.length || 0} tasks</span>
             <h3 className="text-center text-white py-3 text-sm italic">
      Tips: Drag tasks to move between columns or reorder within a column
      </h3>
        <p className='text-white text-sm italic text-center'>Note: We are improving this web daily keep using for more intresting features</p>
      </div>
        </div>
        
      </header> */}

      

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative">
           <ToastContainer />
     {editPopup && (
  <div className="bg-white border border-gray-300 p-4 rounded-xl shadow-lg w-96 space-y-3 absolute top-40 left-1/2 transform -translate-x-1/2 z-50">
    <input
      type="text"
      placeholder="Title"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <input
      type="text"
      placeholder="Tags (comma separated)"
      value={newTags}
      onChange={(e) => setNewTags(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <input
      type="date"
      value={newDueDate}
      onChange={(e) => setNewDueDate(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <select
      value={newPriority}
      onChange={(e) => setNewPriority(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select> 

    <textarea
      placeholder="Description"
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <div className="flex justify-end gap-2">
      <button
        onClick={() => editTask(editingTaskId, newTitle, newDescription)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
      <button
        onClick={() => setEditPopup(false)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        Cancel
      </button>
    </div>
  </div>
)}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATUS_COLS.map(status => (
              <Column 
                key={status} 
                id={status}
                title={status} 
                tasks={tasksByStatus[status]} 
                deleteTask={deleteTask}
                editPopup={editPopup}
                setEditPopup={setEditPopup}
                openEditPopup={openEditPopup}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    
    </div>
  );
}

function Column({ id, title, tasks, deleteTask , editPopup, setEditPopup, openEditPopup }) {
  const color =
    title === 'To-Do' ? 'border-sky-300' :
    title === 'In-Progress' ? 'border-yellow-300' :
    'border-green-400';

  return (

    <div className={`bg-white rounded-xl p-4 border-t-4 ${color} shadow-sm`}>
      <div className="flex items-center justify-between mb-4 w-full">
      <h2 className="font-semibold text-slate-700 mb-3 text-lg">{title}</h2>
      <FilterIcon className="w-6 h-6 text-slate-300 cursor-pointer hover:text-slate-700 transition"
      onClick={() => alert('Filter functionality coming soon!')}
      />
   
      
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} deleteTask={deleteTask}  editPopup={editPopup} setEditPopup={setEditPopup} openEditPopup={openEditPopup} />
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

function TaskCard({ task, index, deleteTask , editPopup, setEditPopup, openEditPopup }) {
  const bgColor =
    task.status === 'Done' ? 'bg-green-100 border-green-300' :
    task.status === 'In-Progress' ? 'bg-yellow-100 border-yellow-300' :
    'bg-white border-slate-200';
const tagColors = [
  // "bg-pink-100 text-pink-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-indigo-100 text-indigo-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800"
];


  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className={`rounded-lg border ${bgColor} p-4 shadow hover:shadow-md flex items-center justify-between transition duration-200 cursor-pointer`}
//           onDoubleClick={(e) => {
//               e.preventDefault();
//              e.stopPropagation();
//             if (window.confirm('Are you sure you want to delete this Task?')) {
//               deleteTask(task.id)
//             }
//            }}
//         >

//           <div >
//             <div className='flex items-center gap-2'>
//          {task.status=== 'To-Do' && ( <ListBulletIcon className=' text-slate-500  w-6 h-6 mr-2' />)}
//          {task.status=== 'In-Progress' && ( <ClockIcon className=' text-yellow-500  w-6 h-6 mr-2' />)}
//          {task.status=== 'Done' && ( <CheckIcon className=' text-green-500  w-6 h-6 mr-2' />)}
//           <p className="font-medium text-slate-800">{task.title}</p>
// </div>
//           {task.description && (
//             <p className="text-sm text-slate-600 mt-1 ml-10 w-60 overflow-x-hidden bg-red-400">{task.description}</p>
//           )}
//           </div>
//           <button onClick={()=>openEditPopup(task.id)}><PencilSquareIcon className={`${task.status === 'Done' ? 'text-green-500' : task.status === 'In-Progress' ? 'text-yellow-500' : 'text-slate-500'} w-6 h-6`}/></button>
//         </div>
<div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  className={`rounded-lg border ${bgColor} p-4 shadow hover:shadow-md transition duration-200 cursor-pointer`}
  onDoubleClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this Task?')) {
      deleteTask(task.id);
    }
  }}
>
<div className="flex justify-between gap-3">
  {/* Left side: icon + title + description */}
  <div className="flex-1 min-w-0">
    {/* Badges row with priority and due date */}
    <div className='badges flex items-center justify-between gap-2 mb-2'>
      {task.dueDate && (
        <div className={`flex items-center gap-1 text-xs text-gray-500 ${
          task.status === 'Done' ? 'bg-green-50' :
          task.status === 'In-Progress' ? 'bg-yellow-50' :
          task.status === 'To-Do' ? 'bg-slate-50' :""} 
        px-2 py-1 rounded-full`}>
          <ArrowPathIcon className="w-4 h-4" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}
      <h1
        className={`px-2 py-1 text-xs font-semibold rounded-full w-16 text-center 
          ${task.priority === "high" ? "bg-red-100 text-red-800 border border-red-200" : ""}
          ${task.priority === "medium" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : ""}
          ${task.priority === "low" ? "bg-green-100 text-green-800 border border-green-200" : ""}
          shadow-sm
        `}
      >
        {task.priority}
      </h1>
    </div>
    
    {/* Icon + title row */}
    <div className={`flex items-center gap-2 min-w-0 p-2  rounded-lg transition-colors duration-150
      ${
          task.status === 'Done' ? 'hover:bg-green-50' :
          task.status === 'In-Progress' ? 'hover:bg-yellow-50' :
          task.status === 'To-Do' ? 'hover:bg-slate-50' :""} 
      `}>
      <div className={`p-1 rounded-full ${
        task.status === 'To-Do' ? 'bg-slate-50' : 
        task.status === 'In-Progress' ? 'bg-yellow-50' : 
        'bg-green-100'
      }`}>
        {task.status === 'To-Do' && (
          <ListBulletIcon className="text-slate-600 w-5 h-5 flex-shrink-0" />
        )}
        {task.status === 'In-Progress' && (
          <ClockIcon className="text-yellow-600 w-5 h-5 flex-shrink-0" />
        )}
        {task.status === 'Done' && (
          <CheckIcon className="text-green-600 w-5 h-5 flex-shrink-0" />
        )}
      </div>
      <p className="font-medium text-slate-800 truncate">{task.title}</p>
    </div>

    {/* Description */}
    {task.description && (
      <p
        className="text-sm text-slate-600 mt-1 ml-9 break-words whitespace-normal overflow-y-auto max-h-16 pr-1"
        style={{ overflowX: "hidden" }}
      >
        {task.description}
      </p>
    )}
  </div>

  {/* Edit button */}
  <button 
    onClick={() => openEditPopup(task.id)}
    className="self-start  mt-10 hover:bg-gray-100 rounded-full transition-colors duration-150"
  >
    <PencilSquareIcon
      className={`${
        task.status === 'Done'
          ? 'text-green-600'
          : task.status === 'In-Progress'
          ? 'text-yellow-600'
          : 'text-slate-600'
      } w-6 h-6`}
    />
  </button>
</div>

{/* Footer with dates and tags */}
<div className='dates flex items-center justify-between gap-2 mt-3 text-xs text-gray-500'>
  {/* Created at */}
  <div className={`flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full
    ${
          task.status === 'Done' ? 'bg-green-50' :
          task.status === 'In-Progress' ? 'bg-yellow-50' :
          task.status === 'To-Do' ? 'bg-slate-50' :""} 
    `}>
    <CalendarDaysIcon className={`w-4 h-4
      ${
          task.status === 'Done' ? 'text-green-600' :
          task.status === 'In-Progress' ? 'text-yellow-600' :"" 
          }`} />
    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
  </div>
  
  {/* Tags */}
  <div className="flex flex-wrap gap-1">
    {task.tags.map((tag, index) => (
      <span
        key={index}
        className={`px-2 py-1 text-xs font-semibold rounded-full text-center ${
          tagColors[index % tagColors.length]
        } border border-gray-200 shadow-sm`}
      >
        {tag}
      </span>
    ))}
  </div>
</div>
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