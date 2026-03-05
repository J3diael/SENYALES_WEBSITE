export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-2xl">
       <h1 className="text-[10vw] leading-none font-semibold hero-glow mb-6">
  THE SIGN WAS SENT.
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          You just need to manifest the future.
        </p>

        <button className="border border-gray-500 px-8 py-3 hover:border-white transition">
          JOIN THE FIRST DROP
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Limited first release. No restocks.
        </p>
      </div>
    </section>
  );
}