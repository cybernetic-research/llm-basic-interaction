const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Increase the payload limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { ip, port, model, messages } = req.body;
    const url = `http://${ip}:${port}/v1/chat/completions`;
    console.log('Received request:', req.body);

    console.log('Received image:', messages.images);
    try {
        const response = await axios.post(url, {
            model: model,
            messages: messages
        });
        console.log('Response from API:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error from API:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



