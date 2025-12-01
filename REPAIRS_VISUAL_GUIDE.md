# Repairs Feature - Visual Guide

## 🎯 Main Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  REPAIR MANAGEMENT SYSTEM  [User: Ahmed]     [Logout]           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────────────┐
│    ENTRY FORM (LEFT)     │  │   MACHINE HISTORY (RIGHT)        │
│                          │  │                                  │
│  Machine ID: [    ]      │  │  ┌──────────────────────────────┐│
│  Model: [      ]         │  │  │ SN │Client│Type│Tech│Status││
│  Technician: [dropdown]  │  │  ├──────────────────────────────┤│
│  [Enter Machine]         │  │  │M1 │ABC  │CNC │Ahmed│In   ││
│                          │  │  │                               ││
│                          │  │  │ [Exit][Repairs(2)][Add]      ││
│                          │  │  │                               ││
│                          │  │  │M2 │XYZ  │3D  │Mohamed│Out  ││
│                          │  │  │                               ││
│                          │  │  │ [Exit][Repairs(5)][Add]      ││
│                          │  │  │                               ││
│                          │  │  └──────────────────────────────┘│
└──────────────────────────┘  └──────────────────────────────────┘
```

## 🔧 Repairs Button Interactions

### Click "Repairs (2)" Button
```
Machine Row:
M1 │ ABC │ CNC │ Ahmed │ In │ 12/1 │ [Exit] [Repairs(2)] [Add]
                                          ↓
                                    Opens Modal ↓

┌──────────────────────────────────────┐
│ Repairs for MACH-001            ✕    │
├──────────────────────────────────────┤
│ 12/1/2024 at 2:30 PM                 │
│ [Edit] [Delete]                      │
│ Replaced damaged motor bearings      │
│                                      │
│ 12/1/2024 at 1:15 PM                 │
│ [Edit] [Delete]                      │
│ Cleaned cooling system               │
│                                      │
│           [Close]                    │
└──────────────────────────────────────┘
```

## ✏️ Edit Repair Flow

```
Click [Edit] button
         ↓
Text becomes editable textarea
┌────────────────────────────┐
│ [Save] [Cancel]            │
│ Replaced damaged motor     │
│ bearings ← Can edit this   │
└────────────────────────────┘
         ↓
User modifies text
         ↓
Click [Save]
         ↓
Changes persist to database
         ↓
Text returns to normal display
```

## 🗑️ Delete Repair Flow

```
Click [Delete] button
         ↓
Confirmation Dialog:
┌─────────────────────────────────┐
│ Are you sure you want to delete │
│ this repair?                    │
│                                 │
│     [OK]      [Cancel]          │
└─────────────────────────────────┘
         ↓
Click [OK]
         ↓
Repair removed from list
Repair count decreases
```

## ➕ Add Repair Flow

```
Click [Add] button
         ↓
┌─────────────────────────────────────┐
│ Add Repair Note                     │
│                                     │
│ [Textarea for repair description]   │
│ ┌─────────────────────────────────┐ │
│ │ Replaced damaged motor bearings │ │
│ │ and lubricated all moving parts │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [Cancel]    [Add Repair]           │
└─────────────────────────────────────┘
         ↓
User enters repair note
         ↓
Clicks [Add Repair]
         ↓
Repair saved with timestamp
Modal closes
Repair count updates
```

## 🎨 Button Colors & Meanings

| Button | Color | Meaning |
|--------|-------|---------|
| Exit | 🟨 Yellow | Mark machine as complete |
| Repairs(X) | 🟣 Purple | View/Edit/Delete repairs |
| Add | 🔵 Blue | Add new repair |
| Edit | 🔵 Blue | Edit repair text |
| Delete | 🔴 Red | Remove repair |
| Save | 🟢 Green | Confirm changes |
| Cancel | ⚫ Gray | Discard changes |
| Close | ⚫ Gray | Close modal |

## 📋 Repair Entry Example

### Before Adding Repairs
```
Machine: MACH-001
Status: In (🟢 green)
Repairs: 0
Button: [Repairs(0)]
```

### After Adding Repairs
```
Machine: MACH-001
Status: In (🟢 green)
Repairs: 3
Button: [Repairs(3)]

Repair 1: 12/1/2024 2:30 PM - "Cleaned cooling fan"
Repair 2: 12/1/2024 3:15 PM - "Replaced broken spring"
Repair 3: 12/1/2024 4:45 PM - "Recalibrated sensors"
```

## 🔄 Data Flow

```
User Interface (Browser)
        ↓
  Click Button
        ↓
Axios HTTP Request
        ↓
    ↙     ↘
POST      GET      PUT       DELETE
(Add)    (View)  (Update)  (Remove)
  ↓        ↓        ↓         ↓
  └────────┴────────┴─────────┘
           ↓
    Next.js API Route
           ↓
    Mongoose Model
           ↓
    MongoDB Database
           ↓
    Response to Browser
           ↓
UI Updates in Real-time
```

## 📱 Mobile Responsiveness

### Desktop (Full Width)
```
┌─────────────────────────────────────────┐
│ Entry Form │ Machine History Table      │
│ (1/3 width)│ (2/3 width)                │
└─────────────────────────────────────────┘
```

### Tablet (Adjusted)
```
┌──────────────────────┐
│ Entry Form           │
├──────────────────────┤
│ Machine History      │
│ Table                │
└──────────────────────┘
```

### Mobile (Stacked)
```
┌──────────────────┐
│ Entry Form       │
│                  │
├──────────────────┤
│ Machine History  │
│ Table            │
│ (scrollable)     │
└──────────────────┘
```

## 🎯 Quick Reference Card

```
┌──────────────────────────────────────┐
│ REPAIRS FEATURE - QUICK REFERENCE    │
├──────────────────────────────────────┤
│ View Repairs → Click [Repairs(X)]    │
│ Add Repair   → Click [Add]           │
│ Edit Repair  → Click [Edit] in modal │
│ Delete Repair→ Click [Delete]        │
│ Save Edit    → Click [Save]          │
│ Cancel Edit  → Click [Cancel]        │
│ Close Modal  → Click [Close]         │
└──────────────────────────────────────┘
```

## 📊 Status Indicators

### Repair Count Badge
```
[Repairs(0)] = No repairs yet
[Repairs(1)] = One repair recorded
[Repairs(5)] = Five repairs recorded
[Repairs(12)]= Many repairs recorded
```

### Machine Status Badge
```
[In]  = 🟢 Green  = Machine in repair
[Out] = 🔴 Red    = Machine completed/picked up
```

## 🔍 Common Patterns

### Pattern 1: Full Service Record
```
Machine: A-100
Status: In

Repairs:
1. 12/1 10:00 AM - Received and inspected
2. 12/1 11:30 AM - Identified main issue: bearing failure
3. 12/1 02:00 PM - Replaced bearing assembly
4. 12/1 03:00 PM - Testing and quality check
5. 12/1 04:00 PM - Ready for pickup
```

### Pattern 2: Multiple Technicians (Future)
```
Machine: B-200
Repairs by Ahmed:
  - Cleaned cooling system
  - Replaced air filter

Repairs by Mohamed:
  - Tested electrical circuits
  - Replaced faulty relay
```

## ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between buttons |
| Enter | Click focused button |
| Escape | Close modal |
| Ctrl+A | Select all text in textarea |
| Ctrl+C | Copy repair text |
| Ctrl+V | Paste repair text |

---

**This visual guide helps you understand the Repairs feature at a glance!**
