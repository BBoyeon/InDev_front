// src/components/StoreMap.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './StoreMap.css'

// ⛳ Mapbox 토큰 (env에 VITE_MAPBOX_TOKEN으로 넣는 걸 권장)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function StoreMap({ stores = [], radiusKm = 3 }) {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const [userPos, setUserPos] = useState(null)
  const [error, setError] = useState(null)

  const toRad = (d) => (d * Math.PI) / 180
  const distanceKm = (a, b) => {
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLng = toRad(b.lng - a.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
    return 2 * R * Math.asin(Math.sqrt(x))
  }

  const nearbyStores = useMemo(() => {
    if (!userPos) return []
    return stores
      .map((s) => ({ ...s, _dist: distanceKm(userPos, { lat: s.lat, lng: s.lng }) }))
      .filter((s) => s._dist <= radiusKm)
      .sort((a, b) => a._dist - b._dist)
  }, [stores, userPos, radiusKm])

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 정보를 지원하지 않아요.')
      setUserPos({ lat: 37.5665, lng: 126.9780 }) // 서울 시청
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        console.warn(err)
        setError('위치 권한을 허용하면 주변 가게가 더 정확히 보여요.')
        setUserPos({ lat: 37.5665, lng: 126.9780 })
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 }
    )
  }, [])

  useEffect(() => {
    if (!mapContainer.current || !userPos) return
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [userPos.lng, userPos.lat],
      zoom: 14,
    })
    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    }))

    const me = document.createElement('div')
    me.className = 'me-pin'
    new mapboxgl.Marker({ element: me })
      .setLngLat([userPos.lng, userPos.lat])
      .setPopup(new mapboxgl.Popup({ offset: 24 }).setHTML('<b>내 위치</b>'))
      .addTo(map)

    return () => map.remove()
  }, [userPos])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !userPos) return

    if (!map._storeMarkers) map._storeMarkers = []
    map._storeMarkers.forEach((m) => m.remove())
    map._storeMarkers = []

    const bounds = new mapboxgl.LngLatBounds()
    bounds.extend([userPos.lng, userPos.lat])

    nearbyStores.forEach((s) => {
      const el = document.createElement('button')
      el.className = 'store-pin'

      // ✅ hover용 popup (이름만)
      const hoverPopup = new mapboxgl.Popup({
        offset: 24,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`<div class="popup-name">${s.name}</div>`)

      // ✅ 클릭용 popup (상세정보)
      const clickPopup = new mapboxgl.Popup({ offset: 24 }).setHTML(`
        <div class="popup">
          <div class="popup-title">${s.name}</div>
          <div class="popup-sub">${s.category ?? ''}</div>
          <div class="popup-addr">${s.address ?? ''}</div>
          <div class="popup-dist">${s._dist?.toFixed(2)} km</div>
        </div>
      `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([s.lng, s.lat])
        .setPopup(clickPopup) // ✅ 클릭하면 상세 popup
        .addTo(map)

      // ✅ hover 이벤트
      el.addEventListener('mouseenter', () =>
        hoverPopup.addTo(map).setLngLat([s.lng, s.lat])
      )
      el.addEventListener('mouseleave', () => hoverPopup.remove())

      map._storeMarkers.push(marker)
      bounds.extend([s.lng, s.lat])
    })

    if (nearbyStores.length > 0) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 500 })
    } else {
      map.setCenter([userPos.lng, userPos.lat])
      map.setZoom(14)
    }
  }, [nearbyStores, userPos])

  return (
    <div className="store-map-wrap">
      {error && <div className="map-hint">{error}</div>}
      <div ref={mapContainer} className="store-map-container" />
      <div className="map-legend">
        <span className="dot me" /> 내 위치
        <span className="sep" />
        <span className="dot store" /> 주변 가게 (반경 {radiusKm}km)
      </div>
    </div>
  )
}
