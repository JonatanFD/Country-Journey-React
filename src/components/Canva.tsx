import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { getCities, getRoutes } from "../services/api";
import { useGraph } from "@/hooks/useGraph";
import Konva from "konva";
import { useJourney } from "@/hooks/useJourney";

export default function Canva() {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const { cities, routes, setCities, setRoutes } = useGraph();
    const stageRef = useRef<Konva.Stage>(null);

    const { cost, path } = useJourney();

    // Zoom
    const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.2;
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

        const newScale =
            direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

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
    }, []);

    // Fetch routes
    useLayoutEffect(() => {
        if (routes.length !== 0) return;
        getRoutes().then((data) => {
            setRoutes(data);
        });
    }, []);

    useEffect(() => {
        if (path.length === 0) return;
        if (!stageRef.current) return;

        console.log("updating path in canvas");
        console.log(path);

        const lines = stageRef.current?.find("Line");

        console.log(lines);

        lines?.forEach((line) => {
            const id = line.id();
            
            for (let i = 0; i < path.length - 1; i++) {
                if (
                    id.includes(path[i]) &&
                    id.includes(path[i + 1])
                ) {
                    line.setAttr("stroke", "red");
                }
            }
        });
    }, [cost, path]);

    return (
        <Stage
            width={screenSize.width}
            height={screenSize.height}
            draggable
            onWheel={handleZoom}
            ref={stageRef}
        >
            <Layer>
                {routes.map((route) => {
                    const from = cities.find(
                        (city) => `${city.city},${city.country}` === route.from
                    );
                    const to = cities.find(
                        (city) => `${city.city},${city.country}` === route.to
                    );

                    if (!from || !to) return null;

                    return (
                        <Line
                            key={route.from + route.to}
                            points={[
                                from.longitude,
                                from.latitude,
                                to.longitude,
                                to.latitude,
                            ]}
                            stroke="green"
                            id={route.from + route.to}
                        />
                    );
                })}

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
