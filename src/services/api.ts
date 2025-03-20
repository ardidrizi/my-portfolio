const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-future-backend-url.com/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Generic fetch function with error handling
 */
async function fetchWithErrorHandling<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      } catch (e) {
        throw new Error(`Error: ${response.status}`);
      }
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Portfolio API service
 */
export const portfolioApi = {
  // Projects
  getProjects: () => fetchWithErrorHandling('/projects'),
  getProjectById: (id: string) => fetchWithErrorHandling(`/projects/${id}`),

  // Blog posts
  getBlogPosts: (page = 1, limit = 10) =>
    fetchWithErrorHandling(`/blog?page=${page}&limit=${limit}`),
  getBlogPostBySlug: (slug: string) =>
    fetchWithErrorHandling(`/blog/${slug}`),

  // Contact form
  submitContactForm: (formData: any) =>
    fetchWithErrorHandling('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),

  // Skills
  getSkills: () => fetchWithErrorHandling('/skills'),

  // Experience/Timeline
  getExperience: () => fetchWithErrorHandling('/experience'),
};

export default portfolioApi;
