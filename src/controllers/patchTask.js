import { Task } from "../models/taskModel.js"

export async function patchTask(req,res){
    try{
        const {title, description, status, annotation} = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                $set: { title, description, status, annotation }
            },
            {
                returnDocument: "after",
                runValidators: true,
                omitUndefined: true
            }
        )
        if(!task){
            return res.status(404).json({ message: 'Tarefa não encontrado' });
        }
        res.json(task)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}