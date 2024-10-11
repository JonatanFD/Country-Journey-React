import { useEffect, useLayoutEffect, useState } from "react";
import { Circle, Layer, Stage } from "react-konva";
import { getCities } from "../services/api";
import { City } from "../types";
import { KonvaEventObject } from "konva/lib/Node";


export default function Canva() {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [cities, setCities] = useState<City[]>([]);

    // Zoom
    const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.20;
        const stage = e.target.getStage();
        if (!stage) return;

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        if (!pointer) return;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;
        if (e.evt.ctrlKey) {
            direction = -direction;
        }

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
    };

    // Update Screen Size on Resize
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });
    }, []);

    // Fetch cities
    useLayoutEffect(() => {
        if (cities.length !== 0) return;
        getCities().then((data) => {
            setCities(data);
        });
    }, [cities]);

    return (
        <Stage
            width={screenSize.width}
            height={screenSize.height}
            draggable
            onWheel={handleZoom}
        >
            <Layer>
                {cities.map((city) => (
                    <Circle
                        key={city.city + city.country}
                        x={city.longitude}
                        y={city.latitude}
                        radius={5}
                        fill="white"
                    />
                ))}
            </Layer>
        </Stage>
    );
}



