import Link from "next/link";

export default function Success() {
  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c] min-h-screen flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="reflection rounded-2xl p-10 sm:p-14 max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-[#b8860b]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl" aria-hidden>✓</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#1c1c1c] mb-3">
          Payment successful
        </h1>
        <p className="text-neutral-600 mb-8">
          Thank you for your order. We’ll be in touch shortly with confirmation
          and details.
        </p>
        <Link
          href="/sweet-treats"
          className="btn-gold inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider"
        >
          Back to ordering
        </Link>
        <p className="mt-6">
          <Link href="/" className="text-neutral-500 hover:text-[#b8860b] transition-colors text-sm">
            Return to home
          </Link>
        </p>
      </div>
    </main>
  );
}
