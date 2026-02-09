import { Container, Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Container className="text-center py-32">
        <div className="inline-block border-3 border-black bg-white px-6 py-3 neo-shadow mb-8">
          <span className="text-6xl font-black">404</span>
        </div>
        <h1 className="heading-caps text-3xl mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="neo-btn bg-black text-white px-6 py-3 text-sm inline-block"
        >
          Go Home
        </Link>
      </Container>
    </div>
  );
}
