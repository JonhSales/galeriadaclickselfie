const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório para armazenar os arquivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Diretório para servir arquivos estáticos

// Endpoint para upload de arquivos
app.post('/upload', upload.array('photos'), (req, res) => {
    try {
        // Acessar os arquivos enviados
        console.log(req.files);
        res.json({ message: 'Arquivos enviados com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar o upload:', error);
        res.status(500).json({ message: 'Erro ao processar o upload.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
