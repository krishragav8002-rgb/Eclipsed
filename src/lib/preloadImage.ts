/**
 * Warm one image in the browser's cache without rendering it. The set keeps a
 * screen that preloads the same neighbour repeatedly from starting duplicate
 * requests; the actual `<img>` still reuses whatever the browser already has.
 */
const preloaded = new Set<string>()

export function preloadImage(src: string | undefined | null) {
  if (!src || preloaded.has(src)) return
  preloaded.add(src)

  const image = new Image()
  image.decoding = 'async'
  image.src = src
}
