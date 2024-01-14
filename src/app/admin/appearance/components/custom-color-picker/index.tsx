import {Palette} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'
import {HexAlphaColorPicker, HexColorInput} from 'react-colorful'

type CustomColorPickerProps = {
  color: string
  onChange: (value: string) => void
}

export const CustomColorPicker = ({
  color,
  onChange,
}: CustomColorPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [showBtnPicker, setShowBtnPicker] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowBtnPicker(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setShowBtnPicker])
  return (
    <div
      ref={containerRef}
      className='relative w-full rounded-lg border border-neutral bg-base-100 p-2'
      data-testid='color-picker'>
      <div
        onClick={() => setShowBtnPicker(prev => !prev)}
        className='
                flex w-full cursor-pointer flex-row items-center justify-end gap-2 rounded-md'>
        <Palette size={23} />
        <div
          className='h-8 w-full rounded-md border border-neutral'
          style={{backgroundColor: color}}></div>
      </div>
      {showBtnPicker && (
        <>
          <HexAlphaColorPicker
            style={{
              width: '100%',
              height: '300px',
              marginTop: 10,
            }}
            color={color}
            onChange={color => onChange(color)}
          />
          <div className='mt-2 w-full'>
            <HexColorInput
              prefix='#'
              prefixed={true}
              alpha
              style={{
                borderRadius: 5,
                width: '100%',
                backgroundColor: '#25252c',
                padding: '3px 5px',
                color: 'white',
              }}
              color={color}
              onChange={color => onChange(color)}
            />
          </div>
        </>
      )}
    </div>
  )
}
