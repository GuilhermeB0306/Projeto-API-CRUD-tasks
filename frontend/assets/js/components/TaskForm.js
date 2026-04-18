import { createTask, updateTask } from "../api/taskApi.js";
import { EventBus } from "../core/eventBus.js";

export default class TaskForm {
    constructor() {
        this.task   = null;
        this._bound = false;

        EventBus.on("task:edit",   task => this.setTask(task));
        EventBus.on("task:create", ()   => this.setTask(null));
    }

   bindElements() {
        this.form       = document.getElementById("edit-mode");
        this.titleInput = document.getElementById("edit-title");
        this.descInput  = document.getElementById("edit-desc");
        this.noteInput  = document.getElementById("edit-note");
        this.saveBtn    = document.getElementById("save-btn");
        this.cancelBtn  = document.getElementById("cancel-btn");
    }

    bindEvents() {
        if (this._bound) return;

        this.cancelBtn.addEventListener("click", () => EventBus.emit("task:editCancel"));
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.handleSubmit();
        });

        this._bound = true;
    }

    setTask(task = null) {
        this.bindElements(); 
        this.bindEvents();   

        this.task = task;

        this.titleInput.value = task?.title       ?? "";
        this.descInput.value  = task?.description ?? "";
        this.noteInput.value  = task?.annotation  ?? "";

        this.saveBtn.innerText = task ? "Salvar" : "Criar";
    }

    async handleSubmit() {
        const data = {
            title:       this.titleInput.value,
            description: this.descInput.value,
            annotation:  this.noteInput.value,
        };

        try {
            this.setLoading(true);

            if (this.task) {
                await updateTask(this.task._id, data);
                EventBus.emit("task:saved");
            } else {
                await createTask(data);
                EventBus.emit("task:created");
                EventBus.emit("task:saved");
            }

        } catch (err) {
            console.error(err);
            alert(`Erro ao ${this.task ? "salvar" : "criar"} a task`);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(state) {
        this.saveBtn.disabled  = state;
        this.saveBtn.innerText = state ? "Salvando..." : (this.task ? "Salvar" : "Criar");
    }
}