import { cn } from '@/utils/cn'
import { ElementType, ComponentProps } from 'react'

export const classed =
  <T extends ElementType>(TagName: T) =>
  (classes: string) =>
  // eslint-disable-next-line react/display-name
  (props: ComponentProps<T>) => {
    const { className, ...rest } = props

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <TagName className={cn(classes, className)} {...(rest as any)} />
  }
