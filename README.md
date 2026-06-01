# UnityHub — HCI Project (HTML/CSS/JS)

Plain HTML prototype with **localStorage** persistence — no backend required.

## Quick start

1. Open **`landing.html`** in your browser (or use a local server).
2. **Sign up** or log in with demo credentials:
   - Email: `maria@student.ph`
   - Password: `password123`
3. Explore the dashboard, events, resources, profile, and settings.

## Pages

| Page | File |
|------|------|
| Landing | `landing.html` |
| Log in | `login.html` |
| Sign up | `signup.html` |
| Dashboard | `index.html` |
| Events | `events.html` |
| Event detail | `event-detail.html` |
| Resources | `resources.html` |
| Resource detail | `resource-detail.html` |
| Organization | `organization.html` |
| Notifications | `notifications.html` |
| Profile | `profile.html` |
| Settings | `settings.html` |

## Data layer

All state is stored in `localStorage` via `js/storage.js`:

- `uh_user` — current session
- `uh_accounts` — registered accounts
- `uh_registrations` — event IDs
- `uh_borrows` — borrow requests
- `uh_saved` — bookmarked resources
- `uh_notifications` — notification list
- `uh_settings` — notification toggles

## React prototype

A separate high-fidelity React version lives in [`unityhub-app/`](unityhub-app/).
