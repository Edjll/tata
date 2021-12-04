import './map-page.css';
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {LeafletMap, MarkerType} from "../leaflet-map";
import {RequestService} from "../../../service/request-service";

interface Camera extends MarkerType {
    latitude: number,
    longitude: number
}

interface MapPageProps {
    to: string
}

export const MapPage = ({to}: MapPageProps) => {
    const [cameras, setCameras] = useState<Camera []>([]);
    const navigate = useNavigate();
    const params = useParams();
    const icons = [
        'data:image/png;base64,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',
        'data:image/png;base64,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'
    ];

    useEffect(() => {
        RequestService
            .getInstance()
            .get(RequestService.BACKEND_URL + 'v1/cameras')
            .then(response => {
                setCameras(
                    response.data.content.map(
                        (data: Camera) => {
                            return {
                                coordinates: [data.longitude, data.latitude],
                                icon: 0,
                                id: data.id
                            }
                        }
                    )
                );
            });
    }, []);

    const getCurrentCameraFromParams = () => {
        if (params.id !== undefined) {
            const id = Number(params.id);
            const camera = cameras.find(camera => camera.id === id);
            if (camera !== undefined) {
                return camera;
            }
        }
        return null;
    }

    const [currentCamera, setCurrentCamera] = useState<Camera | null>(null);

    useEffect(() => {
        setCurrentCamera(getCurrentCameraFromParams());
    }, [params, cameras]);

    return (
        <div className={'map-page'}>
            <LeafletMap
                defaultCenter={[54.89218755754985, 52.2955119138831]}
                selectedMarker={currentCamera}
                icons={icons}
                markers={cameras}
                markerClickHandler={(marker: MarkerType) => navigate(`/${to}/${marker.id}`)}
            />
            <Outlet/>
        </div>
    );
}