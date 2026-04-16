import mongoose from "mongoose";
export async function mongooseConnection(){
    try{
        await mongoose.connect(process.env.CONNECTION_STRING_MONGO)
        console.log("Conectado Ao Banco")
    }catch (error){
        console.log("Erro ao conectar no banco", error)
    }
    
}