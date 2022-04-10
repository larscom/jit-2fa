import { PropsWithChildren, Suspense } from 'react';

function SuspenseWithoutFallback<T>({ children }: PropsWithChildren<T>) {
  return <Suspense fallback={false}>{children}</Suspense>;
}

export default SuspenseWithoutFallback;
