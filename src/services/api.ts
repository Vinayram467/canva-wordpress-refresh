import API_CONFIG from '@/config/api';
import { sanitizeInput, validateEmail, containsBlockedContent } from '@/utils/security';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Security rate limiter
class ApiRateLimiter {
  private requests = new Map<string, number[]>();
  private maxRequests = 10;
  private windowMs = 60000; // 1 minute

  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const userRequests = this.requests.get(key)!;
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

const rateLimiter = new ApiRateLimiter();

export interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  excerpt?: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: string;
  education: string;
  image: string;
  bio: string;
  availability: string;
  rating: number;
  patientsCount: number;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  isFeatured: boolean;
}

export interface Appointment {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: string;
  notes?: string;
  isUrgent: boolean;
}

// Generic API functions
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Rate limiting check
  const clientId = 'browser'; // In production, use user session ID
  if (!rateLimiter.isAllowed(clientId)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  console.log(`Making API call to: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`API call successful:`, data);
    return data;
  } catch (error) {
    console.error(`API call error:`, error);
    throw error;
  }
};

// Secure data sanitization
const sanitizeApiData = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeApiData(value);
    }
    return sanitized;
  }
  
  return data;
};

// Blog API functions
export const blogApi = {
  getAll: () => apiCall('/blogs'),
  getById: (id: string) => apiCall(`/blogs/${id}`),
  create: (data: Partial<Blog>) => apiCall('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Blog>) => apiCall(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

// Doctor API functions
export const doctorApi = {
  getAll: () => apiCall('/doctors'),
  getById: (id: string) => apiCall(`/doctors/${id}`),
  create: (data: Partial<Doctor>) => apiCall('/doctors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Doctor>) => apiCall(`/doctors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/doctors/${id}`, {
    method: 'DELETE',
  }),
};

// Event API functions
export const eventApi = {
  getAll: () => apiCall('/events'),
  getById: (id: string) => apiCall(`/events/${id}`),
  create: (data: Partial<Event>) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Event>) => apiCall(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/events/${id}`, {
    method: 'DELETE',
  }),
};

// Appointment API functions
export const appointmentApi = {
  getAll: () => apiCall('/appointments'),
  getById: (id: string) => apiCall(`/appointments/${id}`),
  create: (data: Partial<Appointment>) => apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Appointment>) => apiCall(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/appointments/${id}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthCheck = async () => {
  try {
    const result = await apiCall('/health');
    console.log('🏥 Health check successful:', result);
    return result;
  } catch (error) {
    console.error('🏥 Health check failed:', error);
    throw error;
  }
};

export const assessmentApi = {
  create: (data: any) => apiCall('/assessments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const consultationApi = {
  create: (data: any) => apiCall('/consultations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const messageApi = {
  create: (data: any) => apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};