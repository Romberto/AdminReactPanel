import React, { useState } from 'react'
import type { ImageRead } from '../types'
import { useReorderImagesMutation } from '../../../api/projectsApi'

type Props = {
  images: ImageRead[]
  projectId: number
  onReordered?: () => void
}

export default function ImageReorder({
  images: initial = [],
  projectId,
  onReordered,
}: Props) {
  const [items, setItems] = useState<ImageRead[]>(
    [...initial].sort((a, b) => a.ordering - b.ordering)
  )
  const [reorderImages] = useReorderImagesMutation()

  const onDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.setData('text/plain', String(idx))
    e.currentTarget.classList.add('opacity-50')
  }
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  const onDrop = (e: React.DragEvent, idx: number) => {
    const from = Number(e.dataTransfer.getData('text/plain'))
    if (isNaN(from)) return
    const updated = [...items]
    const [moved] = updated.splice(from, 1)
    updated.splice(idx, 0, moved)
    setItems(updated)
  }
  const saveOrder = async () => {
    const orders: Record<number, number> = {}
    items.forEach((it, i) => (orders[it.id] = i))
    await reorderImages({ project_id: projectId, orders }).unwrap()
    onReordered && onReordered()
  }

  return (
    <div>
      <p className="mb-2 text-sm text-slate-600">Drag images to reorder</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((img, idx) => (
          <div
            key={img.id}
            draggable
            onDragStart={e => onDragStart(e, idx)}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, idx)}
            className="border p-1"
          >
            <img
              src={`${img.public_url}`}
              className="w-full h-32 object-cover"
              alt={img.caption || ''}
            />
            <div className="text-xs mt-1">
              #{img.id} • order: {idx}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={saveOrder}
        >
          Save order
        </button>
      </div>
    </div>
  )
}
