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

// Fallback products data (used when API is unavailable)
// Nintendo Switch 2 is FIRST for priority display
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 0,
    title: "Nintendo Switch 2",
    description: "The next generation of Nintendo gaming. Experience enhanced graphics, faster performance, and an expanded game library. Features a larger display, improved Joy-Con controllers, and backward compatibility.",
    category: "Gaming",
    imageUrl: "/images/nintendo-switch-2-product.jpg",
    price: 449.99
  },
  {
    id: 1,
    title: "PlayStation 5",
    description: "Next-generation gaming console with ultra-fast SSD and ray tracing technology. Experience lightning-fast loading and stunning graphics.",
    category: "Gaming",
    imageUrl: "/images/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png",
    price: 499.99
  },
  {
    id: 2,
    title: "Xbox Series X",
    description: "The most powerful Xbox ever with 12 teraflops of GPU performance and Smart Delivery technology.",
    category: "Gaming",
    imageUrl: "/images/78a95f48-606e-44b6-950e-af0555a3f04f.png",
    price: 449.99
  },
  {
    id: 3,
    title: "Professional Drones",
    description: "High-performance drones for commercial photography, surveying, and recreational flying with advanced stabilization.",
    category: "Drones",
    imageUrl: "/images/07ba8bc0-8d14-4d62-a534-659913ac5f99.png",
    price: 1299.99
  },
  {
    id: 4,
    title: "Smart E-Bikes",
    description: "Electric bikes with smart connectivity, long-range batteries, and advanced motor systems for urban mobility.",
    category: "E-Bikes",
    imageUrl: "/images/a0bd3ab6-05d5-4312-b6ec-f0e256d7a63a.png",
    price: 1899.99
  },
  {
    id: 5,
    title: "4K Smart TVs",
    description: "Ultra-high definition smart TVs with AI upscaling, HDR support, and built-in streaming platforms.",
    category: "TVs",
    imageUrl: "/images/6df37998-af04-426e-b749-365ffeb66787.png",
    price: 799.99
  },
  {
    id: 6,
    title: "Gaming Accessories",
    description: "Premium gaming peripherals including controllers, headsets, and racing wheels from top brands.",
    category: "Gaming",
    imageUrl: "/images/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png",
    price: 149.99
  },
  {
    id: 7,
    title: "Smart Home Electronics",
    description: "Connected home devices including smart speakers, security cameras, and automation systems.",
    category: "Electronics",
    imageUrl: "/images/6df37998-af04-426e-b749-365ffeb66787.png",
    price: 299.99
  }
];

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
  try {
    const products = await fetchApi('/products');
    // Ensure Nintendo Switch 2 is first if it exists in API response
    const sortedProducts = [...products].sort((a, b) => {
      if (a.title.toLowerCase().includes('nintendo switch 2')) return -1;
      if (b.title.toLowerCase().includes('nintendo switch 2')) return 1;
      return 0;
    });
    return sortedProducts;
  } catch (error) {
    console.log('API unavailable, using fallback products');
    return FALLBACK_PRODUCTS;
  }
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

// Upload API
export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload/image`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      window.location.href = '/admin/login';
    }
    const error = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(error.message || 'Upload failed');
  }

  return response.json();
};

// Get full image URL (handles both relative and absolute URLs)
export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '/placeholder.svg';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/uploads/')) {
    // Image uploaded to our backend API
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}${imageUrl}`;
  }
  if (imageUrl.startsWith('/lovable-uploads/')) {
    // Legacy lovable-uploads path - map to /images/ folder
    const filename = imageUrl.replace('/lovable-uploads/', '');
    return `/images/${filename}`;
  }
  if (imageUrl.startsWith('/images/')) {
    // Images from frontend's public/images folder
    return imageUrl;
  }
  return imageUrl;
};

