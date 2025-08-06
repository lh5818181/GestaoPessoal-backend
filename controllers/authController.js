exports.getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Usuário não autenticado' });

  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};
