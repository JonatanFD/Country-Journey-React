import { useGraph } from "@/hooks/useGraph";
import { useHistorial } from "@/hooks/useHistorial";
import { useJourney } from "@/hooks/useJourney";
import { useSelector } from "@/hooks/useSelector";
import { getCities, getRoutes } from "@/services/api";
import { City, Route } from "@/types";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { Circle, Layer, Line, Stage } from "react-konva";

// Memoized Line component
const MemoizedLine = memo(
    ({
        route,
        from,
        to,
        canvaLines,
        setNombre,
    }: {
        route: Route;
        from: City;
        to: City;
        canvaLines: React.MutableRefObject<{ [lineId: string]: Konva.Line }>;
        setNombre: (nombre: string) => void;
    }) => {
        console.log("rendering line");

        return (
            <Line
                points={[
                    from.longitude,
                    from.latitude,
                    to.longitude,
                    to.latitude,
                ]}
                stroke="green"
                strokeWidth={4}
                id={route.from + "-" + route.to}
                ref={(lineRef) => {
                    if (lineRef) {
                        canvaLines.current[route.from + "-" + route.to] =
                            lineRef;
                    }
                }}
                onClick={() => {
                    setNombre(route.from + "-" + route.to);
                    canvaLines.current[route.from + "-" + route.to]?.stroke(
                        "red"
                    );
                }}
            />
        );
    }
);

// Memoized Circle component
const MemoizedCircle = memo(({ city }: { city: City }) => {
    console.log("rendering circle");

    return (
        <Circle x={city.longitude} y={city.latitude} radius={5} fill="white" />
    );
});

const Canva = memo(() => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const { routes, cities, setCities, setRoutes } = useGraph();
    const { setNombre } = useSelector();
    const { path, cost } = useJourney();
    const { currentPath } = useHistorial();
    const canvaLines = React.useRef<{ [lineId: string]: Konva.Line }>({});

    // zoom
    const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>) => {
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
        stage.position({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    }, []);

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
        });
    }, []);

    useEffect(() => {
        if (!path || !path.length) return;
        const lines = canvaLines.current;

        for (let i = 0; i < path.length - 1; i++) {
            const line =
                lines[`${path[i]}-${path[i + 1]}`] ??
                lines[`${path[i + 1]}-${path[i]}`];
            if (line) {
                line.stroke("red").strokeWidth(3);
            }
        }
    }, [path, cost]);

    useLayoutEffect(() => {
        if (!currentPath || !currentPath.length) return;
        const lines = canvaLines.current;

        for (let i = 0; i < currentPath.length - 1; i++) {
            const line =
                lines[`${currentPath[i]}-${currentPath[i + 1]}`] ??
                lines[`${currentPath[i + 1]}-${currentPath[i]}`];
            if (line) {
                line.stroke("green").strokeWidth(4);
            }
        }
    }, [currentPath]);

    return (
        <Stage
            width={screenSize.width}
            height={screenSize.height}
            onWheel={handleZoom}
            draggable
        >
            <Layer listening={false}>
                {routes.map((route) => {
                    const from = cities.find(
                        (city) => `${city.city},${city.country}` === route.from
                    );
                    const to = cities.find(
                        (city) => `${city.city},${city.country}` === route.to
                    );
                    if (!from || !to) return null;

                    return (
                        <MemoizedLine
                            key={route.from + "-" + route.to}
                            route={route}
                            from={from}
                            to={to}
                            canvaLines={canvaLines}
                            setNombre={setNombre}
                        />
                    );
                })}

                {cities.map((city) => (
                    <MemoizedCircle
                        key={city.city + "-" + city.country}
                        city={city}
                    />
                ))}
            </Layer>
        </Stage>
    );
});

export default Canva;
