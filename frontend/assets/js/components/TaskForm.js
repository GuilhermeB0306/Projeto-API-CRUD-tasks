import { updateTask } from "../api/taskApi.js";
import { EventBus } from "../core/eventBus.js";

export default class TaskForm {
    constructor() {
        this.form       = document.getElementById("edit-mode");
        this.titleInput = document.getElementById("edit-title");
        this.descInput  = document.getElementById("edit-desc");
        this.noteInput  = document.getElementById("edit-note");
        this.saveBtn    = document.getElementById("save-btn");
        this.cancelBtn = document.getElementById("cancel-btn");

        this.task = null;

        EventBus.on("task:edit", task => this.setTask(task));

        this.bindEvents();
    }  
    bindEvents() {
        this.cancelBtn.addEventListener("click",() => EventBus.emit("task:editCancel"));
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    setTask(task) {
        this.task = task;
        this.titleInput.value = task.title;
        this.descInput.value  = task.description;
        this.noteInput.value  = task.annotation || "";
    }

    async handleSubmit() {
        try {
            this.setLoading(true);
            await updateTask(this.task._id, {
                title:       this.titleInput.value,
                description: this.descInput.value,
                annotation:  this.noteInput.value,
            });

            EventBus.emit("task:saved");
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar a task");
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(state) {
        this.saveBtn.disabled   = state;
        this.saveBtn.innerText  = state ? "Salvando..." : "Salvar";
    }
}