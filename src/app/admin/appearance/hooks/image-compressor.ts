export const useImageCompressor = () => {
  const compress = async (imageFile: ArrayBuffer): Promise<ArrayBuffer> => {
    return Promise.resolve(imageFile)
  }

  return {
    compress,
  }
}
