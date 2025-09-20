/**
 * Scroll Tracker Component
 * A zero-visual-impact component that tracks user scroll behavior and page engagement
 */

'use client';

import { useScrollTracking } from '@/hooks/use-scroll-tracking';

export default function ScrollTracker({ pageName = 'unknown' }) {
  // Initialize scroll tracking for this page
  useScrollTracking(pageName);

  // This component renders nothing - it's purely for tracking
  return null;
}
