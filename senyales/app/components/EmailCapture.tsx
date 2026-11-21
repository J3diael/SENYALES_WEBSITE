"use client"

import { useState, type FormEvent } from "react"

type Status = "idle" | "loading" | "success" | "error"

export default function EmailCapture() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.")

      setStatus("success")
      setMessage(data.message || "You're on the list. Watch for the sign.")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="signup" className="py-32 px-6 bg-[#111111] text-center scroll-mt-10">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">The First Collection Is Coming</h2>

        <p className="text-gray-400 mb-8">Be notified when the sign drops.</p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
          <label htmlFor="signup-email" className="sr-only">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            className="px-4 py-3 bg-black border border-gray-600 outline-none focus:border-white md:w-72"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 border border-gray-500 hover:border-white transition disabled:opacity-50"
          >
            {status === "loading" ? "SENDING…" : "GET EARLY ACCESS"}
          </button>
        </form>

        <p
          role="status"
          className={`text-sm mt-4 ${
            status === "success" ? "text-[#C2A878]" : status === "error" ? "text-red-400" : "text-gray-500"
          }`}
        >
          {message || "No spam. Only signals."}
        </p>
      </div>
    </section>
  )
}
