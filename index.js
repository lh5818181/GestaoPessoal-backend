const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // 🔥 IMPORTANTE
require('dotenv').config(); // 🔐 Para ler o .env

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Rota de registro - apenas simula o cadastro por enquanto.
 */
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Novo cadastro:', { name, email, password });

  // Simulação de sucesso
  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

/**
 * Rota de login - só aceita email e senha fixos
 */
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Usuário de teste
  if (email === 'admin@email.com' && password === '123456') {
    // Gera um token fake com dados do usuário
    const token = jwt.sign(
      { id: 1, name: 'Admin Teste', email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: {
        id: 1,
        name: 'Admin Teste',
        email,
      },
    });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

/**
 * Middleware para proteger rotas com token JWT
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/**
 * Rota protegida para buscar dados do usuário autenticado
 */
app.get('/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

/**
 * Inicializa o servidor
 */
app.listen(5000, () => {
  console.log('API rodando em http://localhost:5000');
});
