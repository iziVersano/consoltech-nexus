// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

// Auth helpers
export const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('adminToken');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// API helper function
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      window.location.href = '/admin/login';
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Auth API
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Products API
export const getProducts = async (): Promise<Product[]> => {
  return fetchApi('/products');
};

export const getProduct = async (id: number): Promise<Product> => {
  return fetchApi(`/products/${id}`);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return fetchApi('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id: number, product: Product): Promise<void> => {
  return fetchApi(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  return fetchApi(`/products/${id}`, {
    method: 'DELETE',
  });
};

