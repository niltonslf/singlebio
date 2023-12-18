import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import {authStore} from '@/app/auth/context/auth-store'
import {firebaseStorage} from '@/libs/firebase'

export const useWallpaperUploader = () => {
  const user = authStore.user

  const upload = async (imageFile: File): Promise<string> => {
    if (!user) throw new Error('user is not authenticated')

    const imageArray = await imageFile.arrayBuffer()

    const fileRef = `wallpapers/${user.username}/wallpaper.jpg`
    const storageRef = ref(firebaseStorage, fileRef)

    await uploadBytes(storageRef, imageArray)
    return await getDownloadURL(storageRef)
  }

  return {
    upload,
  }
}
