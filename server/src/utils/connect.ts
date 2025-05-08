import config from "config"
import mongoose from "mongoose"
import logger from "./logger";
mongoose.set("strictQuery", true);
const connect = async () => {
    const connectionString = config.get<string>("dbUrl");
    try{
        await mongoose.connect(connectionString);
        
        logger.info("Connected to the database");
    }catch(error){
        logger.error("Error connecting to the database", error);
        process.exit(1);
    }
    
}
export default connect;