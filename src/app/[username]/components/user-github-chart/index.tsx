import Image from 'next/image'
import Link from 'next/link'

import {User} from '@/domain/models'

type UserGithubChartProps = {
  user: User
}

export const UserGithubChart = ({user}: UserGithubChartProps) => {
  const github = user.features?.github.username
  return (
    <>
      {github && (
        <div className='mt-5 bg-white p-2 md:p-5'>
          <Link
            href={`https://github.com/${github}`}
            target='_blank'
            title={`${github} profile`}>
            <Image
              src={`https://ghchart.rshah.org/${github}.svg`}
              width='600'
              height='150'
              className='w-full'
              alt={`${github} chart`}
            />
          </Link>
        </div>
      )}
    </>
  )
}
