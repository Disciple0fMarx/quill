import { api } from '../axios';

export const logout = async () => {
    const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refreshToken='))
        ?.split('=')[1]

    await api.post('/logout', { refreshToken })

    // Clear frontend tokens
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}
