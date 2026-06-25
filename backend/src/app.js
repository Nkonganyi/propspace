import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes
from "./routes/authRoutes.js";

import userRoutes
from "./routes/userRoutes.js";

import propertyRoutes
from "./routes/propertyRoutes.js";

import uploadRoutes
from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app =
express();

app.use(
 cors()
);

app.use(
 express.json()
);

// Serves files saved by the upload endpoint, e.g. /uploads/169...-photo.jpg
app.use(
 "/uploads",
 express.static(path.join(__dirname, "../uploads"))
);

app.use(
 "/api/auth",
 authRoutes
);

app.use(
 "/api/users",
 userRoutes
);

app.use(
 "/api/properties",
 propertyRoutes
);

app.use(
 "/api/upload",
 uploadRoutes
);

app.use(notFound);
app.use(errorHandler);

export default app;