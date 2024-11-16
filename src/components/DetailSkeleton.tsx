import { Skeleton } from "./ui/skeleton";

export default function DetailSkeleton() {
    return (
        <section className="flex gap-4">
            <div className="w-[300px]">
                <Skeleton className="w-full h-48 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
            </div>

            <div className="w-[500px]">
                <div>
                    <Skeleton className="w-full h-24 mb-2" />
                    <Skeleton className="w-full h-6 mb-2" />
                </div>
                <div>
                    <Skeleton className="w-full h-24 mb-2" />
                    <Skeleton className="w-full h-6 mb-2" />
                </div>

                <div>
                    <Skeleton className="w-full h-24 mb-2" />
                    <Skeleton className="w-full h-6 mb-2" />
                </div>
            </div>
        </section>
    );
}
