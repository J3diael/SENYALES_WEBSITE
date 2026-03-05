"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function HiddenSign() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-gray-400 hover:text-white transition"
      >
        PARADOX
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center text-center z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl px-6"
            >
              <h2 className="text-4xl font-semibold mb-6">
                You found the sign.
              </h2>

              <p className="text-gray-400 mb-6">
                The future you are searching for
                has already been sent.
              </p>

              <p className="text-xl">
                You are the paradox.
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-10 border px-6 py-2 hover:border-white transition"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}