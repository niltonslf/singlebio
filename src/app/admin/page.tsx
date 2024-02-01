'use client'

import {AudioLines, Github, Info, Link2, Share2} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useCallback, useEffect, useMemo, useState} from 'react'

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
  FeaturesDragAndDrop,
  FeatureActiveItem,
} from '@/app/admin/components'
import {LinksSection} from '@/app/admin/components/links-section'
import {adminStore} from '@/app/admin/context/admin-store'
import {UserFeatures, UserFeaturesList} from '@/domain/models'
import {ActiveFeature, Feature} from '@/domain/utility'

const AdminPage = observer(() => {
  const {user, socialPages, pageLinks} = adminStore

  const featureList: Feature[] = useMemo(
    () => [
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
    ],
    [],
  )

  const [showBetaWarningModal, setShowBetaWarningModal] = useState(false)

  const [availableFeatures, setAvailableFeatures] =
    useState<Feature[]>(featureList)

  const [activeFeatures, setActiveFeatures] = useState<ActiveFeature[]>([])

  const handleActiveFeature = async (feature: Feature) => {
    const lastItem = activeFeatures[activeFeatures.length - 1]
    const lastPos = activeFeatures.length ? Number(lastItem.order) + 1 : 0

    setActiveFeatures(prev => [...prev, {...feature, order: lastPos}])

    setAvailableFeatures(prev =>
      prev.filter(item => item.title != feature.title),
    )

    // persist in the database
    const data = {
      features: {
        ...user?.features,
        [feature.id]: {
          ...user?.features?.[feature.id],
          order: lastPos,
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

  const getInitialActiveFeatures = useCallback(
    (features: UserFeatures) => {
      let active: ActiveFeature[] = []

      Object.keys(features).forEach(feature => {
        const item = featureList.find(feat => feat.id === feature)
        if (item) {
          const id = feature as UserFeaturesList
          return active.push({
            ...item,
            order: features?.[id]?.order ?? 1,
          })
        }
      })

      active = active.sort((cur, next) => cur.order - next.order)

      setActiveFeatures(active)

      const available = featureList.filter(feature => {
        if (active.findIndex(item => item.id === feature.id) < 0) return feature
      })

      setAvailableFeatures(available)
    },
    [featureList],
  )

  useEffect(() => {
    if (user?.features) {
      getInitialActiveFeatures(user.features)
    }
  }, [getInitialActiveFeatures, user])

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
              <FeaturesDragAndDrop items={activeFeatures}>
                {activeFeatures.map((feature, key) => (
                  <FeatureActiveItem
                    key={feature.id}
                    index={key + 1}
                    feature={feature}
                    onDisable={handleDisableFeature}
                    user={user}
                  />
                ))}
              </FeaturesDragAndDrop>
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
                  onClick={() => handleActiveFeature(feature)}>
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

      <BetaVersionWarningModal
        isOpen={showBetaWarningModal}
        onClose={() => setShowBetaWarningModal(false)}
      />
    </>
  )
})

export default AdminPage
