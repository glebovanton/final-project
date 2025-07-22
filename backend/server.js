const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true, metricsPath: '/api/metrics'});

app.use(metricsMiddleware);

const productsRoutes = require('./routes/products');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Сервер работает!' });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Что-то пошло не так!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📊 API доступен по адресу: http://localhost:${PORT}/api`);
  console.log('📊 API Version: 1.0.1');
});
