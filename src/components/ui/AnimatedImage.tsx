import { useCallback, useState, type ImgHTMLAttributes, type ReactNode } from 'react'

interface AnimatedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  /** the optimised WebP, animated or still */
  src: string
  /** the original GIF or PNG, retried once if the WebP cannot load */
  fallbackSrc: string
  /** shown only after both the WebP and the original have failed */
  fallback?: ReactNode
}

/**
 * An ordinary image with one job: if its optimised WebP fails, try the original
 * GIF or PNG before giving up. The fallback state is tied to the primary `src`,
 * so swapping in the next image never inherits the previous one's error.
 */
export function AnimatedImage({
  src,
  fallbackSrc,
  fallback = null,
  ...props
}: AnimatedImageProps) {
  const [fallbackFor, setFallbackFor] = useState<string | null>(null)
  const [failedFor, setFailedFor] = useState<string | null>(null)

  const usingFallback = fallbackFor === src
  const failed = failedFor === src

  const handleError = useCallback(() => {
    // Retry the original image once. If it is somehow the same URL as the
    // WebP, or it has already failed, stop and let the caller draw its fallback.
    if (!usingFallback && fallbackSrc !== src) {
      setFallbackFor(src)
      return
    }
    setFailedFor(src)
  }, [src, fallbackSrc, usingFallback])

  if (failed) return <>{fallback}</>

  return (
    <img
      {...props}
      src={usingFallback ? fallbackSrc : src}
      onError={handleError}
    />
  )
}
