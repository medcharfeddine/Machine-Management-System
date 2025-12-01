# Quick Start Guide - Repair Management System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- Git (optional)

---

## Step 1: Setup Environment Variables (2 min)

Edit or create `D:\tech\techink\.env.local`:

```env
# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/repair_shop?retryWrites=true&w=majority

# JWT secret for token signing
JWT_SECRET=your_super_secret_key_min_8_chars

# API base URL (leave as-is for local development)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**To get MONGO_URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from "Connect" > "Drivers"
4. Replace `<password>` with your actual password

---

## Step 2: Install Dependencies (1 min)

```powershell
cd D:\tech\techink
npm install
```

---

## Step 3: Start Development Server (1 min)

```powershell
npm run dev
```

✓ Server running at **http://localhost:3000**

---

## Step 4: Access the Application (1 min)

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Click **"Create Account"**
3. Register with any username/password
4. Start entering and tracking machines!

---

## 📋 Basic Usage

### Add a Machine
1. Fill in the **Entry Form** (left side)
   - Machine ID: e.g., "MACH-001"
   - Machine Model: e.g., "CNC-500X"
   - Select Technician
2. Click **"Enter Machine"**

### View History
- Right side shows all machines
- Status badges: 🟢 In | 🔴 Out

### Add Repair Note
1. Click **"Add Repair"** button
2. Type repair description
3. Click **"Save Repair"**

### Mark as Complete
- Click **"Mark Exit"** to finish repair
- Machine status changes to "Out"

### Filter Machines
- Use **Technician** dropdown
- Use **Status** dropdown (In/Out)

---

## 🔑 Demo Credentials

After registering, use any credentials:
- Username: `tech1`
- Password: `password123`

---

## 📁 Project Structure (Key Files)

```
D:\tech\techink\
├── app\
│   ├── page.tsx           ← Main entry point
│   └── api\               ← API endpoints
├── components\            ← React components
├── lib\
│   ├── mongodb.ts         ← DB connection
│   └── models\            ← Mongoose schemas
├── .env.local             ← Your config
└── package.json           ← Dependencies
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGO_URI in `.env.local`
- Verify IP is whitelisted in MongoDB Atlas
- Check internet connection

### "Localhost refused to connect"
```powershell
# Kill process on port 3000
Get-Process node | Stop-Process
# Start server again
npm run dev
```

### "404 Not Found"
- Make sure you're on `http://localhost:3000` (not `localhost:3000`)
- Hard refresh: Ctrl+Shift+R

### Missing npm packages
```powershell
npm install
npm run build
npm run dev
```

---

## 🚀 Next Steps

### For Development
```powershell
# Type checking
npm run type-check

# Build optimization
npm run build

# Production start
npm start
```

### For Deployment
- Deploy to [Vercel](https://vercel.com) (recommended)
- Configure environment variables in Vercel dashboard
- Push to GitHub and connect repo

---

## 💡 Tips

**Useful Commands:**
```powershell
# View real-time logs
npm run dev

# Check for TypeScript errors
npm run type-check

# Production build
npm run build && npm start

# Clean cache
rm -r .next node_modules
npm install
```

**Keyboard Shortcuts:**
- `Ctrl+Shift+R` - Hard refresh
- `F12` - Open DevTools
- `Ctrl+J` - View console

---

## 📚 API Endpoints (for testing)

### Create Account
```bash
POST http://localhost:3000/api/auth/register
{
  "username": "tech1",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:3000/api/auth/login
{
  "username": "tech1",
  "password": "password123"
}
```

### Get All Machines
```bash
GET http://localhost:3000/api/machines
```

### Add Machine
```bash
POST http://localhost:3000/api/machines
{
  "machineId": "MACH-001",
  "machineModel": "CNC-500X",
  "technicianId": "user_id",
  "technicianName": "John Doe"
}
```

---

## ✅ Verification Checklist

- [ ] `.env.local` file exists and is configured
- [ ] `npm install` completed without errors
- [ ] Development server runs: `npm run dev`
- [ ] Application loads at `http://localhost:3000`
- [ ] Can create account
- [ ] Can enter machines
- [ ] Can view history
- [ ] Can add repair notes
- [ ] Can mark machines as exit

---

## 📞 Support

**Check these files for more info:**
- `README_PROJECT.md` - Full documentation
- `package.json` - Dependencies list
- `.env.local` - Configuration

**External Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**You're all set! 🎉 Start the app with `npm run dev` and navigate to http://localhost:3000**
