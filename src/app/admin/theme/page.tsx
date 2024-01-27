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
      <AdminBaseLayout.Content className='gap-5'>
        <h1 className='mb-8 text-2xl font-semibold'>Theme</h1>

        <SectionCard>
          <div className='carousel carousel-end w-full gap-3 '>
            {themes.map(theme => (
              <div
                key={theme.name}
                className={clsx([
                  'carousel-item w-40 cursor-pointer overflow-hidden rounded-md',
                  user?.theme?.name === theme.name &&
                    ' box-border border border-base-content p-2',
                ])}
                onClick={() => handleSelectTheme(theme)}>
                <Image
                  width={160}
                  height={285}
                  src={theme.image}
                  alt={theme.name}
                  className='w-full rounded-md'
                />
              </div>
            ))}
          </div>
          <div className='alert alert-info mt-5'>
            <Info size={18} />
            <span>
              Some of your customizations can be lost by selecting a new theme.
            </span>
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