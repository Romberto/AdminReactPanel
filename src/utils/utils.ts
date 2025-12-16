export default async function convertToWebP(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)

  return await new Promise<Blob>(resolve =>
    canvas.toBlob(blob => resolve(blob!), 'image/webp', 0.7)
  )
}
