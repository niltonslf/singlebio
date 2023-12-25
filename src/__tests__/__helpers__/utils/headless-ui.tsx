export const TransitionRoot = ({
  children,
  className,
  show = true,
}: {
  children: React.ReactNode
  className: string
  show?: boolean
}) => (show ? <div className={className}>{children}</div> : null)

export const createReturnChildren =
  () =>
  ({className, children}: {className: string; children: React.ReactNode}) => (
    <div className={className}>{children}</div>
  )
