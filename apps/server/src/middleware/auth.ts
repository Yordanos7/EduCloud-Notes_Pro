import type express from "express";
import { auth } from "@cloudCB/auth";

export async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    console.log(
      "Auth middleware - checking session for:",
      req.method,
      req.path
    );
    console.log("Cookies:", req.headers.cookie);

    // Get session from Better-Auth using the request
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    console.log("Session found:", session ? "Yes" : "No");

    if (!session) {
      console.log("No session - returning 401");
      return res.status(401).json({ error: "Unauthorized - No valid session" });
    }

    console.log("User authenticated:", session.user.id);

    // Add user ID to headers for route handlers
    req.headers["x-user-id"] = session.user.id;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
