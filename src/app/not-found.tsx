import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sun-700 font-semibold uppercase tracking-wider text-sm">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">
        Page not found
      </h1>
      <p className="mt-3 text-ink-soft">
        That page doesn't exist — but the smart sunscreen timer is right here.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-sun-500 px-5 py-3 font-semibold text-white shadow-card hover:bg-sun-600"
      >
        Back to the timer
      </Link>
    </div>
  );
}
