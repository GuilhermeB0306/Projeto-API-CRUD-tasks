import { Task } from "../models/taskModel.js";

export async function deleteTask(req, res){
    try{
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
        return res.status(404).json({message: "Tarefa não encontrada"})
    }
    res.json({message:"Tarefa deletado"})
    }catch(error){
        return res.status(400).json("error: error.message")
    }
}