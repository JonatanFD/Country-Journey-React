import useFilters from "@/hooks/useFilters";
import { useGraph } from "@/hooks/useGraph";
import { useJourney } from "@/hooks/useJourney";
import { useSelector } from "@/hooks/useSelector";
import { getCities, getRoutes } from "@/services/api";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { Circle, FastLayer, Line, Stage } from "react-konva";

const Canva = memo(() => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const { routes, cities, setCities, setRoutes } = useGraph();
    const {setNombre} = useSelector()
    const {path, cost} = useJourney()
    const lines = React.useRef<{[lineId: string]:  Konva.Line}>({})
    console.log("rendering");
    const {setCountries} = useFilters()
    
    // zoom
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
    // fetch data for canvas
    useLayoutEffect(() => {
        if (routes.length !== 0) return;
        if (cities.length !== 0) return;
        getRoutes().then((data) => {
            setRoutes(data);
        });
        getCities().then((data) => {
            setCities(data);
            const countries = new Set(data.map((city) => city.country));
            const countriesArray = Array.from(countries);
            setCountries(countriesArray);
        });
    }, []);

    useEffect(() => {
        if (!path) return;
        
        for (let i = 0; i < path.length - 1; i++) {
            const line = lines.current[path[i] + "-" + path[i + 1]] ?? lines.current[path[i + 1] + "-" + path[i]];
            if (!line) return;
            line.stroke("red");
            line.strokeWidth(3);
        }
        
    }, [path, cost])
    return (
        <Stage
            width={screenSize.width}
            height={screenSize.height}
            onWheel={handleZoom}
            draggable
        >
            <FastLayer>
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
                            key={route.from + "-" + route.to}
                            points={[
                                from.longitude,
                                from.latitude,
                                to.longitude,
                                to.latitude,
                            ]}
                            stroke="green"
                            strokeWidth={4}
                            id={route.from + "-" + route.to}
                            ref={lineRef => {
                                if (!lineRef) return;
                                lines.current[route.from + "-" + route.to] = lineRef;
                            }}
                            onClick={() => {
                                setNombre(route.from + "-" + route.to);
                                lines.current[route.from + "-" + route.to].stroke("red");
                            }}
                        />
                    );
                })}

                {cities.map((city) => (
                    <Circle
                        key={city.city + "-" + city.country}
                        x={city.longitude}
                        y={city.latitude}
                        radius={5}
                        fill="white"
                    />
                ))}
            </FastLayer>
        </Stage>
    );
})

export default Canva