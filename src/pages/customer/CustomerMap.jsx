import React, { useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'assets/mapbox-gl.css'; // local copy of mapbox-gl.css
import geoDataRaw from 'data/poa_customer_map.json';
import customerPoints from 'data/mega_customers.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

// Corrected GeoJSON conversion
const customerGeoJson = {
  type: "FeatureCollection",
  features: customerPoints
    .filter(p => p.Latitude && p.Longitude) // <-- use correct keys
    .map(p => ({
      type: "Feature",
      properties: {
        name: p.TenantName,
        address: p.Addr
      },
      geometry: {
        type: "Point",
        coordinates: [p.Longitude, p.Latitude] // <-- use correct keys
      }
    }))
};

const stores = [
  {
    StoreName: "StoreLocal Durack",
    Addr: "656 Blunder Road",
    Lat: -27.596041,
    Long: 152.9877175,
    StoreType: "Us"
  },

  {
    StoreName: "National Storage Oxley",
    Addr: "18 Jutland St",
    Lat: -27.5661827,
    Long: 152.9772513,
    StoreType: "Competitors"
  },
  {
    "StoreName": "Storage King - Acacia Ridge",
    "Addr": "23 Learoyd Road, Acacia Ridge QLD 4110",
    "Lat": -27.5980538,
    "Long": 153.0381966,
    "StoreType": "Competitors"
  },
    {
    "StoreName": "Swift Storage",
    "Addr": "35 King Ave, Willawong QLD 4110",
    "Lat": -27.5939057,
    "Long": 153.0039275,
    "StoreType": "Competitors"
  },
];

export default function CustomerMap() {
  const [geoData, setGeoData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [viewState, setViewState] = useState({
    latitude:  -27.596041,
    longitude: 152.9877175,
    zoom: 10
  });

  const [showCustomers, setShowCustomers] = useState(true); // <-- NEW: state to control visibility of customer dots

  useEffect(() => {
    setGeoData(geoDataRaw);
  }, []);

  const handleMouseMove = (event) => {
    const { features, lngLat } = event;
    const feature = features?.find(f => f.layer.id === 'postal-fill');
    if (feature) {
      setHoverInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        postalCode: feature.properties.POA_CODE16 || feature.properties.POA_CODE,
        customerCount: feature.properties.customerCount
      });
    } else {
      setHoverInfo(null);
    }
  };

  if (!geoData) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ width: '100%', height: '80vh' }}>
     
      {/* Toggle container */}
  <div
    style={{
      position: 'absolute',
      top: 5,
      left: 50,  // move this far enough so it doesn’t overlap the zoom widget
      zIndex: 2,
      background: 'white',
      padding: '6px',
      borderRadius: '4px'
    }}
  >
    <label style={{ fontSize: '14px', fontFamily: 'sans-serif' }}>
      <input
        type="checkbox"
        checked={showCustomers}
        onChange={() => setShowCustomers(!showCustomers)}
        style={{ marginRight: '6px' }}
      />
      Show Customers
    </label>
  </div>

      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        interactiveLayerIds={['postal-fill']}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverInfo(null)}
        style={{ marginTop: '42px',width: '100%', height:'78vh' }}
      >
        <NavigationControl
          position="top-left"
          showCompass={true}
          visualizePitch={true}
        />

        {/* Shape Layer */}
        <Source id="postal-polygons" type="geojson" data={geoData}>
          <Layer
            id="postal-fill"
            type="fill"
            paint={{
              'fill-color': [
                'step',
                ['get', 'customerCount'],
                '#EDF8B1',  // 1–10
                11, '#c7e9b4', // 11–25
                26, '#7FCDBB', // 26–40
                41, '#41b6c4', // 41–55
                56, '#2C7FB8'  // 56+
              ],
              'fill-opacity': 0.8
            }}
          />
          <Layer
            id="postal-outline"
            type="line"
            paint={{
              'line-color': '#999',
              'line-opacity': 0.8,
              'line-width': 0.8
            }}
          />
        </Source>

        {/* Store Markers */}
        {stores.map((store, idx) => (
          <Marker key={idx} longitude={store.Long} latitude={store.Lat} anchor="bottom">
            <div style={{ textAlign: 'center' }}>
              {store.StoreType === 'Competitors' && viewState.zoom >= 11 && (
                <div style={{
                  fontSize: '10px',
                  color: '#000',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap'
                }}>
                  {store.StoreName}
                </div>
              )}
              <div
                onClick={() => setSelectedStore(store)}
                style={{
                  backgroundColor: store.StoreType === "Us" ? '#007bff' : '#ff5733',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  margin: '0 auto',
                  cursor: 'pointer'
                }}
              />
            </div>
          </Marker>
        ))}

        {/* Conditionally render customer points based on showCustomers */}
        {showCustomers && ( // <-- NEW: only show if showCustomers is true
          <Source id="customer-dots" type="geojson" data={customerGeoJson}>
            <Layer
              id="customer-points"
              type="circle"
              paint={{
                'circle-radius': 3,
                'circle-color': '#444',
                'circle-opacity': 0.6
              }}
            />
          </Source>
        )} 
        {/* END NEW */}

        {/* Postal hover popup */}
        {hoverInfo && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <div style={{ fontSize: '12px' }}>
              <strong>Postal Code:</strong> {hoverInfo.postalCode}<br />
              <strong>Customers:</strong> {hoverInfo.customerCount}
            </div>
          </Popup>
        )}

        {/* Store Popup */}
        {selectedStore && (
          <Popup
            longitude={selectedStore.Long}
            latitude={selectedStore.Lat}
            closeButton={true}
            onClose={() => setSelectedStore(null)}
            anchor="top"
          >
            <div style={{ fontSize: '12px' }}>
              <strong>{selectedStore.StoreName}</strong><br />
              {selectedStore.Addr}<br />
              Type: {selectedStore.StoreType}
            </div>
          </Popup>
        )}

        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          backgroundColor: 'white',
          padding: '10px',
          fontSize: '12px',
          borderRadius: '6px',
          boxShadow: '0 0 6px rgba(0,0,0,0.15)',
          zIndex: 1
        }}>
          <strong>Customers per Postal Code</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
            <div><span style={{ backgroundColor: '#EDF8B1', width: 20, height: 10, display: 'inline-block' }} /> 1 – 10</div>
            <div><span style={{ backgroundColor: '#c7e9b4', width: 20, height: 10, display: 'inline-block' }} /> 11 – 25</div>
            <div><span style={{ backgroundColor: '#7FCDBB', width: 20, height: 10, display: 'inline-block' }} /> 26 – 40</div>
            <div><span style={{ backgroundColor: '#41b6c4', width: 20, height: 10, display: 'inline-block' }} /> 41 – 55</div>
            <div><span style={{ backgroundColor: '#2C7FB8', width: 20, height: 10, display: 'inline-block' }} /> 56+</div>
          </div>
        </div>
      </Map>
    </div>
  );
}
