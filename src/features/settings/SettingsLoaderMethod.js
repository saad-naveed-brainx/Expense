export const settingsLoaderMethod = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/get-profile', {
            credentials: 'include'
        })
        console.log('response', response)
        if (!response.ok) {
            throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        return { profile: data }
    }
    catch (err) {
        console.log('error', err)
    }
}