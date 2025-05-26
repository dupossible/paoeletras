const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

// Configuração do multer para salvar arquivos em 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Rota para upload com campos de imagem e arquivo
router.post('/upload', upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), fileController.uploadFile);

// Rota para listar arquivos
router.get('/', fileController.getFiles);
module.exports = router;
