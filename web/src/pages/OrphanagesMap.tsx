import React, { useEffect, useState } from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, []);
    return (
        <div id="page-map">
            
            <Map 
                center={[-22.8749664,-43.242477]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVpc2NxZiIsImEiOiJja2dlNHhsMHQxN2QyMnNxcWkxY2NvamNuIn0.eM7J8578btuLFRvHesK1hg`} />
                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                    {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#FFF" />
                    </Link>
                </Popup>
                </Marker>
                    )
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    )
};

export default OrphanagesMap;