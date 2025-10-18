import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface OriginSliderProps {
  value?: number[]
  max?: number
  onValueChange?: (value: number[]) => void
  label?: string
  showTicks?: boolean
  skipInterval?: number
}

export default function OriginSlider({
  value = [0],
  max = 100,
  onValueChange,
  label,
  showTicks = true,
  skipInterval = 10
}: OriginSliderProps) {
  const ticks = [...Array(max + 1)].map((_, i) => i)

  return (
    <div className="*:not-first:mt-4">
      {label && <Label>{label}</Label>}
      <div>
        <Slider
          value={value}
          max={max}
          onValueChange={onValueChange}
          aria-label={label || "Slider"}
        />
        {showTicks && (
          <span
            className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
            aria-hidden="true"
          >
            {ticks.map((_, i) => (
              <span
                key={i}
                className="flex w-0 flex-col items-center justify-center gap-2"
              >
                <span
                className={cn(
                  "bg-muted-foreground/70 h-1 w-px",
                  i % skipInterval !== 0 && "h-0.5"
                )}
              />
                <span className={cn(i % skipInterval !== 0 && "opacity-0")}>
                  {i}
                </span>
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}
