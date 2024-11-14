
import { useState, useEffect, useDeferredValue } from 'react';

import Navbar from './Navbar';

function TaskManager() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
  });

  // Function to add a task
  function addTask() {
    const task = {
      ...newTask,
      id: Date.now(),
      isCompleted: false,
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'High',
    });
  }

  // Function to delete a task
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Function to toggle task completion
  function toggleCompletion(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Function to edit a task
  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskData({
      title: taskToEdit.title,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
      priority: taskToEdit.priority,
    });
  }

  // Function to save the edited task
  function saveEditTask() {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, ...editTaskData } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditTaskId(null);
    setEditTaskData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'High',
    });
  }

  // // Function to filter tasks based on selected filters
  // function filterTasks() {
  //   let filtered = tasks;

  //   // Search filter
  //   if (searchQuery) {
  //     filtered = filtered.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         task.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   // Priority filter
  //   if (priorityFilter) {
  //     filtered = filtered.filter((task) => task.priority === priorityFilter);
  //   }

  //   // Status filter (Completed or Pending)
  //   if (statusFilter === 'completed') {
  //     filtered = filtered.filter((task) => task.isCompleted);
  //   } else if (statusFilter === 'pending') {
  //     filtered = filtered.filter((task) => !task.isCompleted);
  //   }

  //   // Date filter (Upcoming, Overdue, All)
  //   if (filter === 'upcoming') {
  //     filtered = filtered.filter((task) => new Date(task.dueDate) > new Date());
  //   } else if (filter === 'overdue') {
  //     filtered = filtered.filter((task) => new Date(task.dueDate) < new Date() && !task.isCompleted);
  //   } else if (filter === 'completed') {
  //     filtered = filtered.filter((task) => task.isCompleted);
  //   }

  //   return filtered;
  // }

  // Function to filter tasks based on selected filters
function filterTasks() {
  let filtered = tasks;

  // Search filter using deferred value
  if (deferredSearchQuery) {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(deferredSearchQuery.toLowerCase())
    );
  }

  // Priority filter
  if (priorityFilter) {
    filtered = filtered.filter((task) => task.priority === priorityFilter);
  }

  // Status filter (Completed or Pending)
  if (statusFilter === 'completed') {
    filtered = filtered.filter((task) => task.isCompleted);
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter((task) => !task.isCompleted);
  }

  // Date filter (Upcoming, Overdue, All)
  if (filter === 'upcoming') {
    filtered = filtered.filter((task) => new Date(task.dueDate) > new Date());
  } else if (filter === 'overdue') {
    filtered = filtered.filter(
      (task) => new Date(task.dueDate) < new Date() && !task.isCompleted
    );
  } else if (filter === 'completed') {
    filtered = filtered.filter((task) => task.isCompleted);
  }

  return filtered;
}


  // Get the filtered tasks
  const filteredTasks = filterTasks();

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-4 mt-[40px] border-[2px] border-black ">
      
      {/* Filter buttons */}
      <div className="mb-8 flex space-x-6">
        <button
          onClick={() => setFilter('all')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upcoming Tasks
        </button>
        <button
          onClick={() => setFilter('overdue')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Overdue Tasks
        </button>
        <button
          onClick={() => setFilter('completed')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Completed Tasks
        </button>
      </div>

     {/* Search and Priority Filters */}
<div className="mb-8 flex space-x-4">
  {/* Search Input */}
  <input
    type="text"
    className="border border-gray-300 p-2 rounded-md"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  {/* Priority Filter */}
  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="border border-gray-300 p-2 rounded-md"
  >
    <option value="">Filter by Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  {/* Status Filter */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border border-gray-300 p-2 rounded-md"
  >
    <option value="">Filter by Status</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>

  {/* Clear All Button */}
  <button
    onClick={() => {
      setSearchQuery('');
      setPriorityFilter('');
      setStatusFilter('');
    }}
    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
  >
    Clear All
  </button>
</div>


      {/* Task Input Form */}
<div className="mb-4 flex flex-col space-y-6 ">
  {/* Title Input */}
  <input
    type="text"
    className="border border-gray-300 p-2 rounded-md w-[500px]"
    placeholder="Title"
    value={newTask.title}
    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
  />

  
  <textarea
    className="border border-gray-300 p-2 rounded-md w-[500px] h-[150px] resize-none"
    placeholder="Description"
    value={newTask.description}
    onChange={(e) =>
      setNewTask({ ...newTask, description: e.target.value })
    }
  />

  {/* Due Date Input */}
  <input
    type="date"
    className="border border-gray-300 p-2 rounded-md w-1/4"
    value={newTask.dueDate}
    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
  />

  {/* Priority Select */}
  <select
    className="border border-gray-300 p-2 rounded-md w-1/4"
    value={newTask.priority}
    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  {/* Add Task Button */}
  <button
    onClick={addTask}
    className="bg-green-500 text-white px-4 py-2 rounded-md"
  >
    Add Task
  </button>
</div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="border p-4 rounded-md shadow-md">
            <div>
              <h3 className="font-bold text-xl">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-500">Due: {task.dueDate}</p>
              <p className="text-gray-500">Priority: {task.priority}</p>
              <p className="text-gray-500">
                Status: {task.isCompleted ? 'Completed' : 'Pending'}
              </p>
            </div>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => toggleCompletion(task.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Mark as {task.isCompleted ? 'Pending' : 'Completed'}
              </button>
              <button
                onClick={() => editTask(task.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editTaskId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 rounded-md w-full"
              value={editTaskData.title}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, title: e.target.value })
              }
              placeholder="Title"
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 rounded-md w-full"
              value={editTaskData.description}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
            <input
              type="date"
              className="border border-gray-300 p-2 mb-4 rounded-md w-full"
              value={editTaskData.dueDate}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, dueDate: e.target.value })
              }
            />
            <select
              className="border border-gray-300 p-2 mb-4 rounded-md w-full"
              value={editTaskData.priority}
              onChange={(e) =>
                setEditTaskData({ ...editTaskData, priority: e.target.value })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="space-x-2">
              <button
                onClick={saveEditTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditTaskId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default TaskManager;
