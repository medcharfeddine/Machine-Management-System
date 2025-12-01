# How to View and Edit Repairs

## Overview

Your Repair Management System now includes a complete repair management interface that allows you to:
- ✅ View all repairs for a machine
- ✅ Edit existing repair notes
- ✅ Delete repairs
- ✅ Add new repair notes

---

## 🔧 Using the Repairs Feature

### Step 1: Access the Machine History
1. Log in to the application at **http://localhost:3000**
2. You'll see the **Dashboard** with the machine history table on the right side
3. Look for the machine you want to view repairs for

### Step 2: View All Repairs for a Machine
1. In the machine row, click the **"Repairs (X)"** button (purple button)
   - Shows the number of repairs already recorded
   - Example: "Repairs (3)" means 3 repairs have been added

2. A modal window will open showing:
   - **Machine Serial Number** (e.g., "MACH-001")
   - **List of all repairs** with dates and descriptions
   - **Edit/Delete buttons** for each repair

### Step 3: Edit a Repair
1. In the repairs list, click the **"Edit"** button (blue) next to the repair you want to modify
2. The repair text will turn into an editable text area
3. Update the repair description
4. Click **"Save"** to save changes or **"Cancel"** to discard changes

### Step 4: Delete a Repair
1. In the repairs list, click the **"Delete"** button (red) next to the repair
2. A confirmation dialog will appear asking "Are you sure you want to delete this repair?"
3. Click **"OK"** to confirm deletion
4. The repair will be permanently removed from the machine record

### Step 5: Add a New Repair
1. From the machine history table, click the **"Add"** button (blue) in the Actions column
2. A modal will appear with a text area
3. Type your repair description:
   - Example: "Replaced damaged motor bearings and lubricated all moving parts"
   - Be as detailed as needed
4. Click **"Add Repair"** to save
5. The repair will be added with the current date and time automatically

---

## 📊 Understanding the Repairs Display

### In the History Table
```
Machine SN | Client  | Type  | Tech    | Status | Entry Date | Actions
MACH-001   | ABC Co  | CNC   | Ahmed   | In     | 12/1/2024  | Exit | Repairs (3) | Add
```

The **Repairs (3)** button shows:
- How many repairs have been recorded for this machine
- Click to view, edit, or delete them

### In the Repairs Modal

Each repair shows:
```
Date/Time: 12/1/2024 at 2:30 PM
[Edit] [Delete]
Replaced damaged motor bearings and lubricated all moving parts
```

---

## 🎯 Common Tasks

### Task 1: Review Repairs Before Completing a Job
1. Click "Repairs (X)" for the machine
2. Review all repair work done
3. If something is missing, click "Edit" to update
4. Close the modal and click "Exit" to mark the machine as complete

### Task 2: Correct a Repair Note
1. Click "Repairs (X)" for the machine
2. Find the repair you need to fix
3. Click "Edit"
4. Update the text
5. Click "Save"

### Task 3: Remove Accidental Entry
1. Click "Repairs (X)" for the machine
2. Find the wrong repair
3. Click "Delete"
4. Confirm the deletion

### Task 4: Document Multiple Repairs on Same Machine
1. Click "Add" button
2. Add first repair: "Cleaned cooling system"
3. Click "Repairs (X)" and verify it was added
4. Click "Add" again
5. Add second repair: "Replaced worn brake pads"
6. Continue as needed - each repair is timestamped

---

## 🔍 Tips & Best Practices

### ✅ Best Practices
- **Be detailed** - Include specific parts replaced or procedures performed
- **Use timestamps** - The system automatically records when repairs were added
- **Review before exit** - Always view repairs before marking a machine as "Out"
- **One repair per action** - Don't combine multiple repairs into one note

### Example Good Repair Notes
```
❌ Bad: "Fixed it"
✅ Good: "Replaced damaged power supply unit and tested all circuits"

❌ Bad: "Maintenance"
✅ Good: "Cleaned air filters, replaced thermal paste on CPU, and ran diagnostics"

❌ Bad: "Repaired"
✅ Good: "Soldered loose connection on main PCB board and recalibrated sensors"
```

---

## 🛠️ Troubleshooting

### Issue: "Repairs (0)" button doesn't appear
- **Cause**: New machine with no repairs yet
- **Solution**: Click the "Add" button to add the first repair

### Issue: Can't edit a repair
- **Solution**: 
  1. Make sure you're viewing the repairs modal
  2. Click the "Edit" button for that specific repair
  3. Edit in the text area that appears
  4. Click "Save" to confirm

### Issue: Changes not saving
- **Solution**:
  1. Check if there's an error message
  2. Make sure your text is not empty
  3. Hard refresh the page (Ctrl+Shift+R)
  4. Try again

### Issue: Repair deleted by mistake
- **Solution**: 
  - Repairs cannot be recovered once deleted
  - Add a new repair with the information
  - Consider adding a note like "CORRECTED:" in the text

---

## 📋 Repair Fields & Data

### What Gets Stored
- **Date/Time**: Automatically recorded when repair is added or edited
- **Description**: Your detailed repair note (text only)
- **Technician**: Currently not tracked per repair (stored at machine level)

### Examples of What to Record
```
✅ "Replaced timing belt (OEM part #TB-2401)"
✅ "Performed preventive maintenance: oil change and filter replacement"
✅ "Diagnosed and fixed overheating issue - cleaned heatsinks"
✅ "Replaced faulty capacitor on motherboard - tested and verified"
✅ "Installed updated firmware version 3.2.1"
```

---

## 🔐 Data Retention

- All repairs are permanently stored in MongoDB
- Deleted repairs cannot be recovered
- Repair history is retained even after machine is marked as "Out"
- Export functionality coming soon

---

## 📞 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Repairs Modal | Click "Repairs (X)" button |
| Edit Repair | Click "Edit" button |
| Save Edit | Click "Save" button |
| Cancel Edit | Click "Cancel" button |
| Delete Repair | Click "Delete" button |
| Close Modal | Click "Close" or "✕" button |

---

## 🎓 Video Tutorial (Text Guide)

### View Repairs - Step by Step
1. **Navigate to Dashboard** → Machine history table visible
2. **Find Machine Row** → Look for the machine with repairs
3. **Click "Repairs (X)"** → Purple button in Actions column
4. **View All Repairs** → Modal shows list with dates and descriptions
5. **Close Modal** → Click "Close" button at bottom

### Edit a Repair - Step by Step
1. **Open Repairs Modal** → Click "Repairs (X)" button
2. **Click Edit Button** → Blue button next to repair
3. **Update Text** → Modify repair description in text area
4. **Click Save** → Confirm changes
5. **Verify Changes** → Text should update in the list

### Delete a Repair - Step by Step
1. **Open Repairs Modal** → Click "Repairs (X)" button
2. **Click Delete Button** → Red button next to repair
3. **Confirm Deletion** → Click "OK" in confirmation dialog
4. **Verify Deletion** → Repair removed from list
5. **Close Modal** → Click "Close" when done

---

## 📊 API Endpoints (For Developers)

### Add Repair
```
POST /api/machines/[machineId]/repair
Body: { note: "string", tech: "string" }
Response: 201 Created
```

### View Repairs
```
GET /api/machines
Response: 200 OK (includes repairs array for each machine)
```

### Edit Repair
```
PUT /api/machines/[machineId]/repair/[repairId]
Body: { note: "string" }
Response: 200 OK
```

### Delete Repair
```
DELETE /api/machines/[machineId]/repair/[repairId]
Response: 200 OK
```

---

## 🎉 You're All Set!

You now have a complete repair management system where you can:
- ✅ Track multiple repairs per machine
- ✅ Edit repairs if mistakes are made
- ✅ Delete incorrect entries
- ✅ View full repair history with timestamps
- ✅ Maintain detailed service records

**Start using it now!** Go to http://localhost:3000 and click on "Repairs (X)" to see this feature in action.

---

*For more help, see README_PROJECT.md for complete documentation*
