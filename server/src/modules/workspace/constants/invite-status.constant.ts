export enum InviteStatus {
  PENDING = "PENDING", // Đang chờ phản hồi
  ACCEPTED = "ACCEPTED", // Người được mời chấp nhận
  DECLINED = "DECLINED", // Người được mời từ chối
  CANCELLED = "CANCELLED", // Người gửi/admin hủy lời mời
  EXPIRED = "EXPIRED", // Hết hạn (auto system update)
}
