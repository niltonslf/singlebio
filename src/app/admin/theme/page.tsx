'use client'

import clsx from 'clsx'
import {Info} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'

import {ThemeProps} from '@/app/[username]/themes/types'
import {adminStore} from '@/app/admin/context/admin-store'
import {authStore} from '@/app/auth/context/auth-store'
import {ThemeOption, themeOptions} from '@/constants/theme-options'
import {UserTheme} from '@/domain/models'

import {AdminBaseLayout, SectionCard, PagePreview} from '../components'

const ThemePage = observer(() => {
  const {user, socialPages, pageLinks} = adminStore
  const themes = Object.keys(themeOptions).map(key => themeOptions[key])

  const handleSelectTheme = async (theme: ThemeOption<ThemeProps>) => {
    const newData = {
      ...theme.defaultTheme,
      backgroundImage: user?.theme?.backgroundImage,
    } as UserTheme

    await authStore.updateUser({theme: newData})
  }

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <h1 className='mb-8 text-2xl font-semibold'>Theme</h1>

        <SectionCard>
          <div className='alert alert-info mb-5'>
            <Info size={18} />
            <span>
              Some of your customizations can be lost by selecting a new theme.
            </span>
          </div>

          <div className=' flex w-full flex-wrap gap-5 '>
            {themes.map(theme => (
              <div
                key={theme.name}
                className={clsx([
                  'w-[calc(25%-1.25rem)] cursor-pointer overflow-hidden rounded-md',
                  user?.theme?.name === theme.name &&
                    'box-border border border-base-content p-2',
                ])}
                onClick={() => handleSelectTheme(theme)}>
                <Image
                  width={180}
                  height={305}
                  src={theme.image}
                  alt={theme.name}
                  className='h-full w-full rounded-md object-cover'
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </AdminBaseLayout.Content>

      <AdminBaseLayout.PagePreview>
        {user && (
          <PagePreview
            pageLinks={pageLinks}
            socialPages={socialPages}
            user={user}
            theme={user.theme}
          />
        )}
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default ThemePage
