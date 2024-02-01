'use client'

import {AudioLines, Github, Info, Link2, LucideIcon, Share2} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {ComponentType, HTMLAttributes, useEffect, useState} from 'react'

import {
  AdminBaseLayout,
  PagePreview,
  BetaVersionWarningModal,
  PageLoader,
  Collapse,
  FeatureList,
  SocialPagesSection,
  GithubSection,
} from '@/app/admin/components'
import {CollapseBody} from '@/app/admin/components/collapse/collapse-body'
import {LinksSection} from '@/app/admin/components/links-section'
import {adminStore} from '@/app/admin/context/admin-store'
import {authStore} from '@/app/auth/context/auth-store'
import {SetUsernameModal} from '@/app/components'
import {User} from '@/domain/models'

type Feature = {
  title: string
  Icon: LucideIcon
  iconClass?: HTMLAttributes<HTMLElement>['className']
  Component: ComponentType<{user: User}>
}

const AdminPage = observer(() => {
  const {user, socialPages, pageLinks} = adminStore

  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showBetaWarningModal, setShowBetaWarningModal] = useState(false)

  const [availableFeatures, setAvailableFeatures] = useState<Feature[]>([
    {
      title: 'Links',
      Icon: Link2,
      iconClass: 'bg-blue-600',
      Component: LinksSection,
    },
    {
      title: 'Social',
      Icon: Share2,
      iconClass: 'bg-pink-600',
      Component: SocialPagesSection,
    },
    {
      title: 'Github',
      Icon: Github,
      Component: GithubSection,
    },
    {
      title: 'Spotify',
      Icon: AudioLines,
      iconClass: 'bg-green-600',
      Component: LinksSection,
    },
  ])

  const [Feature, setFeature] = useState<Feature[]>([])

  const handleEnableFeature = (feature: Feature) => {
    setFeature(prev => [...prev, feature])
    setAvailableFeatures(prev =>
      prev.filter(item => item.title != feature.title),
    )
  }

  const onSubmitUsername = async (username: string) => {
    await authStore.updateUser({username})
    setShowUsernameModal(false)
    setShowBetaWarningModal(true)
  }

  useEffect(() => {
    if (user != undefined && !user?.username) {
      setShowUsernameModal(true)
    } else {
      setShowUsernameModal(false)
    }
  }, [user, user?.username])

  if (!user) return <PageLoader />

  return (
    <>
      <AdminBaseLayout>
        <AdminBaseLayout.Content>
          <h1 className='mb-8 text-2xl font-semibold'>Sections</h1>

          {Feature.length === 0 ? (
            <div className='alert alert-info '>
              <Info size={15} />
              <div>
                <h3> All empty here 💨</h3>
                <div className='text-xs'>
                  Select one of the items in the list down below to start
                  creating your page.
                </div>
              </div>
            </div>
          ) : (
            <Collapse defaultOpen={0}>
              {Feature.map((feature, key) => (
                <Collapse.Item index={key} key={feature.title}>
                  <Collapse.Header
                    Icon={feature.Icon}
                    iconClass={feature.iconClass}>
                    {feature.title}
                  </Collapse.Header>
                  <CollapseBody>
                    <feature.Component user={user} />
                  </CollapseBody>
                </Collapse.Item>
              ))}
            </Collapse>
          )}

          <h2 className='mb-8 mt-10 text-base font-semibold'>Available</h2>

          {availableFeatures.length === 0 ? (
            <div className='alert alert-info '>
              <Info size={15} />
              <div>
                <h3>All empty here 💨</h3>
                <div className='text-xs'>Your page must be looking great!</div>
              </div>
            </div>
          ) : (
            <FeatureList>
              {availableFeatures.map(feature => (
                <FeatureList.Item
                  key={feature.title}
                  Icon={feature.Icon}
                  iconClass={feature.iconClass}
                  onClick={() => handleEnableFeature(feature)}>
                  {feature.title}
                </FeatureList.Item>
              ))}
            </FeatureList>
          )}
        </AdminBaseLayout.Content>

        <AdminBaseLayout.PagePreview>
          <PagePreview
            pageLinks={pageLinks}
            socialPages={socialPages}
            user={user}
            theme={user.theme}
          />
        </AdminBaseLayout.PagePreview>
      </AdminBaseLayout>

      <SetUsernameModal
        onSave={onSubmitUsername}
        initialOpen={showUsernameModal}
      />
      <BetaVersionWarningModal
        isOpen={showBetaWarningModal}
        onClose={() => setShowBetaWarningModal(false)}
      />
    </>
  )
})

export default AdminPage
