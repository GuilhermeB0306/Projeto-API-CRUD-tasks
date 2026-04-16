import { EventBus } from "../core/eventBus.js";
import { deleteTask } from "../api/taskApi.js";
export default class TaskModal {
    constructor() {
        this.modal    = document.getElementById("modal");
        this.view     = document.getElementById("view-mode");
        this.edit     = document.getElementById("edit-mode");

        this.titleEl  = document.getElementById("modal-title");
        this.descEl   = document.getElementById("modal-desc");
        this.noteEl   = document.getElementById("modal-note");
        this.dateEl   = document.getElementById("modal-date");

        this.closeBtn  = document.getElementById("close-btn");
        this.editBtn   = document.getElementById("edit-btn");
        this.deleteBtn = document.getElementById("delete-btn")

        this.task = null;

        this.bindEvents();

        EventBus.on("task:selected", task => this.open(task));

        EventBus.on("task:editCancel", () => this.showView())

        EventBus.on("task:saved", () => this.close());
    }

    bindEvents() {
        this.closeBtn.addEventListener("click",  () => this.close());
        this.editBtn.addEventListener("click",   () => this.showEdit());
        this.deleteBtn.addEventListener("click", () => this.handleDelete());
    }

    open(task) {
        this.task = task;
        this.titleEl.innerText = task.title;
        this.descEl.innerText  = task.description;
        this.noteEl.innerText  = task.annotation || "";
        this.dateEl.innerText  = task.date || "";
        this.modal.classList.remove("hidden");
        this.showView();
    }

    close() {
        this.modal.classList.add("hidden");
        this.task = null;
    }

    showView() {
        this.view.style.display = "block";
        this.edit.style.display = "none";
    }

    showEdit() {
        this.view.style.display = "none";
        this.edit.style.display = "block";
       
        EventBus.emit("task:edit", this.task);
    }

   async handleDelete(){
        try{
            await deleteTask(this.task._id);
            EventBus.emit("task:saved");
        }catch(error){
            console.error(error);
            alert("Erro ao deletar a task 😢");
        }
    }
}