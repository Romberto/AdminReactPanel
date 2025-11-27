# Admin Panel (React + TypeScript + Vite)

This repository is a generated skeleton for an admin panel managing house projects.
It includes:
- React + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query (API layer)
- react-hook-form + Zod
- Axios (you can switch to fetch)
- Protected routes and Telegram login widget scaffold

## How to use

1. Copy `.env.example` to `.env` and update `VITE_API_URL` if needed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Build:
   ```bash
   npm run build
   ```

## Notes

- This skeleton is a starting point. You will need to wire in the exact Telegram widget settings
  (bot name, callback domain) and adjust some UI/UX choices.
- Backend endpoints expected (as provided by you):
  - `POST /login/password`
  - `POST /auth/telegram`
  - `GET /` (list projects)
  - `GET /{slug}` (project detail)
  - `POST /projects`
  - `PUT /projects/{project_id}`
  - `DELETE /projects/{project_id}`
  - `POST /projects/{project_id}/images` (multipart)
  - `DELETE /projects/{project_id}/images/{image_id}`
  - `POST /projects/{project_id}/images/reorder`
