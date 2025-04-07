import React, { useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'assets/mapbox-gl.css';
import geoDataPAC from 'data/poa_customer_map_PAC.json';
import customerPointsPAC from 'data/geocoded_customers_PAC.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

const customerGeoJson = {
  type: 'FeatureCollection',
  features: customerPointsPAC
    .filter(p => p.Latitude && p.Longitude)
    .map(p => ({
      type: 'Feature',
      properties: {
        name: p.TenantName,
        address: p.Addr
      },
      geometry: {
        type: 'Point',
        coordinates: [p.Longitude, p.Latitude]
      }
    }))
};

const storesPAC = [
  { StoreName: "StoreLocal Pacific Pines", Addr: "180 Heslop Rd, Gaven QLD 4211", Lat: -27.938111193745925, Long: 153.33557302337266, StoreType: "Us" },
  { StoreName: "Platinum Asset Storage", Addr: "31 Millaroo Dr, Helensvale QLD 4212", Lat: -27.93115071617622, Long: 153.33744062522143, StoreType: "Competitors" },
  { StoreName: "Agnew Container Storage", Addr: "2/21 Wrights Pl, Arundel QLD 4214", Lat: -27.935948460836688, Long: 153.38038781172833, StoreType: "Competitors" },
  { StoreName: "Sinclair Storage", Addr: "280 Brisbane Rd, Arundel QLD 4214", Lat: -27.93268259789114, Long: 153.38001829638588, StoreType: "Competitors" },
  { StoreName: "Oxenford Mini Storage", Addr: "48 Siganto Dr, Oxenford QLD 4216", Lat: -27.902378505009498, Long: 153.31655657364624, StoreType: "Competitors" },
  { StoreName: "Loxon Labrador", Addr: "254 Brisbane Rd, Arundel QLD 4214", Lat: -27.93295084628506, Long: 153.3828208693994, StoreType: "Competitors" },
  { StoreName: "Budget Storage and Removals", Addr: "8 Mercantile Ct, Molendinar QLD 4214", Lat: -27.965776776022, Long: 153.37234450008518, StoreType: "Competitors" },
  { StoreName: "Nerang Storage", Addr: "17 Palings Ct, Nerang QLD 4211", Lat: -27.97755038643175, Long: 153.33966932727338, StoreType: "Competitors" },
  { StoreName: "Ashmore Caravan Storage", Addr: "10 Resources Ct, Molendinar QLD 4214", Lat: -27.979308578937097, Long: 153.3575215694011, StoreType: "Competitors" },
  { StoreName: "Storage King - Helensvale", Addr: "128 Siganto Dr, Helensvale QLD 4212", Lat: -27.89476396699733, Long: 153.31570880193172, StoreType: "Competitors" },
  { StoreName: "National Storage Biggera Waters", Addr: "610 Oxley Dr, Biggera Waters QLD 4216", Lat: -27.932431641455146, Long: 153.3911304233725, StoreType: "Competitors" },
  { StoreName: "National Storage Labrador", Addr: "3 Jacob Dr, Labrador QLD 4215", Lat: -27.935630703061566, Long: 153.3919579675505, StoreType: "Competitors" },
  { StoreName: "Storage King - Ashmore", Addr: "4 Central Park Ave, Ashmore QLD 4214", Lat: -27.986716341040275, Long: 153.36279203871678, StoreType: "Competitors" },
  { StoreName: "Loxon Ashmore", Addr: "14/17 Dominions Rd, Ashmore QLD 4214", Lat: -27.979429681636756, Long: 153.38376689638764, StoreType: "Competitors" },
  { StoreName: "Kennards Self Storage Southport", Addr: "Unit 1/3 Olympic Cct, Southport QLD 4215", Lat: -27.96954791390247, Long: 153.39345533871605, StoreType: "Competitors" },
  { StoreName: "Aussie Container Storage - Nerang", Addr: "77 Lawrence Dr, Nerang QLD 4211", Lat: -27.997599058250277, Long: 153.34729418104598, StoreType: "Competitors" },
  { StoreName: "National Storage Nerang", Addr: "4 Lawrence Dr, Nerang QLD 4211", Lat: -28.001894665045125, Long: 153.34134894056626, StoreType: "Competitors" },
  { StoreName: "National Storage Carrara", Addr: "116 Spencer Rd, Carrara QLD 4211", Lat: -28.008406642355606, Long: 153.34638469269066, StoreType: "Competitors" },
  { StoreName: "Loxon Southport", Addr: "63-69 Hinde St, Southport QLD 4215", Lat: -27.982017833611778, Long: 153.3865956675523, StoreType: "Competitors" }
];

export default function MapPAC() {
  const [geoData, setGeoData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: -27.938,
    longitude: 153.336,
    zoom: 11
  });
  const [showCustomers, setShowCustomers] = useState(true);

  useEffect(() => {
    setGeoData(geoDataPAC);
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

  if (!geoData) return <div>Loading map...</div>;

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <div style={{ position: 'absolute', top: 5, left: 50, zIndex: 2, background: 'white', padding: '6px', borderRadius: '4px' }}>
        <label style={{ fontSize: '14px', fontFamily: 'sans-serif' }}>
          <input type="checkbox" checked={showCustomers} onChange={() => setShowCustomers(!showCustomers)} style={{ marginRight: '6px' }} />
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
        style={{ marginTop: '42px', width: '100%', height: '78vh' }}
      >
        <NavigationControl position="top-left" />

        <Source id="postal-pac" type="geojson" data={geoData}>
          <Layer
            id="postal-fill"
            type="fill"
            paint={{
              'fill-color': [
                'step',
                ['get', 'customerCount'],
                '#EDF8B1', 11, '#c7e9b4', 26, '#7FCDBB', 41, '#41b6c4', 56, '#2C7FB8'
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

        {showCustomers && (
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

        {storesPAC.map((store, idx) => (
          <Marker key={idx} longitude={store.Long} latitude={store.Lat} anchor="bottom">
            <div style={{ textAlign: 'center' }}>
              {store.StoreType === 'Competitors' && viewState.zoom >= 11 && (
                <div style={{
                  fontSize: '10px',
                  color: '#000',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap'
                }}>{store.StoreName}</div>
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
