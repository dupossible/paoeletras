const File = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    const { titulo } = req.body;

    const imagem = req.files['imagem'] ? req.files['imagem'][0].filename : null;
    const file = req.files['file'] ? req.files['file'][0].filename : null;

    const novoArquivo = new File({
      titulo,
      imagem,
      file
    });

    await novoArquivo.save();

    res.status(201).json({ message: 'Arquivo enviado com sucesso!', arquivo: novoArquivo });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar o arquivo.', error: err.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const arquivos = await File.find().sort({ dataEnvio: -1 });
    res.json(arquivos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar arquivos.' });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;

    const atualizado = await File.findByIdAndUpdate(
      id,
      { titulo },
      { new: true }
    );

    if (!atualizado) {
      return res.status(404).json({ message: 'Arquivo não encontrado.' });
    }

    res.json({ message: 'Arquivo atualizado com sucesso.', arquivo: atualizado });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar.', error: err.message });
  }
};

