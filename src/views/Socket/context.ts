/*
 * @FilePath: \SocketTRTC\context.js
 * @Author: maggot-code
 * @Date: 2023-03-21 12:49:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2023-03-21 17:29:18
 * @Description:
 */
// 主动发起房间：将接入的小程序或移动端用户分配到该房间，该房间内的用户可以主动发起通话
export const ROOM_ACTIVE = 'active_room';

// 被动接收房间：将接入的Web端用户分配到该房间，该房间内的用户可以被动接收通话
export const ROOM_PASSIVE = 'passive_room';

// 忙碌中房间：将已经在通话中的用户从被动接收房间移动到该房间，该房间内的用户会与被动接收房间的用户合并到一起，不过会在该房间用户身上增加标记
export const ROOM_BUSY = 'busy_room';

// 合并了被动接收房间和忙碌中房间的用户列表
export const EMIT_UPDATE_USER_LIST = 'update_user_list';

// 通话邀请
export const EMIT_INVITE = 'invite';

// 通话邀请同意
export const EMIT_INVITE_ACCEPT = 'invite_accept';

// 通话邀请拒绝 *
export const EMIT_INVITE_REJECT = 'invite_reject';

// 通信建立
export const EMIT_SIGNAL_START = 'signal_start';

// 通信结束 *
export const EMIT_SIGNAL_END = 'signal_end';

// 视频流推送
export const VIDEO_STREAM = 'video_stream';
