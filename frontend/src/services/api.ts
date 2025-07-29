// src/services/api.ts
import { getAuthTokens, setAuthTokens, clearAuthTokens } from './tokenStorage';

const API_BASE_URL = 'http://localhost:8000/api';

async function getAccessToken() {
  const tokens = getAuthTokens();
  return tokens?.access || null;
}

async function refreshToken() {
  const tokens = getAuthTokens();
  if (!tokens?.refresh) throw new Error('No refresh token available');

  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: tokens.refresh }),
  });

  if (!response.ok) {
    clearAuthTokens();
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  setAuthTokens(data.access, tokens.refresh);
  return data.access;
}

async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  let accessToken = await getAccessToken();

  if (!init.headers) init.headers = {};
  (init.headers as Record<string, string>)['Content-Type'] = 'application/json';

  if (accessToken) {
    (init.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    console.log('🔐 Auth header attached:', accessToken);
  }

  let response = await fetch(input, init);

  if (response.status === 401) {
    try {
      accessToken = await refreshToken();
      (init.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(input, init);
    } catch (err) {
      clearAuthTokens();
      throw new Error('Unauthorized. Please log in again.');
    }
  }

  return response;
}

// -------- AUTH --------

export async function signup(username: string, email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/user/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Signup failed');
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Login failed');
  }

  const data = await response.json();
  setAuthTokens(data.access, data.refresh);

  const userResponse = await authFetch(`${API_BASE_URL}/user/profile/`);
  if (!userResponse.ok) throw new Error('Failed to fetch user data');

  return userResponse.json();
}

export function logout() {
  clearAuthTokens();
}

export async function getUser() {
  const response = await authFetch(`${API_BASE_URL}/user/profile/`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

// -------- CHAT --------

export async function fetchChatSessions() {
  const response = await authFetch(`${API_BASE_URL}/chats/`);
  if (!response.ok) throw new Error('Failed to fetch chat sessions');
  return response.json();
}

export async function sendMessage(message: string, sessionId?: string) {
  const url = sessionId
    ? `${API_BASE_URL}/chats/${sessionId}/messages/`
    : `${API_BASE_URL}/chats/`;

  const response = await authFetch(url, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return response.json(); // Expected: { reply, session_id }
}

export async function getMessages(sessionId: string) {
  const response = await authFetch(`${API_BASE_URL}/chats/${sessionId}/messages/`);
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
}

// -------- REPORTS --------

export async function fetchReports() {
  const response = await authFetch(`${API_BASE_URL}/reports/`);
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}

export async function submitReport(content: string, file?: File) {
  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('file', file);

  const accessToken = await getAccessToken();

  const response = await fetch(`${API_BASE_URL}/reports/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Do NOT set 'Content-Type' with FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to submit report');
  }

  return response.json();
}

export async function fetchLatestReport() {
  const response = await authFetch(`${API_BASE_URL}/reports/latest/`);
  if (!response.ok) throw new Error('Failed to fetch latest report');
  return response.json();
}

// -------- DASHBOARD --------

export async function fetchDashboardStats() {
  const response = await authFetch(`${API_BASE_URL}/dashboard/stats/`);
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Dashboard stats fetch error:', errorData);
    throw new Error(errorData.detail || 'Failed to fetch dashboard stats');
  }
  return response.json();
}
