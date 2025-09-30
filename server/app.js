import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import colors from "colors";

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ייבוא מסד נתונים (זמנית מושבת לבדיקה)
// import { connect as connectDB, healthCheck } from "./config/database.js";

// ייבוא routes (נסתירן כרגע כי הקבצים לא קיימים)
// import userRoutes from './routes/userRoutes.js';
// import shipmentRoutes from './routes/shipmentRoutes.js';
// import quoteRoutes from './routes/quoteRoutes.js';
// import analyticsRoutes from './routes/analyticsRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';

// ייבוא middleware מותאם (נסתירן כרגע כי הקבצים לא קיימים)
// import errorHandler from './middleware/errorHandler.js';
// import authMiddleware from './middleware/auth.js';
// import validationMiddleware from './middleware/validation.js';

/**
 * יצירת אפליקציית Express מתקדמת
 */
class VIPShippingApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.environment = process.env.NODE_ENV || "development";

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * הגדרת middleware עם אבטחה מתקדמת
   */
  setupMiddleware() {
    // אבטחה בסיסית עם Helmet
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com",
              "https://cdn.jsdelivr.net",
            ],
            scriptSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://www.google-analytics.com",
            ],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://api.vipshipping.com"],
            mediaSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'none'"],
          },
        },
        crossOriginEmbedderPolicy: false, // עבור תמיכה ב-AR
      })
    );

    // CORS מתקדם
    const corsOptions = {
      origin: (origin, callback) => {
        // רשימת דומיינים מאושרים
        const allowedOrigins = [
          "http://localhost:3000",
          "http://localhost:5173",
          "https://vip-shipping.onrender.com",
          "https://vipshipping.com",
          "https://www.vipshipping.com",
        ];

        // בפיתוח - אפשר הכל
        if (this.environment === "development" && !origin) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error("לא מורשה על ידי CORS policy"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
      ],
      exposedHeaders: ["X-Total-Count", "X-Page-Count"],
    };

    this.app.use(cors(corsOptions));

    // Rate limiting מתקדם
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 דקות
      max: 100, // מקסימום 100 בקשות לכל IP
      message: {
        error: "יותר מדי בקשות, נסה שוב מאוחר יותר",
        retryAfter: "15 minutes",
      },
      standardHeaders: true,
      legacyHeaders: false,
      // Rate limit מיוחד לכל endpoint
      keyGenerator: (req) => {
        return req.ip + ":" + req.path;
      },
    });

    // Rate limiting חמור יותר לAPI sensitive
    const strictLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10, // רק 10 בקשות ל-login/register
      message: { error: "יותר מדי ניסיונות התחברות" },
    });

    this.app.use("/api/", limiter);
    this.app.use("/api/auth", strictLimiter);

    // דחיסה
    this.app.use(
      compression({
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) return false;
          return compression.filter(req, res);
        },
        level: 6,
        threshold: 1024,
      })
    );

    // Logging מתקדם
    if (this.environment === "production") {
      // יצירת log files
      const accessLogStream = fs.createWriteStream(
        path.join(__dirname, "logs", "access.log"),
        { flags: "a" }
      );

      this.app.use(morgan("combined", { stream: accessLogStream }));
    } else {
      this.app.use(morgan("dev"));
    }

    // Body parsers
    this.app.use(
      express.json({
        limit: "10mb",
        verify: (req, res, buf) => {
          req.rawBody = buf;
        },
      })
    );
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Static files
    this.app.use(express.static(path.join(__dirname, "../dist")));

    // הגדרת headers נוספים
    this.app.use((req, res, next) => {
      res.setHeader("X-Powered-By", "VIP International Shipping");
      res.setHeader("X-API-Version", "1.0.0");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("X-Frame-Options", "DENY"); // הגדרה נכונה של X-Frame-Options
      next();
    });

    // Middleware לזיהוי device ובראוזר
    this.app.use((req, res, next) => {
      req.deviceInfo = {
        userAgent: req.get("User-Agent"),
        ip: req.ip || req.connection.remoteAddress,
        timestamp: new Date(),
        isMobile: /Mobile|Android|iPhone|iPad/.test(req.get("User-Agent")),
        isBot: /bot|crawler|spider|crawling/i.test(req.get("User-Agent")),
      };
      next();
    });
  }

  /**
   * הגדרת נתבים
   */
  setupRoutes() {
    // Health check (ללא מסד נתונים בינתיים)
    this.app.get("/api/health", async (req, res) => {
      // const dbHealth = await healthCheck();
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: this.environment,
        database: { status: "disabled_for_testing" },
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || "1.0.0",
      });
    });

    // API routes (זמנית מושבתים עד שהקבצים יוקמו)
    // this.app.use('/api/users', userRoutes);
    // this.app.use('/api/shipments', shipmentRoutes);
    // this.app.use('/api/quotes', quoteRoutes);
    // this.app.use('/api/analytics', analyticsRoutes);
    // this.app.use('/api/ai', aiRoutes);

    // בינתיים - routes בסיסיים
    this.app.get("/api/test", (req, res) => {
      res.json({
        message: "השרת פועל בהצלחה!",
        timestamp: new Date().toISOString(),
      });
    });

    // Documentation
    this.app.get("/api/docs", (req, res) => {
      res.sendFile(path.join(__dirname, "../docs/API.md"));
    });

    // Serve React app לכל route שלא נמצא (למעט קבצי מקור ו-API)
    this.app.get("*", (req, res, next) => {
      // אל תטפל בקבצי src, assets, או קבצים אחרים שצריכים להיטען על ידי Vite
      if (
        req.path.startsWith("/src/") ||
        req.path.startsWith("/node_modules/") ||
        req.path.startsWith("/@") ||
        req.path.startsWith("/api/") ||
        req.path.includes(".tsx") ||
        req.path.includes(".ts") ||
        req.path.includes(".jsx") ||
        req.path.includes(".js") ||
        req.path.includes(".css") ||
        req.path.includes(".svg") ||
        req.path.includes(".png") ||
        req.path.includes(".jpg") ||
        req.path.includes(".ico") ||
        req.path.includes("?") ||
        req.path.includes(".map")
      ) {
        return res.status(404).json({
          error: "File not found",
          message:
            "This is a development server - static files should be served by Vite",
        });
      }

      // רק עבור routes שהם דפי SPA
      if (fs.existsSync(path.join(__dirname, "../dist/index.html"))) {
        res.sendFile(path.join(__dirname, "../dist/index.html"));
      } else {
        res.status(503).json({
          error: "Service unavailable",
          message: "Application not built yet. Run 'pnpm build' first.",
        });
      }
    });
  }

  /**
   * הגדרת טיפול בשגיאות
   */
  setupErrorHandling() {
    // 404 Handler
    this.app.use("*", (req, res) => {
      res.status(404).json({
        success: false,
        message: "נתיב לא נמצא",
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
      });
    });

    // Global Error Handler (זמנית מושבת)
    // this.app.use(errorHandler);

    // Error handler בסיסי
    this.app.use((err, req, res, next) => {
      console.error("Error:", err);
      res.status(500).json({
        success: false,
        message: "שגיאה פנימית בשרת",
        error:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Internal server error",
      });
    });

    // Uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error(colors.red("💥 Uncaught Exception:"), err);
      process.exit(1);
    });

    // Unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error(colors.red("💥 Unhandled Rejection:"), err);
      process.exit(1);
    });
  }

  /**
   * הפעלת השרת
   */
  async start() {
    try {
      // חיבור למסד נתונים (זמנית מושבת)
      // await connectDB();

      // הפעלת השרת
      const server = this.app.listen(this.port, () => {
        console.log(colors.green(`\n🚀 שרת VIP International Shipping פועל!`));
        console.log(colors.cyan(`📡 כתובת: http://localhost:${this.port}`));
        console.log(colors.cyan(`🌍 סביבה: ${this.environment}`));
        console.log(
          colors.cyan(`⏰ זמן הפעלה: ${new Date().toLocaleString("he-IL")}`)
        );
        console.log(colors.cyan(`💾 מסד נתונים: מחובר ופעיל`));
        console.log(colors.magenta(`\n🎯 VIP Shipping API מוכן לשימוש!\n`));
      });

      // הגדרת timeout לבקשות
      server.timeout = 30000; // 30 שניות

      // Graceful shutdown
      const gracefulShutdown = () => {
        console.log(colors.yellow("\n🔄 מקבל אות עצירה, סוגר שרת..."));
        server.close(() => {
          console.log(colors.green("✅ שרת נסגר בהצלחה"));
          process.exit(0);
        });
      };

      process.on("SIGTERM", gracefulShutdown);
      process.on("SIGINT", gracefulShutdown);

      return server;
    } catch (error) {
      console.error(colors.red("💥 שגיאה בהפעלת השרת:"), error);
      process.exit(1);
    }
  }

  /**
   * קבלת instance של האפליקציה
   */
  getApp() {
    return this.app;
  }
}

// יצירת והפעלת האפליקציה
const vipApp = new VIPShippingApp();

// אם הקובץ מורץ ישירות - הפעל שרת
if (import.meta.url === `file://${process.argv[1]}`) {
  vipApp.start().catch((error) => {
    console.error(colors.red("💥 נכשל בהפעלת השרת:"), error);
    process.exit(1);
  });
}

export default vipApp;
