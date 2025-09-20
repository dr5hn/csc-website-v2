/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * This module provides helper functions for tracking custom events in GA4.
 * Events are designed to measure key business metrics and user engagement.
 */

// Check if gtag is available (client-side only)
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Generic event tracking function
 * @param {string} eventName - GA4 event name
 * @param {Object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (!isGtagAvailable()) return;
  
  window.gtag('event', eventName, parameters);
};

/**
 * Track conversion events (API sign-ups, tool usage, etc.)
 */
export const trackConversion = (conversionType, details = {}) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    ...details
  });
};

/**
 * Track API-related events
 */
export const trackAPI = {
  // Track when someone clicks "Try API" button
  requestKey: (location = 'unknown') => {
    trackConversion('api_key_request', {
      button_location: location,
      value: 1 // Assign value for conversion tracking
    });
  },
  
  // Track API documentation views
  viewDocs: (section = 'general') => {
    trackEvent('view_api_docs', {
      docs_section: section,
      engagement_type: 'documentation'
    });
  }
};

/**
 * Track tool usage events
 */
export const trackTool = {
  // Track export tool usage
  useExport: (location = 'unknown') => {
    trackConversion('export_tool_usage', {
      button_location: location,
      value: 0.5 // Lower value than API key requests
    });
  },
  
  // Track update tool (contribution) usage
  useUpdate: (location = 'unknown') => {
    trackConversion('contribution_tool_usage', {
      button_location: location,
      value: 0.3
    });
  },
  
  // Track GitHub repository visits
  visitGitHub: (location = 'unknown') => {
    trackEvent('visit_github', {
      button_location: location,
      engagement_type: 'open_source'
    });
  }
};

/**
 * Track contact and support events
 */
export const trackContact = {
  // Track email clicks
  emailClick: (emailType, email) => {
    trackEvent('contact_email', {
      email_type: emailType,
      email_address: email,
      engagement_type: 'support'
    });
  },
  
  // Track GitHub issue creation
  githubIssue: () => {
    trackEvent('github_issue', {
      engagement_type: 'support'
    });
  },
  
  // Track social media clicks
  social: (platform, location = 'unknown') => {
    trackEvent('social_click', {
      platform: platform,
      button_location: location,
      engagement_type: 'social'
    });
  }
};

/**
 * Track pricing and product page events
 */
export const trackEngagement = {
  // Track pricing page visits
  pricingView: (productType) => {
    trackEvent('view_pricing', {
      product_type: productType,
      engagement_type: 'pricing'
    });
  },
  
  // Track product page engagement
  productView: (productType) => {
    trackEvent('view_product', {
      product_type: productType,
      engagement_type: 'product'
    });
  },
  
  // Track scroll depth (call at 25%, 50%, 75%, 100%)
  scrollDepth: (percentage, page) => {
    trackEvent('scroll', {
      percent_scrolled: percentage,
      page_title: page
    });
  },
  
  // Track time on important pages
  timeOnPage: (timeInSeconds, page) => {
    trackEvent('page_engagement', {
      engagement_time: timeInSeconds,
      page_title: page
    });
  },

  // Custom engagement events
  customEngagement: (eventName, parameters) => {
    trackEvent(eventName, parameters);
  }
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url, location, linkText = '') => {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    button_location: location,
    engagement_type: 'external_link'
  });
};

/**
 * Track form submissions (if you add contact forms later)
 */
export const trackForm = {
  submit: (formName, location) => {
    trackConversion('form_submission', {
      form_name: formName,
      button_location: location,
      value: 0.8
    });
  },
  
  error: (formName, errorType) => {
    trackEvent('form_error', {
      form_name: formName,
      error_type: errorType
    });
  }
};

/**
 * Enhanced ecommerce tracking (for future paid plans)
 */
export const trackEcommerce = {
  viewItem: (itemId, itemName, category, value) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: value,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: value,
        quantity: 1
      }]
    });
  },
  
  purchase: (transactionId, items, value) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: value,
      items: items
    });
  }
};
