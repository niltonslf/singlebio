export const useImageCompressor = () => {
  const MAX_WIDTH = 1920
  const MAX_HEIGHT = 1080

  const compress = async (imageFile: File): Promise<File> => {
    const img = new Image()
    const fileReader = new FileReader()

    return new Promise((resolve, reject) => {
      const createFileFromBlob: BlobCallback = blob => {
        if (!blob) return

        const imageResized = new File([blob], imageFile.name, {
          type: imageFile.type,
          lastModified: Date.now(),
        })

        resolve(imageResized)
      }

      fileReader.onload = ev => {
        img.src = ev.target?.result?.toString() || ''

        img.onload = () => {
          const canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')

          context?.drawImage(img, 0, 0)

          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          context = canvas.getContext('2d')

          context?.drawImage(img, 0, 0, width, height)
          context?.canvas.toBlob(createFileFromBlob, imageFile.type, 0.8)
        }
      }
      fileReader.onerror = () => {
        reject('failed to compress image')
      }

      fileReader.readAsDataURL(imageFile)
    })
  }

  return {
    compress,
  }
}
