import fetch from '@/utils/axios'

// 用户ID
export const signIpApi = () => fetch.post('/sign');
// Inser
// wall
export const insertWallApi = data => fetch.post('/insertwall',data);
// feedback
export const insertFeedbackApi = data => fetch.post('/insertfeedback',data);
// comment
export const insertCommentApi = data => fetch.post('/insertcomment',data);
// Select
// wall
export const selectWallPageApi = data => fetch.post('/selectwallpage',data);
// comment
export const selectCommentApi = data => fetch.post('/selectcomment',data);