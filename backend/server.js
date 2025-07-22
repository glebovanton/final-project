const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });


const productsRoutes = require('./routes/products');
const client = require('prom-client');

// Создаём реестр
const register = new client.Registry();

// Собираем метрики по умолчанию (CPU, память и т.д.)
client.collectDefaultMetrics({ register });

// Кастомная метрика: счетчик запросов
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Количество HTTP-запросов по маршрутам',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestCounter);

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
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
