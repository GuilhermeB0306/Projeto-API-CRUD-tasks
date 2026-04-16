import { Task } from "../models/taskModel.js";

export async function getTaskById(req, res){

    try{
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                erro: "Tarefa não encontrada"
            });
        }

        res.status(200).json(task);

    }catch(error){
        res.status(400).json({
            erro: error.message
        });
    }
}