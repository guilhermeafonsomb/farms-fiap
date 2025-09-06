// lib/api.ts
import { getIdToken } from "./auth";
import { BASE_URL } from "./config";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getIdToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const api = {
  health: () => request<{ ok: boolean }>(`/health`),
  listProducts: () => request<any[]>(`/products`),
  createProduct: (p: {
    name: string;
    category?: string | null;
    cost: number;
    price: number;
    stock: number;
  }) =>
    request<{ id: string }>(`/products`, {
      method: "POST",
      body: JSON.stringify(p),
    }),
  getProduct: (id: string) => request<any>(`/products/${id}`),
  updateProduct: (
    id: string,
    patch: Partial<{
      name: string;
      category: string | null;
      cost: number;
      price: number;
      stock: number;
    }>
  ) =>
    request<{ ok: true }>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteProduct: async (id: string) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${await getIdToken()}` },
    }).then(async (r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return true as const;
    }),
};
