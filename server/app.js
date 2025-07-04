const express = require("express")
const app = express()

// call all routes here 
const authRouter = require("./routes/authRouter")
app.use('api/auth' ,authRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));