import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import ollama from 'ollama';

const app = express();
const port = 3000;

// Increase the payload limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { ip, port, model, messages } = req.body;
    const url = `http://${ip}:${port}/v1/chat/completions`;
    console.log('Received request:', req.body);

    let img = messages[0].images;
    console.log('Received image:', img);

    try {
        const response = await ollama.chat({
            model: model,
            messages: [{
                role: 'user',
                content: messages[0].content,
                images: img
            }]
        });
        console.log('response:',response);
        res.json(response);
    } catch (error) {
        console.error('Error from API:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



