import Image from 'next/image'
import Link from 'next/link'

import {merge} from '@/utils'

type BetaVersionWarningModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const BetaVersionWarningModal = ({
  isOpen,
  onClose,
}: BetaVersionWarningModalProps) => {
  return (
    <dialog className={merge(['modal', isOpen && 'modal-open'])}>
      <div className='modal-box w-11/12 md:w-8/12'>
        <h3 className='text-lg font-bold'>Message from the developer</h3>
        <div className='flex flex-col gap-5 py-4 md:flex-row'>
          <Image
            src='/me.png'
            alt='The developer'
            width={250}
            height={250}
            className='h-full w-full object-cover'
          />
          <div className='prose'>
            <p>
              Hey there! Welcome to the app—super excited to have you on board!
              🎉🎉
            </p>

            <h3>Beta version</h3>

            <p>
              Just a heads up before you dive in: our app is still in the beta
              phase, which basically means we're cooking up some awesome stuff
              in the background. The current version is like a sneak peek of the
              cool things to come. Keep in mind that you might spot a few
              hiccups, things might shuffle around, and bugs might appear here
              and there, but hey, new features might pop up unexpectedly too!
            </p>

            <p>
              Even though we're in beta, the main features are good to go. Your
              data, pages, and customizations are safe and sound. And guess
              what? If you ever run into trouble, I'm here for you. Shoot me a
              message anytime for help with issues, questions, or just to chat.
              And hey, if the app isn't suiting you anymore, you can delete your
              account, and poof—all your data is gone. Nothing will be kept in
              the servers. Your call, always.
            </p>

            <h3>About the future</h3>

            <p>
              I'm hustling to bring you even more awesome features ASAP. Got
              cool ideas? Swing by the{' '}
              <Link
                href='/admin/help'
                className='link link-primary'
                title='Help Page'>
                help page
              </Link>{' '}
              and shoot me an email with your suggestions. I'd love to hear them
              and check if we can make it happen.
            </p>

            <p>
              So, have a blast using the app! Create your page, toss in your
              links, jazz it up the way you like, and most importantly, share it
              with everyone—it's free! If anything changes down the road, I'll
              swing by and give you the deets first, deal?
            </p>

            <p>
              That's the lowdown. If you're cool with all that jazz, hit that
              button down below and let the sharing begin! 🚀
            </p>
          </div>
        </div>
        <div className='modal-action'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => onClose()}>
            I'm aware
          </button>
        </div>
      </div>
    </dialog>
  )
}
