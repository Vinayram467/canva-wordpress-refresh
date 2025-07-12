const API_BASE_URL = 'https://canva-wordpress-refresh.onrender.com/api';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
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
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
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
export const healthCheck = () => apiCall('/health');

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