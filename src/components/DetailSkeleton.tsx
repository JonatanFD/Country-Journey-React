import {
    CardContent,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function DetailSkeleton() {
    return (
        <CardContent className="space-y-4">
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-full h-6 mb-2" />
        </CardContent>
    );
}
