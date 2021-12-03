import './custom-marker-group.css';
import {ReactNode} from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, {DivIcon, Marker, MarkerCluster} from "leaflet";
import ClassNameService from "../../service/class-name-service";

interface CustomMarkerGroupProps {
    children: ReactNode,
    className?: string
}

export const CustomMarkerGroup = ({children, className}: CustomMarkerGroupProps) => {

    const colors = [
        '#ef4040', '#2dac49'
    ];

    const generateColors = (markers: Marker []): string => {
        const counts: number[] = [];
        const tmp: {[key: string]: number} = { };
        let allCount = 0;
        markers.forEach(marker => {
            if (marker.options.icon?.options.iconUrl === undefined) return;
            if (tmp[marker.options.icon?.options.iconUrl] === undefined) {
                tmp[marker.options.icon?.options.iconUrl] = counts.length;
                counts.push(1);
            } else {
                counts[tmp[marker.options.icon?.options.iconUrl]]++;
            }
            allCount++;
        });
        const rel = 360 / allCount;
        const generatedColors: string [] = [];
        colors.forEach((color, index) => generatedColors.push(`${color} ${index > counts.length - 1 ? 0 : counts[index] * rel}deg`));
        return generatedColors.join(', ');
    }

    const iconCreateFunction = (cluster: MarkerCluster): DivIcon => {
        return L.divIcon({
            html: `<div class="custom-marker-group__pie" style="background-image: conic-gradient(${generateColors(cluster.getAllChildMarkers())})">
                <div class="custom-marker-group__value">${cluster.getChildCount()}</div>
            </div>`,
            className: ClassNameService.generateString('custom-marker-group', className),
            iconSize: L.point(50, 50, true),
        });
    }

    return (
        <MarkerClusterGroup iconCreateFunction={iconCreateFunction} showCoverageOnHover={false}>
            {children}
        </MarkerClusterGroup>
    );
}