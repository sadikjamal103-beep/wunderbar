'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  disabled?: boolean
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  className,
  external,
  disabled,
}: GoldButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase transition-all duration-300 select-none',
    {
      'text-xs px-6 py-2.5': size === 'sm',
      'text-xs px-8 py-3.5': size === 'md',
      'text-sm px-10 py-4.5': size === 'lg',
    },
    {
      'bg-gold-gradient text-dark-500 shadow-[0_0_30px_rgba(201,168,76,0.25)] hover:shadow-[0_0_50px_rgba(201,168,76,0.5)]':
        variant === 'solid',
      'border border-gold-500 text-gold-400 hover:bg-gold-500/10 hover:border-gold-300':
        variant === 'outline',
      'text-gold-400 hover:text-gold-300 hover:underline underline-offset-4':
        variant === 'ghost',
    },
    disabled && 'opacity-40 pointer-events-none',
    className
  )

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap:   { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  }

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={base} {...linkProps}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button className={base} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
