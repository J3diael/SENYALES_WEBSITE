export default function EmailCapture() {
  return (
    <section className="py-32 px-6 bg-[#111111] text-center">
      <div className="max-w-xl mx-auto">

        <h2 className="text-3xl font-semibold mb-6">
          The First Collection Is Coming
        </h2>

        <p className="text-gray-400 mb-8">
          Be notified when the sign drops.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 bg-black border border-gray-600 outline-none"
          />

          <button className="px-6 py-3 border border-gray-500 hover:border-white transition">
            GET EARLY ACCESS
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          No spam. Only signals.
        </p>

      </div>
    </section>
  );
}