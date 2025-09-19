import { classed } from '@/utils/classed'
import clsx from 'clsx'

type Ratio =
  | number
  | string
  | {
      mobile: number | string
      tablet?: number | string
      desktop?: number | string
    }

export function AspectRatio({
  children,
  ratio,
  rootClass,
  wrapperClass,
  className,
}: {
  children?: React.ReactNode
  /**
   * height / width
   */
  ratio: Ratio
  rootClass?: string
  wrapperClass?: string
  className?: string
}) {
  const style =
    typeof ratio === 'number' || typeof ratio === 'string'
      ? ({
          '--ratio-mobile': `${Number(ratio) * 100}%`,
          '--ratio-tablet': `${Number(ratio) * 100}%`,
          '--ratio-desktop': `${Number(ratio) * 100}%`,
        } as React.CSSProperties)
      : ({
          '--ratio-mobile': `${Number(ratio.mobile) * 100}%`,
          '--ratio-tablet': `${Number(ratio.tablet || ratio.mobile) * 100}%`,
          '--ratio-desktop': `${Number(ratio.desktop || ratio.tablet || ratio.mobile) * 100}%`,
        } as React.CSSProperties)

  return (
    <div
      className={clsx('relative w-full', rootClass, className)}
      style={style}
    >
      <Ratio>
        <div
          className={clsx(wrapperClass, 'absolute left-0 top-0 h-full w-full')}
        >
          {children}
        </div>
      </Ratio>
    </div>
  )
}

const Ratio = classed('div')(
  'pt-[var(--ratio-mobile)] tablet:pt-[var(--ratio-tablet)] desktop:pt-[var(--ratio-desktop)]',
)
