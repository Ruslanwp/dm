import { config } from "dotenv";
import path from "path";

export const initEnvConfig = () => {
    config({
        path: path.join(__dirname, "..","..",".env")
    });
};
