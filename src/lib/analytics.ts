// Analytics tracking service for Algo Spark

interface PageViewData {
  page: string;
  referrer?: string;
  userAgent?: string;
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class AnalyticsService {
  private userId: string | null = null;
  private baseUrl: string = 'http://localhost:3001/api';

  constructor() {
    this.initializeUser();
  }

  private initializeUser() {
    // Get or create user ID from localStorage
    this.userId = localStorage.getItem('algo-spark-user-id');
    if (!this.userId) {
      this.userId = this.generateUserId();
      localStorage.setItem('algo-spark-user-id', this.userId);
    }
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private async makeRequest(endpoint: string, data?: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: data ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': this.userId || '',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
      // Don't throw errors to avoid breaking the app
      return { success: false, error: error.message };
    }
  }

  async trackPageView(page: string) {
    const data: PageViewData = {
      page,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    };

    return this.makeRequest('/track/pageview', data);
  }

  async trackContact(data: ContactData) {
    return this.makeRequest('/contact', data);
  }

  async getAnalytics() {
    return this.makeRequest('/analytics');
  }

  async getUsers() {
    return this.makeRequest('/analytics/users');
  }

  async checkHealth() {
    return this.makeRequest('/health');
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Auto-track page views on route changes
export const trackPageView = (page: string) => {
  analytics.trackPageView(page);
};

// Track contact form submissions
export const trackContact = (data: ContactData) => {
  analytics.trackContact(data);
};

export default analytics;
