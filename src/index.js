const http = require("http");
const routes = require("./routes/transaction.route"); 
const runMigrations = require("./configs/db-migration.config");


const PORT = process.env.PORT || 3000;

const startServer = async () => {

    try {

        // run migrations script
        await runMigrations()
       
        const server = http.createServer((req, res) => {
           res.setHeader("Content-Type", "application/json")

            // routes    
            routes(req, res);
        });

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to server:", error);
    }
};

startServer();
