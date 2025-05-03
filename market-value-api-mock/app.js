const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/currentValue", (request, response) => {
    const marketValue = {
        "Value" : (Math.random() * (90000000 - 900000) + 900000).toFixed(2)
    }

    response.send(marketValue);
});
