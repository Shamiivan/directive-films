import { lazy, Suspense } from 'react';

const SmoothCursor = lazy(() => import("./SmoothCursor"));

export default function ClientCursorWrapper() {
  return (
    <Suspense fallback={null}>
      <SmoothCursor />
    </Suspense>
  );
}
