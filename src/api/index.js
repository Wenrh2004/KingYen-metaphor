import fetch from '@/utils/axios'

// 用户ID
export const signIpApi = () => fetch.post('/sign');
// Inser
// wall
export const insertWallApi = data => fetch.post('/insertwall',data);
// Select
// wall
export const selectWallPageApi = data => fetch.post('/selectwall',data);