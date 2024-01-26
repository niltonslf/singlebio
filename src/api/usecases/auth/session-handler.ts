export const sessionLogin = async (idToken: string) => {
  try {
    const res = await fetch('/auth/set-session', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idToken}),
    })

    return await res.json()
  } catch (error) {
    return false
  }
}

export const sessionValidate = async (sessionCookie: string) => {
  try {
    const res = await fetch('http://localhost:3000/auth/validate-session', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sessionCookie}),
    })

    return await res.json()
  } catch (error) {
    throw error
  }
}
