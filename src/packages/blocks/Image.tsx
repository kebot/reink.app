/* eslint-disable @next/next/no-img-element */
import React, { HTMLAttributes, useState } from 'react'

export function Image({
  children,
  src,
  'data-omnivore-original-src': originalSrc,
  alt,
  ...props
}: React.ComponentProps<'img'> & {
  'data-omnivore-anchor-idx': string
  'data-omnivore-original-src': string
}) {
  const [fallback, setFallback] = useState<boolean>(false)

  return (
    <img
      {...props}
      alt={alt}
      src={fallback ? originalSrc : src}
      onError={() => setFallback(true)}
    />
  )
}
