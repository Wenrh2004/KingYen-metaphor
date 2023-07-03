import fetch from '@/utils/axios'

// 用户ID
export const signIpApi = () => fetch.post('/sign');
// Inser
// wall
export const insertWallApi = data => fetch.post('/intertwall',data);