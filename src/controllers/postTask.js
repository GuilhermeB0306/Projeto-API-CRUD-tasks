import { Task } from "../models/taskModel.js";

export async function postTask(req, res){
    try{
        const task = await Task.create(req.body);

        res.status(201).json(task);
    }catch(error){
        res.status(400).json({
            erro: error.message
        });
    }
}