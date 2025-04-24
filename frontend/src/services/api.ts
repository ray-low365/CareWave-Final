// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// API Service for Patients
export const PatientService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/patients`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/patients/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getWithAppointments: async (id: string) => {
    const response = await fetch(`${API_URL}/api/patients/${id}/with-appointments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (patient: any) => {
    const response = await fetch(`${API_URL}/api/patients`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(patient),
    });
    return handleResponse(response);
  },

  update: async (id: string, patient: any) => {
    const response = await fetch(`${API_URL}/api/patients/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(patient),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/api/patients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }
  },

  search: async (query: string) => {
    const response = await fetch(`${API_URL}/api/patients/search?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// API Service for Appointments
export const AppointmentService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/appointments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getByPatientId: async (patientId: string) => {
    const response = await fetch(`${API_URL}/api/patients/${patientId}/appointments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (appointment: any) => {
    const response = await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointment),
    });
    return handleResponse(response);
  },

  update: async (id: string, appointment: any) => {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointment),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }
  },

  getTodayAppointments: async () => {
    const response = await fetch(`${API_URL}/api/appointments/today`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getUpcomingAppointments: async () => {
    const response = await fetch(`${API_URL}/api/appointments/upcoming`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// API Service for Authentication
export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  verifyToken: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return { valid: false };
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { valid: false };
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// API Service for Todos
export const TodoService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/todos`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (todo: { title: string, content?: string, completed?: boolean }) => {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  update: async (id: string, todo: { title?: string, content?: string, completed?: boolean }) => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }
  },
};

// Add other services as needed (Staff, Inventory, Billing, etc.)
