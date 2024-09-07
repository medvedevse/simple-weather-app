import express from 'express';
import { useWeatherStore } from './weatherStore';

const app = express();
const router = express.Router();

// Middleware to allow requests only from a specific VPN server
const allowVPNServer = (req, res, next) => {
  const allowedVPNServer = '46.8.233.113';
  const requestOrigin = req.headers.origin;

  if (requestOrigin === allowedVPNServer) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

// Apply the middleware to all routes
app.use(allowVPNServer);

router.get('/api/weather', allowVPNServer, (req, res) => {
  const weatherStore = useWeatherStore();

  try {
    weatherStore.getCity();

    if (weatherStore.emptyCityName) {
      res.status(400).json({ error: weatherStore.emptyCityName });
      return;
    }

    res.json({
      cityInfo: weatherStore.cityInfo,
      weatherData: weatherStore.weatherData,
      currentWeatherData: weatherStore.currentWeatherData
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
/* eslint-env node */
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
