import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface PropertyMapMarkerProps {
  map: mapboxgl.Map;
  longitude: number;
  latitude: number;
  propertyId: string;
  image: string;
  onClick?: () => void;
}

export default function PropertyMapMarker({
  map,
  longitude,
  latitude,
  propertyId,
  image,
  onClick
}: PropertyMapMarkerProps) {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    // Create a custom marker element
    const el = document.createElement('div');
    el.className = 'property-marker';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.borderRadius = '50%';
    el.style.overflow = 'hidden';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    el.style.cursor = 'pointer';
    el.style.backgroundImage = `url(${image})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.transformOrigin = 'center center';
    el.style.transition = 'border 0.4s ease-in-out, box-shadow 0.4s ease-in-out';

    // Add hover effect
    el.addEventListener('mouseenter', () => {
      el.style.border = '4px solid #ea9800';
      el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    });

    // Create the marker
    markerRef.current = new mapboxgl.Marker({
      element: el,
      anchor: 'center'
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Add click event
    if (onClick) {
      el.addEventListener('click', onClick);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (onClick) {
        el.removeEventListener('click', onClick);
      }
      el.removeEventListener('mouseenter', () => {});
      el.removeEventListener('mouseleave', () => {});
    };
  }, [map, longitude, latitude, onClick, image]);

  return null;
} 