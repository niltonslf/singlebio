'use client'

import {Info} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useCallback, useEffect, useState} from 'react'

import {
  AdminBaseLayout,
  PagePreview,
  BetaVersionWarningModal,
  PageLoader,
  Collapse,
  FeaturesDragAndDrop,
  FeatureActiveItem,
  FeatureList,
} from '@/app/admin/components'
import {featureOptions, featureOptionsObject} from '@/app/admin/constants'
import {adminStore} from '@/app/admin/context/admin-store'

const AdminPage = observer(() => {
  const {user, socialPages, pageLinks, features} = adminStore

  const [showBetaWarningModal, setShowBetaWarningModal] = useState(false)

  const [availableFeatures, setAvailableFeatures] = useState(featureOptions)

  const handleActiveFeature = async (featId: string) => {
    setAvailableFeatures(prev => prev.filter(({id}) => id !== featId))

    const lastItem = features[features.length - 1]
    const lastPos = features.length ? Number(lastItem.order) + 1 : 0

    const currentFeat = featureOptionsObject[featId]

    await adminStore.insertFeature({
      order: lastPos,
      id: currentFeat.id,
      value: '',
    })
    await adminStore.reloadFeatures()
  }

  const handleDisableFeature = async (featId: string) => {
    await adminStore.deleteFeature(featId)
    await adminStore.reloadFeatures()

    const feature = featureOptionsObject[featId]
    setAvailableFeatures(prev => [...prev, feature])
  }

  const handleCheckInitialFeatures = useCallback(() => {
    setAvailableFeatures(prev =>
      prev.filter(feat => !features.find(({id}) => id === feat.id)),
    )
  }, [features])

  useEffect(() => {
    handleCheckInitialFeatures()
  }, [handleCheckInitialFeatures])

  if (!user) return <PageLoader />

  return (
    <>
      <AdminBaseLayout>
        <AdminBaseLayout.Content>
          <h1 className='mb-8 text-2xl font-semibold'>Sections</h1>

          {features.length === 0 ? (
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
              <FeaturesDragAndDrop items={features}>
                {features.map((feature, key) => (
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
                  key={feature.id}
                  Icon={feature.Icon}
                  iconClass={feature.iconClass}
                  onClick={() => handleActiveFeature(feature.id)}>
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
