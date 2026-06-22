import express from "express";
import cors from "cors";

import authRoutes
from "./routes/authRoutes.js";

import userRoutes
from "./routes/userRoutes.js";

import propertyRoutes
from "./routes/propertyRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app =
express();

app.use(
 cors()
);

app.use(
 express.json()
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

app.use(notFound);
app.use(errorHandler);

export default app;