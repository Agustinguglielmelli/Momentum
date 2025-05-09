import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MyMapComponent.css'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    if (!query) return

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    )
    const data = await response.json()

    if (data.length > 0) {
      const { lat, lon } = data[0]
      onSearch([parseFloat(lat), parseFloat(lon)])
    } else {
      alert('Location not found')
    }
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <Link to="/events" className="back-button">
        Back
      </Link>
    </div>
  )
}

function FlyToLocation({ coords }) {
  const map = useMap()
  if (coords) map.flyTo(coords, 15)
  return null
}

export default function MyMapComponent() {
  const [searchCoords, setSearchCoords] = useState(null)

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <SearchBar onSearch={setSearchCoords} />
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchCoords && (
          <>
            <FlyToLocation coords={searchCoords} />
            <Marker position={searchCoords}>
              <Popup>Search Result</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  )
}

