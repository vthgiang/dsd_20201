import React, { useState } from 'react';
export const UAVContext = React.createContext();

export const TRU_SO = { lat: 21.005036744372838, lng: 105.84404867004567 };

export default function UAVProvider(props) {
    
    const [droneSelected, setDroneSelected] = useState(null);
    const [zoneSelected, setZoneSelected] = useState(null);
    const [curPos, setCurPos] = useState(TRU_SO);
    const [desPos, setDesPos] = useState(null);
    const [isFlying, setIsFlying] = useState(false);
    const [droneSpeed, setDroneSpeed] = useState(0);
    const [droneHeight, setDroneHeight] = useState(0);
    const [isMoving, setIsMoving] = useState(false);

    return (<UAVContext.Provider value={{
        droneSelected, setDroneSelected,
        zoneSelected, setZoneSelected,
        curPos, setCurPos,
        desPos, setDesPos,
        isFlying, setIsFlying,
        droneSpeed, setDroneSpeed,
        droneHeight, setDroneHeight,
        isMoving, setIsMoving
    }}>
        {props.children}
    </UAVContext.Provider>)
}
