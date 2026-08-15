import { ref } from 'vue'

const STORAGE_KEY = 'fab-position'
const FAB_SIZE = 56
const MARGIN = 16
const DRAG_THRESHOLD = 6

interface Position {
  x: number
  y: number
}

function defaultPosition(): Position {
  return {
    x: window.innerWidth - FAB_SIZE - MARGIN,
    y: window.innerHeight - FAB_SIZE - MARGIN * 6,
  }
}

function clamp(pos: Position): Position {
  const maxX = Math.max(window.innerWidth - FAB_SIZE - MARGIN, MARGIN)
  const maxY = Math.max(window.innerHeight - FAB_SIZE - MARGIN, MARGIN)

  return {
    x: Math.min(Math.max(pos.x, MARGIN), maxX),
    y: Math.min(Math.max(pos.y, MARGIN), maxY),
  }
}

function loadPosition(): Position {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return clamp(JSON.parse(stored))
  } catch {
    // localStorage indisponível ou valor corrompido: usa a posição padrão
  }
  return defaultPosition()
}

const position = ref<Position>(loadPosition())
const isDragging = ref(false)

export const FAB_BUTTON_SIZE = FAB_SIZE

export function useFabPosition() {
  function savePosition() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(position.value))
  }

  function startDrag(event: PointerEvent, onClick: () => void) {
    event.preventDefault()

    const startX = event.clientX
    const startY = event.clientY
    const originX = position.value.x
    const originY = position.value.y
    let moved = false

    function onPointerMove(moveEvent: PointerEvent) {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        moved = true
        isDragging.value = true
      }

      if (moved) {
        position.value = clamp({ x: originX + dx, y: originY + dy })
      }
    }

    function onPointerUp() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      if (moved) {
        savePosition()
        isDragging.value = false
      } else {
        onClick()
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  return { position, isDragging, startDrag }
}
