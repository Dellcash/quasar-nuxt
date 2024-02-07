export const useToken = () => useState('token', () => localStorage.getItem('token'))
