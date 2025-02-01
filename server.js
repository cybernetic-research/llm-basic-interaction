const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { ip, port, model, inputText } = req.body;
    const url = `http://${ip}:${port}/v1/chat/completions`;

    try {
        const response = await axios.post(url, {
            model: model,
            messages: [{ role: "user", content: inputText }]
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
