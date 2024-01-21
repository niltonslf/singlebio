'use client'

export const createPopup = (url: string) => {
  return new Promise((resolve, reject) => {
    if (!window?.top) return reject('Error to create popup')

    const width = 400
    const height = 500

    const y = window.top.outerHeight / 2 + window.top.screenY - height / 2
    const x = window.top.outerWidth / 2 + window.top.screenX - width / 2

    const popup = open(
      url,
      '_blank',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${y}, left=${x}`,
    )

    popup?.addEventListener('beforeunload', () => {
      return resolve(true)
    })
  })
}
