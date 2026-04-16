import "dotenv/config";
import express from "express"
import { registerRoutes } from "./src/views/routes.js";
import { mongooseConnection } from "./src/service/mongooseConnection.js";
import cors from "cors";
async function bootstrap(){
    try{
        await mongooseConnection();

        const server = express();
        server.use(express.json());
        server.use(cors());
        server.use("/api",registerRoutes());
        server.listen(process.env.PORT, () => console.log("Estamos Online"));
    }catch(error){
        console.error("Erro ao iniciar:", error);
    }

}
bootstrap();