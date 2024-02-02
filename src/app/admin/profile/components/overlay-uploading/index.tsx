export const OverlayUploading = () => {
  return (
    <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-base-300 bg-opacity-80'>
      <div className='loading loading-spinner loading-xs text-base-content' />
      <span className='mt-2 text-sm font-semibold text-base-content/70'>
        Uploading...
      </span>
    </div>
  )
}
