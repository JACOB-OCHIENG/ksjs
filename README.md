# 🏫 School Management System

A comprehensive school management system with role-based access control for administrators, teachers, students, and parents.

## 🚀 **Quick Start**

### **1. Start the Server**
```bash
# Windows
start-server.bat

# Linux/Mac
chmod +x start-server.sh
./start-server.sh

# Manual start
php -S localhost:8000
```

### **2. Open in Browser**
- **Main Website:** http://localhost:8000
- **Login Page:** http://localhost:8000/login.html
- **Test Connection:** http://localhost:8000/test-connection.html

### **3. Login with Demo Credentials**
- **Admin:** username: `admin`, password: `admin123`
- **Teacher:** username: `teacher1`, password: `teacher123`
- **Student:** username: `student1`, password: `student123`
- **Parent:** username: `parent1`, password: `parent123`

---

## 📁 **Project Structure**

```
school_website/
├── index.html              # Main website
├── login.html              # Authentication page
├── admin-portal.html       # Admin dashboard
├── teacher-portal.html     # Teacher dashboard
├── student-portal.html     # Student dashboard
├── parent-portal.html      # Parent dashboard
├── api/                    # Backend APIs
│   ├── auth.php           # Authentication API
│   ├── admin-api.php      # Admin operations
│   ├── teacher-api.php    # Teacher operations
│   ├── student-api.php    # Student operations
│   ├── parent-api.php     # Parent operations
│   └── test.php           # Test endpoint
├── js/                     # JavaScript files
│   └── auth-service.js    # Authentication service
├── css/                    # Stylesheets
├── database/               # Database files
├── images/                 # Images and assets
├── start-server.bat       # Windows startup script
├── start-server.sh        # Linux/Mac startup script
└── test-connection.html   # Connection test page
```

---

## 🔐 **Authentication System**

### **Features:**
- ✅ **JWT-based authentication** - Secure token management
- ✅ **Role-based access control** - Admin, Teacher, Student, Parent roles
- ✅ **Single login system** - One login for all portals
- ✅ **Automatic redirects** - Users redirected to appropriate portal
- ✅ **Session management** - Automatic token refresh and cleanup

### **Security:**
- **Password hashing** - Bcrypt encryption
- **Token expiration** - 24-hour token lifetime
- **CORS protection** - Cross-origin request handling
- **Permission checks** - Granular access control

---

## 🏢 **Portals Overview**

### **Admin Portal** (`admin-portal.html`)
- **User Management** - Add, edit, delete users
- **Student Management** - Complete student records
- **Teacher Management** - Teacher assignments and schedules
- **Fee Management** - Payment tracking and receipts
- **Reports & Analytics** - Comprehensive reporting
- **System Settings** - Configuration and settings

### **Teacher Portal** (`teacher-portal.html`)
- **Class Management** - Assigned classes and students
- **Attendance Tracking** - Mark and view attendance
- **Assignment Management** - Create and grade assignments
- **Results Entry** - Enter and manage grades
- **Communication** - Send messages to parents/students

### **Student Portal** (`student-portal.html`)
- **Personal Dashboard** - Academic overview
- **Timetable** - Class schedule and subjects
- **Results** - View grades and performance
- **Assignments** - Submit and track assignments
- **Attendance** - Personal attendance records

### **Parent Portal** (`parent-portal.html`)
- **Multi-child Support** - Manage multiple children
- **Academic Monitoring** - Track child's performance
- **Fee Management** - View and pay fees
- **Communication** - Contact teachers
- **Attendance Tracking** - Monitor child's attendance

---

## 🛠️ **Technical Stack**

### **Frontend:**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript ES6+** - Modern JavaScript features
- **SweetAlert2** - Beautiful alerts and modals
- **Chart.js** - Data visualization
- **AOS** - Scroll animations

### **Backend:**
- **PHP 7.4+** - Server-side scripting
- **MySQL/MariaDB** - Database management
- **JWT** - JSON Web Token authentication
- **PDO** - Database abstraction layer
- **RESTful APIs** - Clean API design

### **Security:**
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt encryption
- **CORS Protection** - Cross-origin security
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Prepared statements

---

## 🔧 **Troubleshooting**

### **"Failed to Fetch" Error:**
1. **Start web server:** `php -S localhost:8000`
2. **Check browser console** for specific errors
3. **Test API:** Visit `http://localhost:8000/test-connection.html`
4. **Verify files** are in correct locations

### **Database Issues:**
1. **Start MySQL/MariaDB**
2. **Create database:** `CREATE DATABASE school_management;`
3. **Update config:** Edit `database/config.php`
4. **Import schema:** Run SQL files in `database/` folder

### **Common Solutions:**
- **Restart server** - Stop and start again
- **Clear browser cache** - Hard refresh (Ctrl+Shift+R)
- **Check file permissions** - Ensure files are readable
- **Try different browser** - Test with Chrome, Firefox, Edge

---

## 📱 **Browser Support**

### **Supported Browsers:**
- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+

### **Mobile Support:**
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Touch-friendly** - Optimized for mobile devices
- ✅ **Progressive Web App** - Can be installed on mobile

---

## 🚀 **Deployment**

### **Local Development:**
```bash
# Start server
php -S localhost:8000

# Access application
http://localhost:8000
```

### **Production Deployment:**
1. **Web Server** - Apache/Nginx with PHP
2. **Database** - MySQL/MariaDB
3. **SSL Certificate** - HTTPS encryption
4. **Domain** - Point domain to server
5. **Backup** - Regular database backups

---

## 📊 **Features Matrix**

| Feature | Admin | Teacher | Student | Parent |
|---------|-------|---------|---------|--------|
| **User Management** | ✅ | ❌ | ❌ | ❌ |
| **Student Records** | ✅ | ✅ | ✅ (Own) | ✅ (Children) |
| **Attendance** | ✅ | ✅ | ✅ (Own) | ✅ (Children) |
| **Results/Grades** | ✅ | ✅ | ✅ (Own) | ✅ (Children) |
| **Fee Management** | ✅ | ❌ | ✅ (Own) | ✅ (Children) |
| **Reports** | ✅ | ✅ | ❌ | ✅ |
| **Communication** | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 **Getting Started**

### **For Developers:**
1. **Clone repository**
2. **Start server:** `php -S localhost:8000`
3. **Open browser:** `http://localhost:8000`
4. **Test login** with demo credentials
5. **Explore portals** and features

### **For Users:**
1. **Open browser** and go to `http://localhost:8000`
2. **Click "Portal Login"**
3. **Select your role** (Admin, Teacher, Student, Parent)
4. **Enter credentials** (use demo credentials for testing)
5. **Access your portal** and explore features

---

## 📞 **Support**

### **If You Need Help:**
1. **Check troubleshooting guide** - `TROUBLESHOOTING-GUIDE.md`
2. **Test connection** - `http://localhost:8000/test-connection.html`
3. **Check browser console** - Press F12 for developer tools
4. **Verify server is running** - Should see website at localhost:8000

### **Common Issues:**
- **Server not running** - Start with `php -S localhost:8000`
- **Database not configured** - Check `database/config.php`
- **Files not found** - Verify file paths and permissions
- **CORS errors** - Use same origin (localhost:8000)

---

## ✅ **Success Checklist**

### **When Everything Works:**
- [ ] Website loads at `http://localhost:8000`
- [ ] Login page accessible at `http://localhost:8000/login.html`
- [ ] Can login with demo credentials
- [ ] Redirects to appropriate portal after login
- [ ] All portal features work correctly
- [ ] No errors in browser console

**🎉 Congratulations! Your school management system is ready to use!**