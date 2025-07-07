const express = require("express")
const cron = require("node-cron")
const calculateXPandLVL = require("./helpers/xpManager")
const app = express()

cron.schedule("0 0 * * *", () => {
    
});
// call all routes here 
const authRouter = require("./routes/authRouter")
app.use('api/auth' ,authRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));