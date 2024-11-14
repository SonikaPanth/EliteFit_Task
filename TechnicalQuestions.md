# Answers to Technical Questions

### 1. How long did you spend on the coding test?

I spent **2 days** working on the coding test. This time was used for:
- Understanding the requirements.
- Implementing the core features.
- Testing the application to ensure it works as expected.
- Refining the code for performance and readability.

### 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it?

For my Task Management Application built using React, one of the most useful features added in the recent versions of React is the useDeferredValue hook, introduced in React 18.

Feature Explanation:
useDeferredValue: This hook helps to manage expensive computations or updates that do not need to be processed immediately. It allows you to defer updates to lower-priority state changes without blocking the main UI updates. This is especially useful in scenarios like search or filtering where a user input change might trigger a large list of filtered results.

Usage in My Project:
In my Task Management Application, when a user types into the search bar, the filtering process can be deferred using useDeferredValue. This improves the user experience by preventing the UI from freezing during expensive state updates, especially when dealing with a large number of tasks.

###  Code Snippet

const [searchQuery, setSearchQuery] = useState('');
const deferredSearchQuery = useDeferredValue(searchQuery); // Using useDeferredValue hook

// Function to filter tasks based on selected filters
function filterTasks() {
  let filtered = tasks;

  
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




### 3. How would you track down the performance issue in production?

When dealing with performance issues in a production environment, it's crucial to follow a systematic approach to identify the root cause without causing further disruptions. Here's a step-by-step process you can use:

1. Identify Hot Spots with Profiling

Frontend Profiling: Use the React DevTools Profiler to track down slow components or unnecessary re-renders. This helps you pinpoint components that need optimization, like reducing re-renders or using React.memo.

2. Optimize the Code
Frontend Optimization: Debounce expensive state updates like search or filtering, split large components into smaller ones, and use lazy loading (React.lazy).
Example: In task management app, we can use useMemo to cache filtered tasks:

const filteredTasks = useMemo(() => filterTasks(), [tasks, filter, searchQuery]);

3. Use Performance Monitoring Tools

Application Performance Monitoring (APM): Tools like New Relic, Datadog, and Dynatrace can provide deep insights into your application performance, tracing the request lifecycle from frontend to backend.
Real User Monitoring (RUM): Use tools like Google Lighthouse or Web Vitals to measure the user experience in real-time.

Suppose working on Task Management App in production. Suddenly, users start reporting slow performance when searching for tasks.

Initial Investigation:  check your APM tool (e.g., New Relic) and see that the search endpoint has high response times.

Profiling: Using Node.js profiling, you discover a slow function that filters tasks in memory instead of using MongoDB's capabilities.

Optimization: You refactor the filtering logic to offload it to MongoDB with optimized queries and indexing, significantly reducing response time.
This approach helped in pinpointing the issue and fixing it effectively.

### 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time to enhance the Task Management Application, I would consider adding the following features and improvements to make it more robust, user-friendly, and efficient:

Collaborative Features

Feature:  Allow users to share tasks with others and assign tasks to specific users in a collaborative workspace.
          Add a commenting feature within tasks so team members can discuss updates or changes.

 Notifications and Reminders
 
Feature: Add notifications and reminders using Web Push Notifications or Email Alerts to remind users of upcoming or overdue tasks.
Benefit: This helps users stay on track with their tasks and improves time management.

Dark Mode and Customizable Themes

Feature: Add dark mode and customizable themes using CSS variables or Tailwind CSS theme support.

 Task Attachments
 
Feature: Allow users to upload and attach files (e.g., documents, images) to tasks.
Benefit: Users can keep relevant files or references within the task, making it easier to track project-related materials.

 
