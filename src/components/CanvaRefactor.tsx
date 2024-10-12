import { useGraph } from "@/hooks/useGraph";
import { getCities, getRoutes } from "@/services/api";
import { useLayoutEffect } from "react";
import { Layer, Stage } from "react-konva";

export default function CanvaRefactor() {

    const {routes, cities, setCities, setRoutes} = useGraph();


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
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>

        </Layer>
    </Stage>
  )
}
