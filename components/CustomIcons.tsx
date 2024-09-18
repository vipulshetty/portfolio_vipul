import React from 'react';

// WebSphere Icon
const WebSphereIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#054ADA' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Replace this path with the actual SVG path data for WebSphere */}
    <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill={color} />
  </svg>
);

// Apache Zookeeper Icon
const ApacheZookeeperIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#D12127' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Replace this path with the actual SVG path data for Apache Zookeeper */}
    <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill={color} />
  </svg>
);

// Actian Icon
const ActianIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1E88E5' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Replace this path with the actual SVG path data for Actian */}
    <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill={color} />
  </svg>
);

export { WebSphereIcon, ApacheZookeeperIcon, ActianIcon };
