import { Task } from "../models/taskModel.js";

export async function getAllTasks(req, res){

    try{
        const tasks = await Task.find();

        res.status(200).json(tasks);

    }catch(error){
        res.status(400).json({
            erro: error.message
        });
    }
}