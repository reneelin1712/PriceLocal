import React, { useEffect, useState, useMemo } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'assets/mapbox-gl.css';
import geoDataPAC from 'data/poa_customer_map_PAC.json';
import customerPointsPAC from 'data/geocoded_customers_PAC.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

const siteIdToName = {
  36560: { name: 'AIR - Airlie Beach', lat: -27.40994, lng: 153.07249 },
  51498: { name: 'BER - Berrinba', lat: -27.40994, lng: 153.07249 },
  36584: { name: 'BRU - Busselton', lat: -27.40994, lng: 153.07249 },
  36561: { name: 'BUN - Bunbury', lat: -27.40994, lng: 153.07249 },
  36563: { name: 'CAM - Campbellfield', lat: -27.40994, lng: 153.07249 },
  43029: { name: 'ELL - Ellenbrook', lat: -27.40994, lng: 153.07249 },
  36564: { name: 'EPP - Epping', lat: -27.40994, lng: 153.07249 },
  36565: { name: 'GYM - Gympie', lat: -27.40994, lng: 153.07249 },
  49445: { name: 'HAC - Hackham', lat: -35.1483542747843, lng: 138.529770993343 },
  36568: { name: 'HAL - Hallam', lat: -27.40994, lng: 153.07249 },
  45288: { name: 'HEN - Hendra', lat: -27.40994, lng: 153.07249 },
  36566: { name: 'HLX - Halifax', lat: -27.40994, lng: 153.07249 },
  41660: { name: 'KEM - Kembla Grange', lat: -27.40994, lng: 153.07249 },
  53869: { name: 'KEN - Port Kennedy', lat: -27.40994, lng: 153.07249 },
  36581: { name: 'MIL - Jindalee', lat: -27.40994, lng: 153.07249 },
  36572: { name: 'MON - Monkhouse', lat: -27.40994, lng: 153.07249 },
  38266: { name: 'MOR - Mordialloc', lat: -27.40994, lng: 153.07249 },
  36574: { name: 'NEW - Newmarket', lat: -27.40994, lng: 153.07249 },
  36575: { name: 'NOO - Noosa', lat: -27.40994, lng: 153.07249 },
  36577: { name: 'NOR - Northcote', lat: -27.40994, lng: 153.07249 },
  36576: { name: 'NRK - North Rockhampton', lat: -27.40994, lng: 153.07249 },
  54382: { name: 'OAK - Oakleigh', lat: -27.40994, lng: 153.07249 },
  46317: { name: 'PAC - Pacific Pines', lat: -27.938111193745925, lng: 153.33557302337266 },
  50719: { name: 'PAK - Pakenham', lat: -27.40994, lng: 153.07249 },
  51104: { name: 'PIM - Pimpama', lat: -27.40994, lng: 153.07249 },
  53257: { name: 'PNR - Penrith', lat: -27.40994, lng: 153.07249 },
  54370: { name: 'PRE - Prestons', lat: -27.40994, lng: 153.07249 },
  36578: { name: 'RCH - Rockhampton City', lat: -27.40994, lng: 153.07249 },
  36644: { name: 'RCK - Kawana', lat: -27.40994, lng: 153.07249 },
  42169: { name: 'SUN - Sunshine', lat: -27.40994, lng: 153.07249 },
  36583: { name: 'TWH - Tweed Heads', lat: -27.40994, lng: 153.07249 },
  36573: { name: 'WAR - Narre Warren', lat: -27.40994, lng: 153.07249 },
  49381: { name: 'WYO - Wyoming', lat: -27.40994, lng: 153.07249 }
};

export default function MapPAC() {
  const [geoData, setGeoData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showCustomers, setShowCustomers] = useState(true);
  const [buildingFilter, setBuildingFilter] = useState('all');
  const [siteId, setSiteId] = useState('46317');

  const [viewState, setViewState] = useState({
    latitude: siteIdToName['46317'].lat,
    longitude: siteIdToName['46317'].lng,
    zoom: 11
  });

  useEffect(() => {
    setGeoData(geoDataPAC);
  }, []);

  useEffect(() => {
    const site = siteIdToName[siteId];
    if (site) {
      setViewState(prev => ({ ...prev, latitude: site.lat, longitude: site.lng }));
    }
  }, [siteId]);

  const filteredCustomerGeoJson = useMemo(() => ({
    type: 'FeatureCollection',
    features: customerPointsPAC
      .filter(p => p.Latitude && p.Longitude)
      .filter(p => buildingFilter === 'all' || `${p.BuildingNumber}` === buildingFilter)
      .map(p => ({
        type: 'Feature',
        properties: {
          name: p.TenantName,
          address: p.Address,
          unit: p.UnitNumber,
          site: siteIdToName[p.SiteID]?.name || 'Unknown'
        },
        geometry: {
          type: 'Point',
          coordinates: [p.Longitude, p.Latitude]
        }
      }))
  }), [buildingFilter]);

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
      <div style={{ position: 'absolute', top: 5, left: 50, zIndex: 2, background: 'white', padding: '6px', borderRadius: '4px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px' }}>
          <input type="checkbox" checked={showCustomers} onChange={() => setShowCustomers(!showCustomers)} style={{ marginRight: '6px' }} />
          Show Customers
        </label>
        <label style={{ fontSize: '14px' }}>
          Building:
          <select value={buildingFilter} onChange={e => setBuildingFilter(e.target.value)} style={{ marginLeft: '8px' }}>
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label style={{ fontSize: '14px' }}>
          Site:
          <select value={siteId} onChange={e => setSiteId(e.target.value)} style={{ marginLeft: '8px' }}>
            {Object.entries(siteIdToName).map(([id, site]) => (
              <option key={id} value={id}>{site.name}</option>
            ))}
          </select>
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
        style={{ marginTop: '42px', width: '100%', height: '78vh' }}>

        <NavigationControl position="top-left" />

        <Source id="postal-pac" type="geojson" data={geoData}>
          <Layer
            id="postal-fill"
            type="fill"
            paint={{
              'fill-color': ['step', ['get', 'customerCount'], '#EDF8B1', 11, '#c7e9b4', 26, '#7FCDBB', 41, '#41b6c4', 56, '#2C7FB8'],
              'fill-opacity': 0.8
            }}
          />
          <Layer id="postal-outline" type="line" paint={{ 'line-color': '#999', 'line-opacity': 0.8, 'line-width': 0.8 }} />
        </Source>

        {showCustomers && (
          <Source id="customer-dots" type="geojson" data={filteredCustomerGeoJson}>
            <Layer id="customer-points" type="circle" paint={{ 'circle-radius': 3, 'circle-color': '#444', 'circle-opacity': 0.6 }} />
          </Source>
        )}

        {hoverInfo && (
          <Popup longitude={hoverInfo.longitude} latitude={hoverInfo.latitude} closeButton={false} closeOnClick={false} anchor="top">
            <div style={{ fontSize: '12px' }}>
              <strong>Postal Code:</strong> {hoverInfo.postalCode}<br />
              <strong>Customers:</strong> {hoverInfo.customerCount}
            </div>
          </Popup>
        )}

        <div style={{ position: 'absolute', bottom: 40, left: 20, backgroundColor: 'white', padding: '10px', fontSize: '12px', borderRadius: '6px', boxShadow: '0 0 6px rgba(0,0,0,0.15)', zIndex: 1 }}>
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
