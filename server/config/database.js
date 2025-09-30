import mongoose from "mongoose";
import colors from "colors";

/**
 * חיבור למסד נתונים MongoDB
 */
export const connect = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/vip-shipping";

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURI, options);

    console.log(colors.green("✅ מחובר למסד נתונים MongoDB"));
    return true;
  } catch (error) {
    console.error(colors.red("❌ שגיאה בחיבור למסד נתונים:"), error.message);

    // במצב פיתוח - נמשיך בלי מסד נתונים
    if (process.env.NODE_ENV === "development") {
      console.log(colors.yellow("⚠️ ממשיך בלי מסד נתונים במצב פיתוח"));
      return false;
    }

    throw error;
  }
};

/**
 * בדיקת בריאות מסד הנתונים
 */
export const healthCheck = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      return {
        status: "connected",
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name,
      };
    } else {
      return {
        status: "disconnected",
        readyState: mongoose.connection.readyState,
      };
    }
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    };
  }
};

/**
 * ניתוק מסד נתונים
 */
export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log(colors.yellow("🔌 מנותק ממסד הנתונים"));
  } catch (error) {
    console.error(colors.red("❌ שגיאה בניתוק ממסד הנתונים:"), error);
  }
};

// טיפול באירועי חיבור
mongoose.connection.on("connected", () => {
  console.log(colors.cyan("🔗 Mongoose מחובר ל-MongoDB"));
});

mongoose.connection.on("error", (err) => {
  console.error(colors.red("❌ שגיאה ב-Mongoose:"), err);
});

mongoose.connection.on("disconnected", () => {
  console.log(colors.yellow("🔌 Mongoose מנותק מ-MongoDB"));
});

// סגירה graceful
process.on("SIGINT", async () => {
  await disconnect();
  process.exit(0);
});
