import React from 'react';
import './style.scss';

import Clock from '../../../assets/clock.svg';
import Distance from '../../../assets/distance.svg';
import Car from '../../../assets/car.svg';
import Public from '../../../assets/public.svg';
import Walk from '../../../assets/walk.svg';
import { updRouteType } from '../../../ducks/mapRouting';

const RouteInfo = ({ dispatch, routeInfo: { travelTime, distance }, routeType, isRoute }) => {
    const setRouteMode = (mode) => dispatch(updRouteType(mode));
    return (
        <React.Fragment>
            <div className="route-info">
                {isRoute ? (
                    <React.Fragment>
                        <div className="route-info-time">
                            <Clock width={12} height={12} />
                            <p>
                                Time: <span>{travelTime}</span>
                            </p>
                        </div>
                        <div className="route-info-distance">
                            <Distance width={12} height={12} />
                            <p>
                                Distance: <span>{distance}</span>
                            </p>
                        </div>
                    </React.Fragment>
                ) : (
                    <span className="nothing-found">Nothing was found</span>
                )}
            </div>
            <div className="select-transport">
                <div
                    className={`select-transport-item ${routeType === 'car' ? 'active' : ''}`}
                    onClick={() => setRouteMode('car')}
                    title="Car"
                >
                    <Car width={22} height={10} />
                </div>
                <div
                    className={`select-transport-item ${
                        routeType === 'publicTransport' ? 'active' : ''
                    }`}
                    onClick={() => setRouteMode('publicTransport')}
                    title="Public Transport"
                >
                    <Public width={18} height={12} />
                </div>
                <div
                    className={`select-transport-item ${
                        routeType === 'pedestrian' ? 'active' : ''
                    }`}
                    onClick={() => setRouteMode('pedestrian')}
                    title="Pedestrian"
                >
                    <Walk width={12} height={15} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default RouteInfo;
