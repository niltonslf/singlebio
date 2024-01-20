import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import {authStore} from '@/app/auth/context/auth-store'
import {storage} from '@/services/firebase'

export const useImageUploader = () => {
  const user = authStore.user

  const returnImageThumbnail = (file: File) => URL.createObjectURL(file)

  const upload = async (imageFile: File, filename: string): Promise<string> => {
    if (!user) throw new Error('user is not authenticated')

    const imageArray = await imageFile.arrayBuffer()

    const fileRef = `uploads/${user.uid}/${filename}.jpg`
    const storageRef = ref(storage, fileRef)

    await uploadBytes(storageRef, imageArray, {
      contentType: imageFile.type,
    })
    return await getDownloadURL(storageRef)
  }

  return {
    upload,
    returnImageThumbnail,
  }
}
