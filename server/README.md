# TaskRhythm Server

## Tổng quan dự án

TaskRhythm là một hệ thống quản lý công việc (task management) được xây dựng bằng NestJS, sử dụng TypeORM và PostgreSQL. Dự án áp dụng kiến trúc module hóa, hỗ trợ quản lý không gian làm việc (workspace), người dùng, vai trò, và các tác vụ với khả năng phân cấp và phụ thuộc.

## Cấu trúc dự án

Dự án được tổ chức theo cấu trúc module của NestJS, với các thư mục chính:

- `src/common/`: Các tiện ích chung như decorator, middleware, utils.
- `src/config/`: Cấu hình ứng dụng, database, JWT.
- `src/modules/`: Các module nghiệp vụ chính.
- `src/shared/`: Các tài nguyên chia sẻ.

### Các module chính

- **Auth**: Xử lý xác thực người dùng.
- **User**: Quản lý thông tin người dùng và vai trò.
- **Workspace**: Quản lý không gian làm việc và thành viên.
- **Task**: Quản lý tác vụ và phụ thuộc.
- **Template**: Module mẫu (chưa triển khai).

## Phân tích Entity và mối quan hệ

### User (Người dùng)

- **Mô tả**: Đại diện cho người dùng trong hệ thống.
- **Liên kết**:
  - OneToOne với Auth (tài khoản xác thực).
  - ManyToOne với Role (vai trò hệ thống).
  - OneToMany với WorkspaceMember (thành viên workspace).
  - OneToMany với WorkspaceInvite (lời mời gửi/nhận).
- **Khả năng**: Hỗ trợ đa vai trò, quản lý hồ sơ cá nhân.
- **Giới hạn**: Email duy nhất, giới tính enum (MALE, FEMALE, OTHER).

### Auth (Xác thực)

- **Mô tả**: Lưu trữ thông tin đăng nhập và token.
- **Liên kết**: OneToOne với User.
- **Khả năng**: Quản lý refresh token, trạng thái kích hoạt.
- **Giới hạn**: Email duy nhất, liên kết chặt chẽ với User.

### Role (Vai trò)

- **Mô tả**: Định nghĩa vai trò hệ thống (ADMIN, USER, SUPPORT).
- **Liên kết**: OneToMany với User.
- **Khả năng**: Phân quyền cơ bản.
- **Giới hạn**: Tên vai trò duy nhất.

### Workspace (Không gian làm việc)

- **Mô tả**: Đơn vị tổ chức chính cho tác vụ và thành viên.
- **Liên kết**:
  - OneToMany với WorkspaceMember.
  - OneToMany với WorkspaceInvite.
  - OneToMany với Task.
- **Khả năng**: Hỗ trợ nhiều loại workspace (Personal, Team), cài đặt tùy chỉnh, mã mời.
- **Giới hạn**: Tên duy nhất cho mỗi owner, số thành viên tối đa >6, trạng thái (ACTIVE, INACTIVE).

### WorkspaceMember (Thành viên Workspace)

- **Mô tả**: Liên kết giữa User và Workspace với vai trò cụ thể.
- **Liên kết**: ManyToOne với Workspace và User.
- **Khả năng**: Theo dõi số tác vụ được giao/hoàn thành, quyền tùy chỉnh.
- **Giới hạn**: Duy nhất cho mỗi cặp workspace-user, vai trò enum (OWNER, ADMIN, MEMBER).

### WorkspaceInvite (Lời mời Workspace)

- **Mô tả**: Quản lý lời mời tham gia workspace.
- **Liên kết**: ManyToOne với Workspace, invitedBy (User), invitedUser (User).
- **Khả năng**: Theo dõi trạng thái lời mời (PENDING, ACCEPTED, REJECTED).
- **Giới hạn**: Liên kết với người gửi và người nhận cụ thể.

### Task (Tác vụ)

- **Mô tả**: Đại diện cho công việc cần thực hiện.
- **Liên kết**:
  - ManyToOne với Workspace.
  - Self-referencing cho sub-tasks (parent_task).
  - OneToMany với TaskDependency.
- **Khả năng**: Hỗ trợ phân cấp tác vụ (level 0-4), ưu tiên, trạng thái, tiến độ, phụ thuộc.
- **Giới hạn**: Tiêu đề duy nhất trong workspace, level 0-4, progress 0-100, các timestamp logic.

### TaskDependency (Phụ thuộc tác vụ)

- **Mô tả**: Định nghĩa mối phụ thuộc giữa các tác vụ.
- **Liên kết**: ManyToOne với Task (hai chiều: task và dependsOnTask).
- **Khả năng**: Tạo mạng lưới phụ thuộc phức tạp.
- **Giới hạn**: Liên kết chặt chẽ với Task, cascade delete.

### Giải thích quan hệ chính

- **User ↔ Auth**: 1-1, tài khoản xác thực.
- **User → Role**: N-1, vai trò hệ thống.
- **User ↔ WorkspaceMember**: 1-N, thành viên workspace.
- **Workspace ↔ WorkspaceMember**: 1-N, thành viên.
- **Workspace ↔ WorkspaceInvite**: 1-N, lời mời.
- **Workspace ↔ Task**: 1-N, tác vụ.
- **Task ↔ TaskDependency**: 1-N (hai chiều cho phụ thuộc).
- **Task ↔ Task**: Self-referencing cho sub-tasks.

## Hướng thiết kế

- **Kiến trúc module**: Tách biệt rõ ràng giữa các domain, dễ mở rộng.
- **Quản lý truy cập**: Dựa trên vai trò workspace và hệ thống.
- **Mô hình dữ liệu**: Sử dụng TypeORM với quan hệ phức tạp, constraints chặt chẽ.
- **Bảo mật**: JWT authentication, middleware logging.
- **Khả năng mở rộng**: Auto-load entities, cấu hình linh hoạt qua environment.

## Công nghệ sử dụng

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Configuration**: NestJS Config
