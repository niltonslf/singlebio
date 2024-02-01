import {User} from '@/domain/models'

type SpotifyEmbed01Props = {
  user: User
}

export const SpotifyEmbed01 = ({user}: SpotifyEmbed01Props) => {
  const url = user?.features?.spotify?.url || ''

  const regex = new RegExp(/.+\.com\/(\w+)\/(\w+)/)
  const [, type, id] = regex.exec(url) || [undefined, null, null]

  if (url === '') return null

  if (!type || !id)
    return (
      <div className='alert alert-error'>
        There's something wrong. Please check the url.
      </div>
    )
  return (
    <iframe
      src={`https://open.spotify.com/embed/${type}/${id}`}
      width='100%'
      height='80px'
      allow='encrypted-media'
      className='mt-5'></iframe>
  )
}
