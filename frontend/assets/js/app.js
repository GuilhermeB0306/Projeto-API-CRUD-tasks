import TaskRender from "./components/TaskRender.js";
import TaskModal  from "./components/TaskModal.js";
import TaskForm   from "./components/TaskForm.js";

const render = new TaskRender();
new TaskModal();
new TaskForm();

render.loadTasks();