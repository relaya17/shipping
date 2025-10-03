// Analytics utilities for VIP International Shipping

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
  timestamp?: string;
}

interface UserBehavior {
  page_views: number;
  time_on_site: number;
  interactions: string[];
  preferred_services: string[];
  quote_requests: number;
  last_activity: Date;
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private userBehavior: UserBehavior = {
    page_views: 0,
    time_on_site: 0,
    interactions: [],
    preferred_services: [],
    quote_requests: 0,
    last_activity: new Date()
  };

  // רישום אירוע
  trackEvent(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString()
    });

    // עדכון התנהגות משתמש
    this.updateUserBehavior(event);

    // שליחה לשרת (אם זמין)
    this.sendToServer(event);
  }

  // עדכון התנהגות משתמש
  private updateUserBehavior(event: AnalyticsEvent): void {
    this.userBehavior.last_activity = new Date();

    if (event.category === 'navigation') {
      this.userBehavior.page_views++;
    }

    if (event.event === 'quote_request') {
      this.userBehavior.quote_requests++;
    }

    if (event.action === 'service_interaction') {
      const service = event.label;
      if (service && !this.userBehavior.preferred_services.includes(service)) {
        this.userBehavior.preferred_services.push(service);
      }
    }

    this.userBehavior.interactions.push(event.action);
  }

  // שליחה לשרת
  private async sendToServer(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.log('Analytics server not available, storing locally');
      // שמירה מקומית במקרה של אי זמינות השרת
      this.storeLocally(event);
    }
  }

  // שמירה מקומית
  private storeLocally(event: AnalyticsEvent): void {
    const stored = localStorage.getItem('vip_analytics');
    const events = stored ? JSON.parse(stored) : [];
    events.push(event);
    
    // שמירת עד 100 אירועים מקומית
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('vip_analytics', JSON.stringify(events));
  }

  // קבלת נתונים סטטיסטיים
  getAnalyticsData(): {
    events: AnalyticsEvent[];
    userBehavior: UserBehavior;
    insights: string[];
  } {
    return {
      events: this.events,
      userBehavior: this.userBehavior,
      insights: this.generateInsights()
    };
  }

  // יצירת תובנות AI
  private generateInsights(): string[] {
    const insights: string[] = [];
    
    if (this.userBehavior.quote_requests > 3) {
      insights.push('המשתמש מעוניין מאוד בשירותי ההובלה - הצע הצעות מיוחדות');
    }
    
    if (this.userBehavior.preferred_services.length > 0) {
      const topService = this.userBehavior.preferred_services[0];
      insights.push(`השירות הפופולרי ביותר: ${topService} - התמקד בקידום השירות הזה`);
    }
    
    if (this.userBehavior.time_on_site > 300) {
      insights.push('המשתמש מבלה זמן רב באתר - שקול להציע צ\'אט או יצירת קשר');
    }
    
    return insights;
  }

  // מעקב אחר ביצועי האתר
  trackPerformance(): void {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          this.trackEvent({
            event: 'performance_metrics',
            category: 'performance',
            action: 'page_load',
            label: 'home_page',
            value: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            custom_parameters: {
              dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
              first_paint: perfData.loadEventEnd - perfData.fetchStart,
              time_to_interactive: perfData.domInteractive - perfData.fetchStart
            }
          });
        }, 0);
      });
    }
  }

  // מעקב אחר שגיאות
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      event: 'error_occurred',
      category: 'error',
      action: 'javascript_error',
      label: context || 'unknown',
      custom_parameters: {
        error_message: error.message,
        error_stack: error.stack,
        user_agent: navigator.userAgent,
        url: window.location.href
      }
    });
  }

  // מעקב אחר אינטראקציות עם AI
  trackAIInteraction(interaction: string, response?: string): void {
    this.trackEvent({
      event: 'ai_interaction',
      category: 'ai',
      action: 'chatbot_interaction',
      label: interaction,
      custom_parameters: {
        ai_response: response,
        interaction_type: 'chatbot'
      }
    });
  }
}

// יצירת instance גלובלי
export const analytics = new AnalyticsManager();

// Hook ל-React
export const useAnalytics = () => {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackAIInteraction: analytics.trackAIInteraction.bind(analytics),
    getData: analytics.getAnalyticsData.bind(analytics)
  };
};

// פונקציות עזר נפוצות
export const trackPageView = (page: string) => {
  analytics.trackEvent({
    event: 'page_view',
    category: 'navigation',
    action: 'page_visit',
    label: page
  });
};

export const trackQuoteRequest = (service: string, location: string) => {
  analytics.trackEvent({
    event: 'quote_request',
    category: 'conversion',
    action: 'quote_requested',
    label: `${service}_${location}`,
    custom_parameters: {
      service_type: service,
      destination: location
    }
  });
};

export const trackServiceInterest = (service: string) => {
  analytics.trackEvent({
    event: 'service_interest',
    category: 'engagement',
    action: 'service_interaction',
    label: service
  });
};

export const trackAIInteraction = (interaction: string, response?: string) => {
  analytics.trackAIInteraction(interaction, response);
};

// אתחול Analytics
export const initializeAnalytics = () => {
  // מעקב אחר ביצועים
  analytics.trackPerformance();
  
  // מעקב אחר שגיאות גלובליות
  window.addEventListener('error', (event) => {
    analytics.trackError(event.error, 'global_error');
  });
  
  // מעקב אחר Promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
  });
  
  console.log('Analytics initialized successfully');
};
