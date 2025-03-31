import React, { useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'assets/mapbox-gl.css'; // local copy of mapbox-gl.css
import geoDataRaw from 'data/poa_customer_map.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

const stores = [
  {
    StoreName: "StoreLocal Hackham",
    Addr: "34 Cottage Ln, Hackham SA 5163",
    Lat: -35.1483542747843,
    Long: 138.529770993343,
    StoreType: "Us"
  },
  {
    StoreName: "Storage King Adelaide",
    Addr: "84 Baden Terrace, O'Sullivan Beach SA 5166",
    Lat: -35.1162510872085,
    Long: 138.483901935582,
    StoreType: "Competitors"
  },
  {
    StoreName: "Storage King Adelaide",
    Addr: "1167A South Rd, St Marys SA 5042",
    Lat: -34.9966960943479,
    Long: 138.575624922088,
    StoreType: "Competitors"
  },
  {
    StoreName: "Storage King Adelaide",
    Addr: "40-46 Albert St, Windsor Gardens SA 5087",
    Lat: -34.8685127485636,
    Long: 138.647683993253,
    StoreType: "Competitors"
  },
  {
    StoreName: "Storage King Adelaide",
    Addr: "596 Torrens Rd, Woodville North SA 5012",
    Lat: -34.8674943711143,
    Long: 138.537582364417,
    StoreType: "Competitors"
  },
  {
    StoreName: "National Storage Reynella",
    Addr: "141 Old S Rd, Reynella SA 5161",
    Lat: -35.0946196575136,
    Long: 138.537527513493,
    StoreType: "Competitors"
  },
  {
    StoreName: "Kennards Self Storage Seaford Meadows",
    Addr: "31 Seaford Rd, Seaford Meadows SA 5169",
    Lat: -35.1795634004127,
    Long: 138.490163450924,
    StoreType: "Competitors"
  },
  {
    StoreName: "Roomia Self Storage",
    Addr: "8 Devon St, Lonsdale SA 5160",
    Lat: -35.1147900964572,
    Long: 138.50057095435,
    StoreType: "Competitors"
  },
  {
    StoreName: "Roomia Self Storage Seaford",
    Addr: "535-541 Main S Rd, Old Noarlunga SA 5168",
    Lat: -35.1860766860909,
    Long: 138.490548476596,
    StoreType: "Competitors"
  },
  {
    StoreName: "U-Store-It Self Storage - Lonsdale",
    Addr: "20 Aldenhoven Rd, Lonsdale SA 5160",
    Lat: -35.1131541735983,
    Long: 138.496758682852,
    StoreType: "Competitors"
  },
  {
    StoreName: "Mid-Coast Self Storage",
    Addr: "15 Dunn St, Seaford SA 5169",
    Lat: -35.1850637707424,
    Long: 138.489484361764,
    StoreType: "Competitors"
  }
];

export default function CustomerMap() {
  const [geoData, setGeoData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: -35.1,
    longitude: 138.53,
    zoom: 10
  });

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
      {/* <Map
        initialViewState={{
          latitude: -35.1,
          longitude: 138.53,
          zoom: 10
        }}
        style={{ width: '100%', height: '100%' }}
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['postal-fill']}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverInfo(null)}
      > */}
       <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        interactiveLayerIds={['postal-fill']}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverInfo(null)}
        style={{ width: '100%', height: '100%' }}
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
          // <Marker
          //   key={idx}
          //   longitude={store.Long}
          //   latitude={store.Lat}
          //   anchor="bottom"
          // >
          //   <div
          //     onClick={() => setSelectedStore(store)}
          //     style={{
          //       backgroundColor: store.StoreType === "Us" ? '#007bff' : '#ff5733',
          //       width: '12px',
          //       height: '12px',
          //       borderRadius: '50%',
          //       border: '2px solid white',
          //       cursor: 'pointer'
          //     }}
          //     title={store.StoreName}
          //   />
          // </Marker>


//           <Marker
//   key={idx}
//   longitude={store.Long}
//   latitude={store.Lat}
//   anchor="bottom"
// >
//   <div style={{ textAlign: 'center' }}>
//     {/* Store name label (only show for competitors) */}
//     {store.StoreType === 'Competitors' && (
//       <div
//         style={{
//           // background: 'white',
//           padding: '2px 4px',
//           // borderRadius: '4px',
//           fontSize: '10px',
//           whiteSpace: 'nowrap',
//           color: '#333',
//           // boxShadow: '0 0 2px rgba(0,0,0,0.3)'
//         }}
//       >
//         {store.StoreName}
//       </div>
//     )}
//     {/* Colored marker dot */}
//     <div
//       onClick={() => setSelectedStore(store)}
//       style={{
//         backgroundColor: store.StoreType === "Us" ? '#007bff' : '#ff5733',
//         width: '10px',
//         height: '10px',
//         borderRadius: '50%',
//         border: '2px solid white',
//         margin: '0 auto',
//         cursor: 'pointer'
//       }}
//     />
//   </div>
// </Marker>

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
  bottom: 20,
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
