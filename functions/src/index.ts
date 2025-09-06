/**
 * Backend API for FIAP Farms - Products
 */
import cors from "cors";
import express from "express";
import admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";

// Region + basic concurrency limits
setGlobalOptions({ region: "southamerica-east1", maxInstances: 10 });

// Initialize Admin SDK once
if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

// Express app
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// --- AUTH MIDDLEWARE (Firebase ID Token) -------------------------------
async function auth(req: any, res: any, next: any) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing_token" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "invalid_token" });
  }
}
function isAdmin(user: any): boolean {
  return user?.admin === true || user?.role === "admin";
}
// ----------------------------------------------------------------------

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// --- PRODUCTS CRUD -------------------------------------------------------
// Model (collection): products
// Fields:
//  - name: string (required)
//  - category: string (optional)
//  - cost: number (required)
//  - price: number (required)
//  - stock: number (required)
//  - createdAt: server timestamp
//  - updatedAt: server timestamp

function isNumber(n: any): n is number {
  return typeof n === "number" && !isNaN(n);
}
function isString(s: any): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

// List products (ordered by creation desc)
app.get("/products", async (_req, res) => {
  const snap = await db
    .collection("products")
    .orderBy("createdAt", "desc")
    .get();
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  res.json(data);
});

// Get one product by id
app.get("/products/:id", async (req, res) => {
  const ref = db.collection("products").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: "not_found" });
  return res.json({ id: doc.id, ...doc.data() });
});

// Create product
app.post("/products", auth, async (req: any, res) => {
  const { name, category, cost, price, stock } = req.body || {};
  if (
    !isString(name) ||
    !isNumber(cost) ||
    !isNumber(price) ||
    !isNumber(stock)
  ) {
    return res.status(400).json({
      error: "invalid_payload",
      details:
        "Expected { name:string, cost:number, price:number, stock:number, category?:string }",
    });
  }
  const ref = await db.collection("products").add({
    name: name.trim(),
    category: isString(category) ? category.trim() : null,
    cost,
    price,
    stock,
    ownerUid: req.user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return res.status(201).json({ id: ref.id });
});

// Update (partial) product
app.patch("/products/:id", auth, async (req: any, res) => {
  const patch: Record<string, any> = {};
  const { name, category, cost, price, stock } = req.body || {};
  if (name !== undefined) {
    if (!isString(name)) return res.status(400).json({ error: "invalid_name" });
    patch.name = name.trim();
  }
  if (category !== undefined) {
    if (category !== null && !isString(category))
      return res.status(400).json({ error: "invalid_category" });
    patch.category = category === null ? null : category.trim();
  }
  if (cost !== undefined) {
    if (!isNumber(cost)) return res.status(400).json({ error: "invalid_cost" });
    patch.cost = cost;
  }
  if (price !== undefined) {
    if (!isNumber(price))
      return res.status(400).json({ error: "invalid_price" });
    patch.price = price;
  }
  if (stock !== undefined) {
    if (!isNumber(stock))
      return res.status(400).json({ error: "invalid_stock" });
    patch.stock = stock;
  }
  if (Object.keys(patch).length === 0) {
    return res.status(400).json({ error: "empty_patch" });
  }
  patch.updatedAt = admin.firestore.FieldValue.serverTimestamp();

  const ref = db.collection("products").doc(req.params.id);
  const exists = (await ref.get()).exists;
  if (!exists) return res.status(404).json({ error: "not_found" });

  const current = (await ref.get()).data() || {};
  if (!isAdmin(req.user) && current.ownerUid !== req.user.uid) {
    return res.status(403).json({ error: "forbidden" });
  }

  await ref.update(patch);
  return res.json({ ok: true });
});

// Delete product
app.delete("/products/:id", auth, async (req: any, res) => {
  const ref = db.collection("products").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: "not_found" });
  const data = doc.data() || {};
  if (!isAdmin(req.user) && data.ownerUid !== req.user.uid) {
    return res.status(403).json({ error: "forbidden" });
  }
  await ref.delete();
  return res.status(204).send();
});
// ------------------------------------------------------------------------

// Keep simple ping for quick checks
export const ping = onRequest((req, res) => {
  logger.info("ping called");
  res.status(200).json({ ok: true, ts: Date.now() });
});

// Export Express app as HTTPS Function
export const api = onRequest(app);
