import { Container, Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <Container className="py-16">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-6 w-96 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="neo-border p-6">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </Container>
  );
}
