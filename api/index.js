import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'; // Assurez-vous que dotenv est correctement configuré
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import produitRouter from "./routes/produit.route.js";
import commandeRouter from "./routes/commande.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import promClient from "prom-client";  // Import de prom-client pour les métriques

// Initialisation de l'application Express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*",
  credentials: true,
}));

const expressServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

// Créer un registre Prometheus pour collecter les métriques
const register = new promClient.Registry();

// Collecte des métriques par défaut (comme le nombre de requêtes HTTP)
promClient.collectDefaultMetrics({ register });

// Créer des métriques personnalisées pour les requêtes HTTP
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests made',
  labelNames: ['method', 'code']
});

// Ajouter un middleware pour compter les requêtes HTTP
app.use((req, res, next) => {
  res.on('finish', () => {
    // Incrémenter le compteur pour les requêtes HTTP
    httpRequestsTotal.inc({
      method: req.method,
      code: res.statusCode
    });
  });
  next();
});

// Exposer les métriques Prometheus à l'endpoint /metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await register.metrics());  // Exposer les métriques
  } catch (err) {
    res.status(500).end(err);
  }
});

// Connect to the database
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

// Routes
app.use("/abdellino/users", userRouter);
app.use("/abdellino/auth", authRouter);
app.use("/abdellino/produits", produitRouter);
app.use("/abdellino/commandes", commandeRouter);

// Deployment settings
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  const staticFilesPath = path.join(__dirname, "client", "dist");
  app.use(express.static(staticFilesPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticFilesPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API listing...");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Socket.io setup
const io = new Server(expressServer, {
  cors: {
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  },
});

// Start server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export default () => expressServer;
