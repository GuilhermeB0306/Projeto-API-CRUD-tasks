import {Router} from "express"
import { postTask } from "../controllers/postTask.js";
import { getTaskById } from "../controllers/getTaskById.js";
import { getAllTasks } from "../controllers/getAllTasks.js";
import { patchTask } from "../controllers/patchTask.js";
import { deleteTask } from "../controllers/deleteTask.js";
export function registerRoutes(){
    const router = Router();

    router.post('/task',postTask)
    router.get('/task/:id', getTaskById)
    router.get('/task', getAllTasks)
    router.patch('/task/:id', patchTask)
    router.delete('/task/:id', deleteTask)
    return router;
}