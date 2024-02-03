import {GoogleAnalytics} from '@next/third-parties/google'

export const ScriptsLoader = ({gaCode}: {gaCode?: string}) => {
  return <>{gaCode && <GoogleAnalytics gaId={gaCode} />}</>
}
