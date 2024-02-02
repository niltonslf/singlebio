import Image from 'next/image'
import Link from 'next/link'

import {UserFeature} from '@/domain/models'

type GithubChart01Props = {
  features: UserFeature[]
}

export const GithubChart01 = ({features}: GithubChart01Props) => {
  const github = features?.find(feature => feature.id === 'github')?.value ?? ''

  return (
    <>
      {github && (
        <div
          data-testid='user-page-github-chart'
          className='mt-5 bg-white p-2 md:p-5'>
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
