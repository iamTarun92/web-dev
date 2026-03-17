# User roles and permission

## Admin

- All routes can be accessed.
- Admin can perform CRUD operations on Permissions.
- CRUD on Users with their roles(sub_admin, editor, user) and permission.
- Admin can add/delete/update the permission to all sections (User Permissions, Post, Categories, Comments,likes).
- CRUD on Post, Categories, Comments, Likes.

## Sub Admin

- Sub Admin can access all routes but not Admin routes.
- Sub-Admin can add/delete/update the permission to all sections if he has permission from the Admin User. (User Permissions, Post, Categories, Comments, likes).
- CRUD on Users with their roles(editor, user) and permission but not to self.
- CRUD on Post, Categories, Comments, and Likes, if he has permission from the Admin User.

## Editor

- The editor can access all routes but not the Admin & Sub Admin routes.
- The editor can perform CRUD on Post, Categories, Comments, and Likes if he has permission from the Admin or Sub Admin User.

## User

- Users can register & log in.
- Users can see the Post.
- Comments and Likes are default enabled for normal user, but the admin and Sub-admin can block their comments and like features.

# Steps to run

- npm i express mongoose bcrypt jsonwebtoken express-validator nodemon dotenv
- Create all models
- Create auth routes
- login with jwt token
- Create add permission API for admin
- User profile API
- Auth middleware
