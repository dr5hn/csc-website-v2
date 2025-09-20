/**
 * Custom React hook for tracking scroll depth and page engagement
 * Automatically sends GA4 events at 25%, 50%, 75%, and 100% scroll depths
 */

import { useEffect, useRef } from 'react';
import { trackEngagement } from '@/lib/analytics';

export function useScrollTracking(pageName = 'unknown') {
  const scrollDepthsRef = useRef(new Set());
  const startTimeRef = useRef(null);
  const lastScrollTimeRef = useRef(null);

  useEffect(() => {
    // Record start time
    startTimeRef.current = Date.now();
    
    const handleScroll = () => {
      lastScrollTimeRef.current = Date.now();
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (documentHeight <= 0) return;
      
      const scrollPercentage = Math.floor((scrollTop / documentHeight) * 100);
      
      // Track at key milestones
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !scrollDepthsRef.current.has(milestone)) {
          scrollDepthsRef.current.add(milestone);
          trackEngagement.scrollDepth(milestone, pageName);
        }
      }
    };

    const handleBeforeUnload = () => {
      // Track time on page when user leaves
      if (startTimeRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        trackEngagement.timeOnPage(timeOnPage, pageName);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Send final time on page when component unmounts
      if (startTimeRef.current) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
        trackEngagement.timeOnPage(timeOnPage, pageName);
      }
    };
  }, [pageName]);

  return {
    // Return function to manually track custom engagement events
    trackCustomEngagement: (eventName, parameters) => {
      trackEngagement.customEngagement(eventName, parameters);
    }
  };
}
