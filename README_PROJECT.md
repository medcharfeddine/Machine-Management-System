# Repair Management System - Next.js Full Stack Application

## Project Overview

A comprehensive machine repair tracking and management system built with **Next.js 16.0.6**, **React 19.2.0**, **TypeScript**, **Tailwind CSS 4.0**, and **MongoDB**.

This application allows technicians to:
- Register and log in securely
- Record machines entering the repair shop
- Track machine status and repair history
- Add repair notes and mark machines as completed
- Filter and view repair history by technician or status

---

## Technology Stack

### Frontend
- **Next.js 16.0.6**: Full-stack React framework with API routes
- **React 19.2.0**: Component-based UI library
- **TypeScript 5.x**: Type-safe JavaScript
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Axios 1.13.2**: HTTP client for API requests

### Backend
- **Next.js API Routes**: RESTful API endpoints (`/api/*`)
- **Node.js/Express equivalent**: Handled by Next.js runtime
- **TypeScript**: Server-side type safety

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose 8.x**: ODM (Object Document Mapper) with schema validation
- **Environment Variable**: `MONGO_URI` from `.env.local`

### Authentication
- **jsonwebtoken 9.0.2**: JWT token generation and validation
- **localStorage**: Client-side token storage (in production, use httpOnly cookies)
- **JWT_SECRET**: Environment variable for token signing

---

## Project Structure

```
D:\tech\techink/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts        # POST /api/auth/login
│   │   │   └── register/route.ts     # POST /api/auth/register
│   │   └── machines/
│   │       ├── route.ts              # GET /api/machines, POST /api/machines
│   │       └── [id]/
│   │           ├── exit/route.ts     # PUT /api/machines/[id]/exit
│   │           └── repair/route.ts   # POST /api/machines/[id]/repair
│   ├── layout.tsx                    # Root layout component
│   ├── page.tsx                      # Main page with auth/dashboard logic
│   └── globals.css                   # Tailwind CSS imports
├── components/
│   ├── LoginPage.tsx                 # Authentication form
│   ├── RegisterPage.tsx              # User registration form
│   ├── EntryPage.tsx                 # Machine entry form
│   ├── HistoryPage.tsx               # Machine history table & repair modal
│   └── Dashboard.tsx                 # Main dashboard layout
├── lib/
│   ├── mongodb.ts                    # MongoDB connection utility
│   └── models/
│       ├── Technician.ts             # Mongoose schema for technicians
│       └── Machine.ts                # Mongoose schema for machines
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── next.config.ts                    # Next.js configuration
```

---

## Database Schemas

### Technician Model
```typescript
{
  _id: ObjectId
  username: string (unique)
  password: string (plain text - for demo only)
  createdAt: Date
}
```

### Machine Model
```typescript
{
  _id: ObjectId
  machineId: string (unique)
  machineModel: string
  entryDate: Date
  exitDate: Date | null
  status: "In" | "Out"
  technicianId: ObjectId (reference to Technician)
  technicianName: string
  repairs: [
    {
      date: Date
      description: string
      _id: ObjectId
    }
  ]
}
```

---

## API Endpoints

### Authentication

#### Register New Technician
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response: 201
{
  "token": "JWT_TOKEN",
  "username": "string"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response: 200
{
  "token": "JWT_TOKEN",
  "username": "string"
}
```

### Machines

#### Get All Machines (with optional filters)
```
GET /api/machines?technicianId=&status=

Response: 200
[
  {
    _id: string,
    machineId: string,
    machineModel: string,
    entryDate: Date,
    exitDate: Date | null,
    status: "In" | "Out",
    technicianName: string,
    repairs: [...]
  }
]
```

#### Create New Machine Entry
```
POST /api/machines
Content-Type: application/json

{
  "machineId": "string",
  "machineModel": "string",
  "technicianId": "string",
  "technicianName": "string"
}

Response: 201
{
  "_id": "ObjectId",
  "machineId": "string",
  ...
}
```

#### Mark Machine as Exit
```
PUT /api/machines/[id]/exit

Response: 200
{
  "status": "Out",
  "exitDate": "2024-12-01T..."
}
```

#### Add Repair Note
```
POST /api/machines/[id]/repair
Content-Type: application/json

{
  "description": "string"
}

Response: 201
{
  "repair": {
    "_id": "ObjectId",
    "date": "2024-12-01T...",
    "description": "string"
  }
}
```

---

## Component Features

### LoginPage.tsx
- Secure login form with email/password validation
- JWT token storage in localStorage
- Responsive dark theme with Tailwind CSS
- Link to register page for new users

### RegisterPage.tsx
- User registration form
- Username validation
- Password confirmation
- Automatic login after successful registration

### EntryPage.tsx
- Machine entry form with fields:
  - Machine ID
  - Machine Model
  - Technician (dropdown selection)
- Form validation
- Real-time technician list fetching

### HistoryPage.tsx
- Table view of all machines with:
  - Machine details (ID, model, technician)
  - Entry/exit dates
  - Status badge (In/Out)
  - Repair count
- Filtering by technician and status
- Exit button to mark machines as completed
- Repair modal for adding repair notes
- Real-time updates after actions

### Dashboard.tsx
- Main layout combining:
  - Entry form (left side)
  - History table (right side)
- Header with welcome message
- Logout button
- Responsive flexbox design

---

## Installation & Setup

### Prerequisites
- Node.js 18.17 or later
- MongoDB Atlas account
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
cd D:\tech\techink
npm install
```

### Step 2: Configure Environment Variables
Create `.env.local`:
```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/repair_shop
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 3: Run Development Server
```bash
npm run dev
```

Server will start at `http://localhost:3000`

### Step 4: Build for Production
```bash
npm run build
npm start
```

---

## Usage Flow

1. **First Time Users**
   - Click "Create Account" on login page
   - Register with username and password
   - System automatically logs you in

2. **Entering a Machine**
   - Fill in machine ID and model
   - Select technician from dropdown
   - Click "Enter Machine"
   - Machine appears in history table with "In" status

3. **Adding Repair Notes**
   - Click "Add Repair" button in history table
   - Enter repair description in modal
   - Click "Save Repair"
   - Repair appears in machine's repair list

4. **Marking Machine as Exit**
   - Click "Mark Exit" button for a machine
   - Machine status changes to "Out"
   - Exit date is recorded

5. **Filtering History**
   - Use technician dropdown to filter by person
   - Use status dropdown to filter by In/Out
   - Both filters can be used together

---

## Security Considerations

⚠️ **Development Notes:**
- Passwords are stored as **plain text** (for demo purposes only)
- JWT tokens stored in **localStorage** (should use httpOnly cookies in production)
- No encryption on API routes (use HTTPS in production)

✅ **Production Recommendations:**
- Use bcryptjs for password hashing
- Implement httpOnly cookies for JWT storage
- Enable HTTPS/SSL
- Add CORS restrictions
- Implement rate limiting
- Add input validation/sanitization
- Use environment-based secrets management

---

## Dependencies

### Production
```json
{
  "next": "^16.0.6",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "^5.x",
  "tailwindcss": "^4.0",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.0.2",
  "axios": "^1.13.2"
}
```

### Development
```json
{
  "@types/node": "^20.x",
  "@types/react": "^19.0.x",
  "@types/jsonwebtoken": "^9.0.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x"
}
```

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL | `http://localhost:3000/api` |

---

## Running Tests

```bash
# Type checking
npm run type-check

# Build verification
npm run build

# Development with hot reload
npm run dev
```

---

## Common Issues & Solutions

### Issue: "ENOENT: no such file or directory, open '.env.local'"
**Solution:** Create `.env.local` file with required variables

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Verify MONGO_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure MongoDB connection is active

### Issue: "JWT token error"
**Solution:**
- Verify JWT_SECRET is set in .env.local
- Clear localStorage and re-login
- Check token expiration (currently no expiry set)

### Issue: "Port 3000 already in use"
**Solution:** `npm run dev -- -p 3001` (use different port)

---

## Future Enhancements

- [ ] Add user roles (Admin, Technician, Manager)
- [ ] Implement repair cost tracking
- [ ] Add machine status history timeline
- [ ] Email notifications for completed repairs
- [ ] Export repair history to PDF
- [ ] Advanced filtering and search
- [ ] Repair SLA tracking
- [ ] Dashboard with analytics
- [ ] Mobile app (React Native)
- [ ] Real-time notifications with WebSockets

---

## Files Migration Notes

This project was migrated from:
- **Original Frontend:** React + Vite (frontend/)
- **Original Backend:** Express.js (backend/)
- **New Architecture:** Next.js Full-Stack (techink/)

All functionality has been preserved and enhanced with:
- TypeScript for type safety
- Tailwind CSS for consistent styling
- Unified API routes at `/api/*`
- Improved error handling
- Production-ready configuration

---

## Support & Contact

For issues or questions, review:
- Next.js Docs: https://nextjs.org/docs
- Mongoose Docs: https://mongoosejs.com/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs/

---

## License

This project is provided as-is for educational and demonstration purposes.

---

**Last Updated:** December 1, 2024
**Version:** 1.0.0 (Next.js Full-Stack)
