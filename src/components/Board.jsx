
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import { CheckIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/solid';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { FilterIcon } from 'lucide-react';
import { useLists } from '../utilis/ContextList';
import Navbar from './Nav';
import { useState } from 'react';
// import { useLists } from '../utilis/ContextList';

const STATUS_COLS = ['To-Do', 'In-Progress', 'Done'];
useState
export default function BoardPage() {

  const { listId } = useParams();
  const { lists, setLists, loading } = useLists();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('low');
  const [newTags, setNewTags] = useState('');
  const [editPopup, setEditPopup] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterText, setFilterText] = useState('');
const [filterPriority, setFilterPriority] = useState('');
const [filterTag, setFilterTag] = useState('');
const [filterDueDate, setFilterDueDate] = useState('');
const [filterPop, setFilterPopup] = useState(false);

  
  const list = lists?.find(l => String(l.id) === String(listId)) || null;

  //task delete function
const deleteTask = (listId, taskId) => {
  setLists(prevLists => {
    return prevLists.map(l => {
      if (String(l.id) === String(listId)) {
        return { 
          ...l, 
          tasks: l.tasks.filter(task => task.id !== taskId) 
        };
      }
      return l;
    });
  });
};
  
  const notify = () => toast("Task Edited successfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  //task edit function
  const editTask = (taskId, newTitle, newDescription) => {
    setLists(prevLists => {
      return prevLists.map(l => {
        if (String(l.id) === String(listId)) {
          const updatedTasks = l.tasks.map(task => {
            if (task.id === taskId) {
              return { 
                ...task, 
                title: newTitle, 
                description: newDescription,
                tags: newTags.split(',').map(tag => tag.trim()), 
                dueDate: newDueDate, 
                priority: newPriority 
              };
            }
            return task;
          });
          return { ...l, tasks: updatedTasks };
        }
        return l;
      });
    });
    setEditPopup(false);
    setEditingTaskId(null);
    setNewTitle('');
    setNewDescription('');
    notify();
  }
  
  //edit popup
  const openEditPopup = (id) => {
    if (!list) return;
    
    const task = list.tasks.find(task => task.id === id);
    if (!task) return;
    
    setEditingTaskId(id);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate || '');
    setNewPriority(task.priority || 'low');
    setNewTags(task.tags?.join(', ') || '');
    setEditPopup(true);
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || !list) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setLists(prevLists => {
      return prevLists.map(l => {
        if (String(l.id) !== String(listId)) return l;

        // Moving within the same column
        if (source.droppableId === destination.droppableId) {
          const columnTasks = [...l.tasks.filter(t => t.status === source.droppableId)];
          const reorderedTasks = reorder(columnTasks, source.index, destination.index);

          const newTasks = l.tasks.map(task => {
            if (task.status !== source.droppableId) return task;
            return reorderedTasks.shift();
          });

          return { ...l, tasks: newTasks };
        }

        // Moving between columns
        const sourceTasks = [...l.tasks.filter(t => t.status === source.droppableId)];
        const destTasks = [...l.tasks.filter(t => t.status === destination.droppableId)];
        const [removed] = sourceTasks.splice(source.index, 1);

        // Update status of the moved task
        removed.status = destination.droppableId;

        // Insert into destination column
        destTasks.splice(destination.index, 0, removed);

        // Combine all tasks
        const newTasks = l.tasks
          .filter(t => t.status !== source.droppableId && t.status !== destination.droppableId)
          .concat(sourceTasks)
          .concat(destTasks);

        return { ...l, tasks: newTasks };
      });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Loading...</h2>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen">
      <div className='mb-14'>
        <Navbar />
      </div>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                filterText={filterText}
                filterPriority={filterPriority}
                filterTag={filterTag}
                filterDueDate={filterDueDate}
                filterPop={filterPop}
                setFilterPopup={setFilterPopup}
                setFilterDueDate={setFilterDueDate}
                setFilterPriority={setFilterPriority}
                setFilterTag={setFilterTag}
                setFilterText={setFilterText}

              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

function Column({ id, title, tasks, deleteTask, editPopup, setEditPopup, openEditPopup, filterText, filterPriority, filterTag, filterDueDate , filterPop, setFilterPopup, setFilterDueDate, setFilterPriority, setFilterTag, setFilterText }) {
  const color =
    title === 'To-Do' ? 'border-sky-300' :
    title === 'In-Progress' ? 'border-yellow-300' :
    'border-green-400';

  return (
    <div className={`bg-white rounded-xl p-4 border-t-4 ${color} shadow-sm`}>
      <div className="flex items-center justify-between mb-4 w-full relative  ">
        <h1 className="font-semibold text-slate-700 mb-3 text-lg">{title}</h1>
    <FilterIcon 
  className={`${title === 'To-Do' ? "block " : "hidden "} w-6 h-6 text-slate-700 cursor-pointer hover:text-slate-500 transition`}
  onClick={() => setFilterPopup(prev => !prev)}
/>


      </div>
      { filterPop && title === 'To-Do' && (
        
<div className="absolute left-20 top-24  max-[500px]:left-10  max-w-[600px]-left-10 z-50 w-80 bg-white shadow-xl rounded-2xl p-5 border border-slate-200">
  <h2 className="text-lg font-semibold text-slate-700 mb-3"> Filters</h2>

  {/* Title search */}
  <input 
    type="text" 
    placeholder="Search by title..." 
    value={filterText}
    onChange={(e) => setFilterText(e.target.value)}
    className="w-full border border-slate-300 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />

  {/* Priority filter */}
  <select 
    value={filterPriority} 
    onChange={(e) => setFilterPriority(e.target.value)}
    className="w-full border border-slate-300 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  >
    <option value="">All priorities</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  {/* Tag filter */}
  <input 
    type="text" 
    placeholder="Search by tag..." 
    value={filterTag}
    onChange={(e) => setFilterTag(e.target.value)}
    className="w-full border border-slate-300 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />

  {/* Due date filter */}
  <input 
    type="date" 
    value={filterDueDate}
    onChange={(e) => setFilterDueDate(e.target.value)}
    className="w-full border border-slate-300 rounded-xl px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />

  {/* Reset button */}
  <button
    onClick={() => {
      setFilterText('');
      setFilterPriority('');
      setFilterTag('');
      setFilterDueDate('');
    }}
    className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
  >
    Reset Filters
  </button>
</div>

)}
      <Droppable droppableId={id}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[100px]"
          >
     {tasks
  .filter(task => {
    const matchesTitle = filterText === '' || task.title.toLowerCase().includes(filterText.toLowerCase());
    const matchesPriority = filterPriority === '' || task.priority === filterPriority;
    const matchesTag = filterTag === '' || task.tags?.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()));
    const matchesDueDate = filterDueDate === '' || (task.dueDate && task.dueDate === filterDueDate);

    return matchesTitle && matchesPriority && matchesTag && matchesDueDate;
  })
  .map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                deleteTask={deleteTask}  
                editPopup={editPopup} 
                setEditPopup={setEditPopup} 
                openEditPopup={openEditPopup} 
              />
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

function TaskCard({ task, index, deleteTask, editPopup, setEditPopup, openEditPopup }) {
  const bgColor =
    task.status === 'Done' ? 'bg-green-100 border-green-300' :
    task.status === 'In-Progress' ? 'bg-yellow-100 border-yellow-300' :
    'bg-white border-slate-200';

  const tagColors = [
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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg border ${bgColor} p-4 shadow hover:shadow-md transition duration-200 cursor-pointer`}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this Task?')) {
              deleteTask(list.id,task.id);
            }
          }}
        >
          <div className="flex justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className='badges flex items-center justify-between gap-2 mb-2'>
                {task.dueDate && (
                  <div className={`flex items-center gap-1 text-xs text-gray-500 ${
                    task.status === 'Done' ? 'bg-green-50' :
                    task.status === 'In-Progress' ? 'bg-yellow-50' :
                    task.status === 'To-Do' ? 'bg-slate-50' : ""} 
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
              
              <div className={`flex items-center gap-2 min-w-0 p-2 rounded-lg transition-colors duration-150
                ${
                  task.status === 'Done' ? 'hover:bg-green-50' :
                  task.status === 'In-Progress' ? 'hover:bg-yellow-50' :
                  task.status === 'To-Do' ? 'hover:bg-slate-50' : ""} 
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

              {task.description && (
                <p
                  className="text-sm text-slate-600 mt-1 ml-9 break-words whitespace-normal overflow-y-auto max-h-16 pr-1"
                  style={{ overflowX: "hidden" }}
                >
                  {task.description}
                </p>
              )}
            </div>

            <button 
              onClick={() => openEditPopup(task.id)}
              className="self-start mt-10 hover:bg-gray-100 rounded-full transition-colors duration-150"
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

          <div className='dates flex items-center justify-between gap-2 mt-3 text-xs text-gray-500'>
            <div className={`flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full
              ${
                task.status === 'Done' ? 'bg-green-50' :
                task.status === 'In-Progress' ? 'bg-yellow-50' :
                task.status === 'To-Do' ? 'bg-slate-50' : ""} 
              `}>
              <CalendarDaysIcon className={`w-4 h-4
                ${
                  task.status === 'Done' ? 'text-green-600' :
                  task.status === 'In-Progress' ? 'text-yellow-600' : "" 
                }`} />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {task.tags?.map((tag, index) => (
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