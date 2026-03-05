"use client"

import { useEffect, useState } from "react"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", move)

    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className="fixed w-3 h-3 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference"
    />
  )
}