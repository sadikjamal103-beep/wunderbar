'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 700 })
  const dotX   = useSpring(cursorX, { damping: 40, stiffness: 900 })
  const dotY   = useSpring(cursorY, { damping: 40, stiffness: 900 })
  const isHovering = useRef(false)
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHoverIn  = () => { isHovering.current = true;  outerRef.current?.classList.add('scale-150') }
    const handleHoverOut = () => { isHovering.current = false; outerRef.current?.classList.remove('scale-150') }

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold-500 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold-400 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
