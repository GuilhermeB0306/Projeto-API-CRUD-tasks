import { fetchTasks } from "../api/taskApi.js";
import { EventBus } from "../core/eventBus.js";

export default class TaskRender {
    constructor() {
        this.columns = {
            todo:  document.querySelector("#todo .tasks"),
            doing: document.querySelector("#doing .tasks"),
            done:  document.querySelector("#done .tasks"),
        };

        EventBus.on("task:saved", () => this.loadTasks());
    }

    async loadTasks() {
        const tasks = await fetchTasks();
        const formatted = tasks.map(task => ({
            ...task,
            date: new Date(task.createdAt).toLocaleString("pt-BR"),
        }));

        this.clearColumns();
        this.render(formatted);
    }

    clearColumns() {
        Object.values(this.columns).forEach(col => col.innerHTML = "");
    }

    render(tasks) {
        tasks.forEach(task => {
            const card = document.createElement("div");
            card.classList.add("task", task.status);
            card.textContent = task.title;

            card.addEventListener("click", () => {
                EventBus.emit("task:selected", task);
            });

            this.columns[task.status]?.appendChild(card);
        });
    }
}