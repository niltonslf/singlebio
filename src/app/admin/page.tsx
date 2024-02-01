'use client'

import {
  AudioLines,
  ChevronsUpDown,
  Github,
  Info,
  Link2,
  LucideIcon,
  Minus,
  Share2,
} from 'lucide-react'
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
  SpotifySection,
} from '@/app/admin/components'
import {CollapseBody} from '@/app/admin/components/collapse/collapse-body'
import {LinksSection} from '@/app/admin/components/links-section'
import {adminStore} from '@/app/admin/context/admin-store'
import {SetUsernameModal} from '@/app/components'
import {User, UserFeatures, UserFeaturesList} from '@/domain/models'
import {merge} from '@/utils'

type Feature = {
  id: UserFeaturesList
  title: string
  Icon: LucideIcon
  iconClass?: HTMLAttributes<HTMLElement>['className']
  Component: ComponentType<{user: User}>
}

const AdminPage = observer(() => {
  const {user, socialPages, pageLinks} = adminStore

  const featureList: Feature[] = [
    {
      id: 'pageLinks',
      title: 'Links',
      Icon: Link2,
      iconClass: 'bg-blue-600',
      Component: LinksSection,
    },
    {
      id: 'socialPages',
      title: 'Social',
      Icon: Share2,
      iconClass: 'bg-pink-600',
      Component: SocialPagesSection,
    },
    {
      id: 'github',
      title: 'Github',
      Icon: Github,
      Component: GithubSection,
    },
    {
      id: 'spotify',
      title: 'Spotify',
      Icon: AudioLines,
      iconClass: 'bg-green-600',
      Component: SpotifySection,
    },
  ]

  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showBetaWarningModal, setShowBetaWarningModal] = useState(false)

  const [availableFeatures, setAvailableFeatures] =
    useState<Feature[]>(featureList)

  const [activeFeatures, setActiveFeatures] = useState<Feature[]>([])

  const handleEnableFeature = async (feature: Feature) => {
    setActiveFeatures(prev => [...prev, feature])

    setAvailableFeatures(prev =>
      prev.filter(item => item.title != feature.title),
    )

    // persist in the database
    const data = {
      features: {
        ...user?.features,
        [feature.id]: {
          ...user?.features?.[feature.id],
          order: 0, //TODO: make the last one
        },
      },
    }
    await adminStore.updateUser(data)
  }

  const handleDisableFeature = async (feature: Feature) => {
    setActiveFeatures(prev => prev.filter(item => item.title != feature.title))
    setAvailableFeatures(prev => [...prev, feature])

    // persist in the database
    if (!user?.features) return

    const newFeatures: UserFeatures = {}
    for (const key in user.features) {
      if (key != feature.id) {
        const feat = key as UserFeaturesList
        newFeatures[feat] = user.features?.[feat]
      }
    }

    const data = {features: newFeatures}
    await adminStore.updateUser(data)
  }

  const onSubmitUsername = async (username: string) => {
    await adminStore.updateUser({username})
    setShowUsernameModal(false)
    setShowBetaWarningModal(true)
  }

  const getInitialActiveFeatures = (features: UserFeatures) => {
    const active: Feature[] = []
    Object.keys(features).forEach(feature => {
      const item = featureList.find(feat => feat.id === feature)
      if (item) return active.push(item)
    })

    setActiveFeatures(active)

    const available = featureList.filter(feature => {
      if (active.findIndex(item => item.id === feature.id) < 0) return feature
    })

    setAvailableFeatures(available)
  }

  useEffect(() => {
    if (user?.features) {
      getInitialActiveFeatures(user.features)
    }
  }, [user])

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

          {activeFeatures.length === 0 ? (
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
            <Collapse>
              {activeFeatures.map((feature, key) => (
                <Collapse.Item index={key + 1} key={feature.title}>
                  <Collapse.Header>
                    <div className='flex w-full items-center gap-3'>
                      <div
                        className={merge(['rounded-md p-2 hover:bg-base-200'])}>
                        <ChevronsUpDown size={18} />
                      </div>

                      <div
                        className={merge([
                          'rounded-md bg-gray-600 p-2',
                          feature.iconClass,
                        ])}>
                        <feature.Icon size={15} />
                      </div>

                      {feature.title}
                      <div
                        onClick={() => handleDisableFeature(feature)}
                        className={merge([
                          'ml-auto rounded-md p-2 hover:bg-base-200',
                        ])}>
                        <Minus size={18} />
                      </div>
                    </div>
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
