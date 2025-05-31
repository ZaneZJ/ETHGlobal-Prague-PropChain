'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropertyMapMarker from '@/components/PropertyMapMarker';
import Header from '@/components/Header';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

// You'll need to replace this with your actual Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file');
}

mapboxgl.accessToken = MAPBOX_TOKEN || '';

// Sample property data - replace with your actual data source
const sampleProperties = [
  {
    id: '1',
    name: 'Modern Apartment',
    longitude: 14.4378,
    latitude: 50.0755,
    price: '254,948',
    description: 'A beautiful property in Prague',
    image: '/images/home1.jpg'
  },
  {
    id: '2',
    name: 'Luxury Villa',
    longitude: 14.4158,
    latitude: 50.0875,
    price: '450,000',
    description: 'Spacious villa with garden in Prague 1',
    image: '/images/home2.jpg'
  },
  {
    id: '3',
    name: 'City Center Loft',
    longitude: 14.4258,
    latitude: 50.0625,
    price: '320,000',
    description: 'Modern loft in the heart of Prague',
    image: '/images/home3.jpg'
  },
  {
    id: '4',
    name: 'Modern District Apartment',
    longitude: 14.4658,
    latitude: 50.0525,
    price: ' 280,200',
    description: 'Modern apartment in Prague\'s vibrant district',
    image: '/images/home4.jpg'
  },
  {
    id: '5',
    name: 'Marina Gate Tower 2',
    longitude: 55.1385,
    latitude: 25.0884,
    price: '550,000',
    description: 'Tokenized for fractional ownership',
    image: '/property-data/prop1/prop1-11.avif'
  }
];

export default function ExplorePage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(14.4378); // Prague coordinates
  const [lat] = useState(50.0755);
  const [zoom] = useState(12);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude });
        
        // If map is already initialized, add the marker
        if (map.current && isMapLoaded) {
          addUserMarker(longitude, latitude);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, [isMapLoaded]);

  // Add user location marker
  const addUserMarker = (longitude: number, latitude: number) => {
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Create a custom marker element
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.backgroundColor = '#ea9800';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 0 0 2px #ea9800';

    userMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .addTo(map.current!);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    if (!MAPBOX_TOKEN) {
      setMapError('Mapbox token is not configured. Please check your environment variables.');
      return;
    }

    try {
      console.log('Initializing map with token:', MAPBOX_TOKEN);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: true,
        failIfMajorPerformanceCaveat: false
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setIsMapLoaded(true);
        // If we have user location, add the marker
        if (userLocation) {
          addUserMarker(userLocation.lng, userLocation.lat);
        }
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        if (e.error && e.error.message) {
          setMapError(`Error loading map: ${e.error.message}`);
        } else {
          setMapError('Error loading map. Please check your internet connection and try again.');
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Clean up on unmount
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
          userMarkerRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your internet connection and try again.');
    }
  }, [lng, lat, zoom]);

  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  return (
    <div className="w-full h-screen relative">
      <Header />
      {mapError && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {mapError}
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full absolute inset-0"
        style={{ 
          height: 'calc(100vh)',
          marginTop: '80px'
        }}
      />
      
      {isMapLoaded && map.current && sampleProperties.map((property) => (
        <PropertyMapMarker
          key={property.id}
          map={map.current!}
          longitude={property.longitude}
          latitude={property.latitude}
          propertyId={property.id}
          image={property.image}
          onClick={() => handlePropertyClick(property.id)}
        />
      ))}

      {/* Bottom Tab */}
      {selectedProperty && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-[10px] shadow-lg transform transition-all duration-300 ease-in-out ${montserrat.className}`}
             style={{ 
               marginLeft: '150px',
               marginRight: '150px',
               marginBottom: '50px',
               transform: 'translateY(0)',
               animation: 'slideUp 0.3s ease-out'
             }}>
          <style jsx>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}</style>
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-4"></div>
          <div className="px-6 pb-6" style={{ 
            paddingRight: '40px',
            paddingLeft: '40px',
            paddingBottom: '30px'
          }}>
            {(() => {
              const property = sampleProperties.find(p => p.id === selectedProperty);
              if (!property) return null;
              
              return (
                <>
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0" 
                         style={{ borderRadius: '10px', height: '90px', width: '90px' }}>
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.name}</h3>
                      <p className="text-xl font-bold text-[#ea9800] mb-2"> ${property.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">{property.description}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a 
                        href={property.id === '5' ? `/property/${property.id}` : `/explore/${property.id}`}
                        className="bg-[#ea9800] text-white py-2 px-3 text-sm font-medium hover:bg-[#d88a00] transition-colors whitespace-nowrap text-center"
                        onClick={undefined}
                      >
                        View Details
                      </a>
                      <a 
                        href="#"
                        className="border-1 border-[#ea9800] text-[#ea9800] py-2 px-3 text-sm font-medium hover:bg-[#fff9f0] transition-colors whitespace-nowrap text-center"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Contact agent clicked');
                        }}
                      >
                        Contact Agent
                      </a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
} 