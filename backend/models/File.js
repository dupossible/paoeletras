const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  titulo: String,
  imagem: String,  // nome do arquivo da imagem (capa)
  file: String,    // nome do arquivo real (PDF ou outro)
  dataEnvio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', FileSchema);
