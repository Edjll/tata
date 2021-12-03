import './leaflet-map.css';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {CustomMarkerGroup} from "./custom-marker-group";
import {icon, LatLngExpression, Map} from "leaflet";
import React, {useEffect, useState} from "react";

export interface MarkerType {
    coordinates: LatLngExpression,
    id: number,
    icon: number
}

interface LeafletMapProps {
    defaultCenter: LatLngExpression,
    selectedMarker: MarkerType | null,
    icons: string [],
    markers: MarkerType [],
    markerClickHandler: Function
}

export const LeafletMap = ({defaultCenter, selectedMarker, icons, markers, markerClickHandler}: LeafletMapProps) => {
    const [map, setMap] = useState<Map | null>(null);

    console.log(123);

    useEffect(() => {
        changeSize();
    }, []);

    const changeSize = () => {
        map?.invalidateSize();
        if (selectedMarker !== null)
            map?.setView(selectedMarker?.coordinates);
        else
            map?.setView(defaultCenter);
    }

    return (
        <div className={'leaflet-map'}>
            <MapContainer
                center={defaultCenter}
                zoom={13}
                scrollWheelZoom={true}
                whenCreated={(map) => {
                    setMap(map);
                    map.invalidateSize();
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CustomMarkerGroup>
                    {
                        markers.map(
                            (marker, index) =>
                                <Marker key={index}
                                        position={marker.coordinates}
                                        icon={icon({
                                            iconUrl: icons[marker.icon],
                                            iconAnchor: [50, 50],
                                            iconSize: [80, 80]
                                        })}
                                        eventHandlers={{click: () => {
                                            markerClickHandler(marker);
                                            changeSize();
                                        }}}
                                />
                        )
                    }
                </CustomMarkerGroup>
            </MapContainer>
        </div>
    )
}