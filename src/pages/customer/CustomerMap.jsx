import React, { useEffect, useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import 'assets/mapbox-gl.css';
import geoDataRaw from 'data/poa_customer_map.json'; 

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

export default function CustomerMap() {
  const [geoData, setGeoData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    setGeoData(geoDataRaw);
  }, []);

  const handleMouseMove = (event) => {
    const { features, lngLat } = event;
    const feature = features && features.find(f => f.layer.id === 'postal-fill');
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

  // 🧠 Don't render the <Map> until geoData is ready
  if (!geoData) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Map
        initialViewState={{
          latitude: -25.2744,
          longitude: 133.7751,
          zoom: 4
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['postal-fill']}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverInfo(null)}
      >
        <Source id="postal-polygons" type="geojson" data={geoData}>
          <Layer
            id="postal-fill"
            type="fill"
            paint={{
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'customerCount'],
                0, '#F2F12D',
                5, '#EED322',
                10, '#E6B71E',
                20, '#DA9C20',
                50, '#CA8323'
              ],
              'fill-opacity': 0.6
            }}
          />
          <Layer
            id="postal-outline"
            type="line"
            paint={{
              'line-color': '#000',
              'line-width': 1
            }}
          />
        </Source>

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
      </Map>
    </div>
  );
}




// import React, { useEffect, useState } from 'react';
// import Map, { Marker, Source, Layer, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import geoDataRaw from 'data/poa_customer_map.json';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2xpMnlwMjltMHZhMTNnbGhhdDd1dWUyNiJ9.aDqg-guBjcnNuADQUlgtBQ';

// export default function CustomerMap() {
//   const [customers, setCustomers] = useState([]);
//   const [geoData, setGeoData] = useState(null);
//   const [hoverInfo, setHoverInfo] = useState(null);

//   useEffect(() => {
//     setGeoData(geoDataRaw);
//   }, []);

//   const handleMouseMove = (event) => {
//     const { features, point, lngLat } = event;
//     const feature = features && features.find((f) => f.layer.id === 'postal-fill');
//     if (feature) {
//       setHoverInfo({
//         longitude: lngLat.lng,
//         latitude: lngLat.lat,
//         postalCode: feature.properties.POA_CODE16 || feature.properties.POA_CODE,
//         customerCount: feature.properties.customerCount
//       });
//     } else {
//       setHoverInfo(null);
//     }
//   };

//   return (
//     <div style={{ width: '100%', height: '80vh' }}>
//       <Map
//         initialViewState={{
//           latitude: -25.2744,
//           longitude: 133.7751,
//           zoom: 4
//         }}
//         style={{ width: '100%', height: '100%' }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         mapboxAccessToken={MAPBOX_TOKEN}
//         interactiveLayerIds={['postal-fill']}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => setHoverInfo(null)}
//       >
//         {/* Shape Layer */}
//         {geoData && (
//           <Source id="postal-polygons" type="geojson" data={geoData}>
//             <Layer
//               id="postal-fill"
//               type="fill"
//               paint={{
//                 'fill-color': [
//                   'interpolate',
//                   ['linear'],
//                   ['get', 'customerCount'],
//                   0, '#F2F12D',
//                   5, '#EED322',
//                   10, '#E6B71E',
//                   20, '#DA9C20',
//                   50, '#CA8323'
//                 ],
//                 'fill-opacity': 0.6
//               }}
//             />
//             <Layer
//               id="postal-outline"
//               type="line"
//               paint={{
//                 'line-color': '#000',
//                 'line-width': 1
//               }}
//             />
//           </Source>
//         )}

//         {/* Customer markers (optional) */}
//         {customers.map((customer, idx) => (
//           <Marker
//             key={idx}
//             longitude={customer.longitude}
//             latitude={customer.latitude}
//             anchor="bottom"
//           >
//             <div
//               style={{
//                 backgroundColor: 'red',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%'
//               }}
//             />
//           </Marker>
//         ))}

//         {/* Tooltip Popup */}
//         {hoverInfo && (
//           <Popup
//             longitude={hoverInfo.longitude}
//             latitude={hoverInfo.latitude}
//             closeButton={false}
//             closeOnClick={false}
//             anchor="top"
//           >
//             <div style={{ fontSize: '12px' }}>
//               <div><strong>Postal Code:</strong> {hoverInfo.postalCode}</div>
//               <div><strong>Customers:</strong> {hoverInfo.customerCount}</div>
//             </div>
//           </Popup>
//         )}
//       </Map>
//     </div>
//   );
// }

