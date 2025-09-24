"use client"

export default function Error({ error }: { error: Error }) {
  const isError = error instanceof Error;
  const message = isError ? error.message : "An unknown error occurred";

  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
}
