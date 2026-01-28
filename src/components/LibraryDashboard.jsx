import React, { useState, useEffect } from 'react';
import { Book, Users, TrendingUp, AlertCircle, Plus, Search, X, Edit2, Trash2, Calendar, Phone, Mail, MapPin, CheckCircle, Clock, DollarSign, BarChart3, Bell, Download, Star, Heart, QrCode, Activity, Target, Award, Eye, ChevronRight, ArrowUp, ArrowDown, Filter, RefreshCw, Zap, BookOpen, UserCheck, TrendingDown, Menu } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompleteLibraryApp = () => {
    // Initial data
    const [books, setBooks] = useState([
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", category: "Fiction", status: "available", rating: 4.5, timesIssued: 23, publishYear: 1925, pages: 180, copies: 3, publisher: "Scribner", language: "English", favorited: false },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0060935467", category: "Fiction", status: "issued", rating: 4.8, timesIssued: 31, publishYear: 1960, pages: 324, copies: 2, publisher: "Harper Perennial", language: "English", favorited: true },
        { id: 3, title: "1984", author: "George Orwell", isbn: "978-0451524935", category: "Fiction", status: "available", rating: 4.7, timesIssued: 28, publishYear: 1949, pages: 328, copies: 4, publisher: "Signet Classic", language: "English", favorited: true },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0141439518", category: "Romance", status: "issued", rating: 4.6, timesIssued: 19, publishYear: 1813, pages: 279, copies: 2, publisher: "Penguin Classics", language: "English", favorited: false },
        { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0316769174", category: "Fiction", status: "overdue", rating: 4.2, timesIssued: 15, publishYear: 1951, pages: 277, copies: 2, publisher: "Little Brown", language: "English", favorited: false },
        { id: 6, title: "Introduction to Algorithms", author: "Thomas Cormen", isbn: "978-0262033848", category: "Technology", status: "available", rating: 4.9, timesIssued: 42, publishYear: 2009, pages: 1292, copies: 5, publisher: "MIT Press", language: "English", favorited: true },
        { id: 7, title: "Clean Code", author: "Robert Martin", isbn: "978-0132350884", category: "Technology", status: "issued", rating: 4.7, timesIssued: 38, publishYear: 2008, pages: 464, copies: 3, publisher: "Prentice Hall", language: "English", favorited: true },
        { id: 8, title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0062316097", category: "History", status: "available", rating: 4.6, timesIssued: 27, publishYear: 2015, pages: 443, copies: 4, publisher: "Harper", language: "English", favorited: false }
    ]);

    const [students, setStudents] = useState([
        { id: 1, name: "Alice Johnson", studentId: "STU001", email: "alice@school.edu", phone: "+1-555-0101", address: "123 Campus Drive", borrowedBooks: 2, fines: 0, joinDate: "2023-09-01", avatar: "👩" },
        { id: 2, name: "Bob Smith", studentId: "STU002", email: "bob@school.edu", phone: "+1-555-0102", address: "456 University Ave", borrowedBooks: 1, fines: 5, joinDate: "2023-09-01", avatar: "👨" },
        { id: 3, name: "Carol Davis", studentId: "STU003", email: "carol@school.edu", phone: "+1-555-0103", address: "789 College Street", borrowedBooks: 0, fines: 0, joinDate: "2023-09-15", avatar: "👩🦰" },
        { id: 4, name: "David Wilson", studentId: "STU004", email: "david@school.edu", phone: "+1-555-0104", address: "321 Academic Blvd", borrowedBooks: 3, fines: 10, joinDate: "2023-09-15", avatar: "👨🦱" }
    ]);

    const [transactions, setTransactions] = useState([
        { id: 1, bookTitle: "To Kill a Mockingbird", studentName: "Alice Johnson", type: "issue", date: "2026-01-15", dueDate: "2026-02-05", status: "active" },
        { id: 2, bookTitle: "The Great Gatsby", studentName: "Bob Smith", type: "return", date: "2026-01-20", dueDate: null, status: "completed" },
        { id: 3, bookTitle: "Pride and Prejudice", studentName: "Alice Johnson", type: "issue", date: "2026-01-18", dueDate: "2026-02-08", status: "active" },
        { id: 4, bookTitle: "Clean Code", studentName: "David Wilson", type: "issue", date: "2026-01-10", dueDate: "2026-01-31", status: "active" },
        { id: 5, bookTitle: "The Catcher in the Rye", studentName: "Bob Smith", type: "issue", date: "2025-12-20", dueDate: "2026-01-10", status: "overdue" }
    ]);

    const [reservations, setReservations] = useState([
        { id: 1, bookTitle: "To Kill a Mockingbird", studentName: "Carol Davis", studentId: "STU003", requestDate: "2026-01-25", status: "pending" },
        { id: 2, bookTitle: "Clean Code", studentName: "Bob Smith", studentId: "STU002", requestDate: "2026-01-26", status: "pending" }
    ]);

    // UI State
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('month');
    const [refreshing, setRefreshing] = useState(false);
    const [formData, setFormData] = useState({});

    // Calculate statistics
    const stats = {
        totalBooks: books.length,
        availableBooks: books.filter(b => b.status === 'available').length,
        issuedBooks: books.filter(b => b.status === 'issued').length,
        overdueBooks: books.filter(b => b.status === 'overdue').length,
        totalStudents: students.length,
        activeMembers: students.filter(s => s.borrowedBooks > 0).length,
        totalFines: students.reduce((sum, s) => sum + s.fines, 0),
        pendingReservations: reservations.filter(r => r.status === 'pending').length,
        circulationRate: 78,
        avgLoanDuration: 14,
        overdueRate: 5.4,
        memberEngagement: 48
    };

    // Dashboard data
    const dashboardData = {
        trends: {
            booksChange: 12,
            studentsChange: -3,
            circulationChange: 8,
            finesChange: -15
        },
        topBooks: [
            { title: "Introduction to Algorithms", issues: 42, rating: 4.9, trend: 'up' },
            { title: "Clean Code", issues: 38, rating: 4.7, trend: 'up' },
            { title: "To Kill a Mockingbird", issues: 31, rating: 4.8, trend: 'stable' },
            { title: "1984", issues: 28, rating: 4.7, trend: 'up' },
            { title: "Sapiens", issues: 27, rating: 4.6, trend: 'down' }
        ],
        categoryData: [
            { name: 'Technology', value: 2, color: '#667eea' },
            { name: 'Fiction', value: 4, color: '#764ba2' },
            { name: 'History', value: 1, color: '#f093fb' },
            { name: 'Romance', value: 1, color: '#f5576c' }
        ],
        monthlyData: [
            { month: 'Aug', issues: 45, returns: 34, reservations: 2 },
            { month: 'Sep', issues: 52, returns: 46, reservations: 3 },
            { month: 'Oct', issues: 58, returns: 51, reservations: 4 },
            { month: 'Nov', issues: 64, returns: 59, reservations: 5 },
            { month: 'Dec', issues: 49, returns: 47, reservations: 3 },
            { month: 'Jan', issues: 71, returns: 65, reservations: 2 }
        ],
        weeklyActivity: [
            { day: 'Mon', activity: 12 },
            { day: 'Tue', activity: 18 },
            { day: 'Wed', activity: 15 },
            { day: 'Thu', activity: 22 },
            { day: 'Fri', activity: 25 },
            { day: 'Sat', activity: 9 },
            { day: 'Sun', activity: 5 }
        ],
        performanceMetrics: [
            { metric: 'Collection Quality', value: 85 },
            { metric: 'User Satisfaction', value: 92 },
            { metric: 'Circulation Rate', value: 78 },
            { metric: 'Resource Utilization', value: 71 },
            { metric: 'Service Efficiency', value: 88 }
        ]
    };

    const recentActivity = transactions.slice(0, 6).map((trans, idx) => ({
        id: trans.id,
        type: trans.type,
        book: trans.bookTitle,
        student: trans.studentName,
        time: `${idx + 1} ${idx === 0 ? 'min' : 'hours'} ago`,
        icon: trans.type === 'issue' ? '📗' : trans.type === 'return' ? '📘' : '⚠️'
    }));

    const alerts = [
        { id: 1, type: 'critical', message: `${stats.overdueBooks} books are overdue`, action: 'Send reminders', priority: 'high' },
        { id: 2, type: 'warning', message: `${stats.pendingReservations} pending reservations need review`, action: 'Review now', priority: 'medium' },
        { id: 3, type: 'info', message: 'Library utilization is up 12% this month', action: 'View report', priority: 'low' },
        { id: 4, type: 'warning', message: `$${stats.totalFines} in unpaid fines`, action: 'Contact students', priority: 'medium' }
    ];

    // Toast notifications
    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // Filtered books
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.includes(searchTerm);
        const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'author') return a.author.localeCompare(b.author);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popularity') return b.timesIssued - a.timesIssued;
        return 0;
    });

    // Modal functions
    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        if (item) {
            setFormData(item);
        } else {
            setFormData({});
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setFormData({});
    };

    // CRUD Operations
    const addBook = () => {
        const newBook = {
            id: books.length + 1,
            title: formData.title || "New Book",
            author: formData.author || "Unknown",
            isbn: formData.isbn || "000-0000000000",
            category: formData.category || "Fiction",
            status: "available",
            rating: 0,
            timesIssued: 0,
            publishYear: formData.publishYear || 2024,
            pages: formData.pages || 0,
            copies: formData.copies || 1,
            publisher: formData.publisher || "Unknown",
            language: formData.language || "English",
            favorited: false
        };
        setBooks([...books, newBook]);
        addToast('Book added successfully!');
        closeModal();
    };

    const editBook = () => {
        setBooks(books.map(b => b.id === selectedItem.id ? { ...b, ...formData } : b));
        addToast('Book updated successfully!');
        closeModal();
    };

    const deleteBook = (id) => {
        setBooks(books.filter(b => b.id !== id));
        addToast('Book deleted successfully!', 'info');
    };

    const toggleFavorite = (id) => {
        setBooks(books.map(b => b.id === id ? { ...b, favorited: !b.favorited } : b));
    };

    const issueBook = () => {
        const book = books.find(b => b.id === formData.bookId);
        const student = students.find(s => s.id === formData.studentId);

        if (book && student) {
            setBooks(books.map(b => b.id === book.id ? { ...b, status: 'issued', timesIssued: b.timesIssued + 1 } : b));
            setStudents(students.map(s => s.id === student.id ? { ...s, borrowedBooks: s.borrowedBooks + 1 } : s));

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 21);
            const newTransaction = {
                id: transactions.length + 1,
                bookTitle: book.title,
                studentName: student.name,
                type: 'issue',
                date: new Date().toISOString().split('T')[0],
                dueDate: dueDate.toISOString().split('T')[0],
                status: 'active'
            };
            setTransactions([newTransaction, ...transactions]);

            addToast(`Book "${book.title}" issued to ${student.name}`);
            closeModal();
        }
    };

    const returnBook = () => {
        const book = books.find(b => b.id === formData.bookId);
        const student = students.find(s => s.id === formData.studentId);

        if (book && student) {
            setBooks(books.map(b => b.id === book.id ? { ...b, status: 'available' } : b));
            setStudents(students.map(s => s.id === student.id ? { ...s, borrowedBooks: Math.max(0, s.borrowedBooks - 1) } : s));

            const newTransaction = {
                id: transactions.length + 1,
                bookTitle: book.title,
                studentName: student.name,
                type: 'return',
                date: new Date().toISOString().split('T')[0],
                dueDate: null,
                status: 'completed'
            };
            setTransactions([newTransaction, ...transactions]);

            addToast(`Book "${book.title}" returned by ${student.name}`);
            closeModal();
        }
    };

    const addStudent = () => {
        const newStudent = {
            id: students.length + 1,
            name: formData.name || "New Student",
            studentId: formData.studentId || `STU${String(students.length + 1).padStart(3, '0')}`,
            email: formData.email || "student@school.edu",
            phone: formData.phone || "+1-555-0000",
            address: formData.address || "Address",
            borrowedBooks: 0,
            fines: 0,
            joinDate: new Date().toISOString().split('T')[0],
            avatar: "👤"
        };
        setStudents([...students, newStudent]);
        addToast('Student added successfully!');
        closeModal();
    };

    const editStudent = () => {
        setStudents(students.map(s => s.id === selectedItem.id ? { ...s, ...formData } : s));
        addToast('Student updated successfully!');
        closeModal();
    };

    const deleteStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
        addToast('Student removed successfully!', 'info');
    };

    const approveReservation = (id) => {
        setReservations(reservations.map(r => r.id === id ? { ...r, status: 'ready' } : r));
        addToast('Reservation approved!');
    };

    const rejectReservation = (id) => {
        setReservations(reservations.filter(r => r.id !== id));
        addToast('Reservation rejected', 'info');
    };

    const exportData = () => {
        const data = { books, students, transactions, reservations, stats, exportDate: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `library-data-${Date.now()}.json`;
        a.click();
        addToast('Data exported successfully!');
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            addToast('Dashboard refreshed!');
        }, 1000);
    };

    const quickActions = [
        { id: 1, title: 'Issue Book', icon: <BookOpen size={20} />, color: '#667eea', action: () => openModal('issueBook') },
        { id: 2, title: 'Add Student', icon: <Users size={20} />, color: '#764ba2', action: () => openModal('addStudent') },
        { id: 3, title: 'Return Book', icon: <CheckCircle size={20} />, color: '#34d399', action: () => openModal('returnBook') },
        { id: 4, title: 'Add Book', icon: <Plus size={20} />, color: '#f59e0b', action: () => openModal('addBook') },
        { id: 5, title: 'Scan Barcode', icon: <QrCode size={20} />, color: '#ef4444', action: () => setShowScanner(true) },
        { id: 6, title: 'Export Data', icon: <Download size={20} />, color: '#8b5cf6', action: exportData }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            fontFamily: '"Inter", system-ui, sans-serif',
            color: '#fff',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          animation: slideInUp 0.6s ease;
        }
        
        .card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .stat-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .stat-card:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .btn-danger {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }
        
        .badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .badge-available {
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.4);
        }
        
        .badge-issued {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.4);
        }
        
        .badge-overdue {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }
        
        .badge-up {
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
        }
        
        .badge-down {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .input, .select {
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-family: 'Inter', sans-serif;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .input:focus, .select:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .select option {
          background: #1e293b;
          color: white;
        }
        
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 16px 24px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.95);
          color: #1e293b;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          font-weight: 600;
          animation: slideInUp 0.3s ease;
          z-index: 10000;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        
        .modal {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 30px;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideInUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 10px;
          transition: width 0.6s ease;
        }
        
        .quick-action {
          padding: 20px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        
        .quick-action:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .activity-item, .alert {
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .activity-item:hover, .alert:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }
        
        .alert-critical {
          background: rgba(239, 68, 68, 0.1);
          border-left: 4px solid #ef4444;
        }
        
        .alert-warning {
          background: rgba(251, 191, 36, 0.1);
          border-left: 4px solid #fbbf24;
        }
        
        .alert-info {
          background: rgba(59, 130, 246, 0.1);
          border-left: 4px solid #3b82f6;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

            {/* Animated Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                zIndex: 0,
                opacity: 0.3
            }}>
                <div style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
                    top: '-200px',
                    right: '-200px',
                    animation: 'pulse 8s infinite ease-in-out'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)',
                    bottom: '-150px',
                    left: '-150px',
                    animation: 'pulse 10s infinite ease-in-out reverse'
                }} />
            </div>

            {/* Toast notifications */}
            {toasts.map((toast, index) => (
                <div key={toast.id} className="toast" style={{ bottom: `${20 + index * 70}px` }}>
                    {toast.message}
                </div>
            ))}

            {/* Main content - Continued in next message due to length */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1600px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '48px',
                            fontWeight: '800',
                            margin: 0,
                            background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>
                            📚 Smart Library
                        </h1>
                        <p style={{ margin: '8px 0 0 0', opacity: 0.7, fontSize: '18px', fontWeight: '500' }}>
                            Complete Management System
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                            className="select"
                            value={selectedTimeRange}
                            onChange={(e) => setSelectedTimeRange(e.target.value)}
                            style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.1)', width: 'auto', padding: '10px' }}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>

                        <button
                            className="btn btn-secondary"
                            onClick={handleRefresh}
                            style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none', padding: '10px' }}
                        >
                            <RefreshCw size={18} />
                        </button>

                        <button className="btn btn-secondary" onClick={exportData} style={{ padding: '10px 20px' }}>
                            <Download size={18} />
                            Export
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => setShowQuickActions(!showQuickActions)}
                            style={{ padding: '10px 20px' }}
                        >
                            <Zap size={18} />
                            Quick Actions
                        </button>

                        <div style={{ position: 'relative' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowNotifications(!showNotifications)}
                                style={{ position: 'relative', padding: '10px' }}
                            >
                                <Bell size={18} />
                                {alerts.length > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        background: '#ef4444',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        {alerts.length}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '10px',
                                    width: '300px',
                                    background: 'rgba(30, 41, 59, 0.98)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    zIndex: 1000,
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    {alerts.map(notif => (
                                        <div key={notif.id} style={{
                                            padding: '15px',
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px'
                                        }}>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{notif.message}</div>
                                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', width: 'fit-content' }}>
                                                {notif.action}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions Panel */}
                {showQuickActions && (
                    <div style={{ marginBottom: '30px', animation: 'slideInUp 0.4s ease' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: '15px'
                        }}>
                            {quickActions.map((action, index) => (
                                <div
                                    key={action.id}
                                    className="quick-action"
                                    onClick={action.action}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: action.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 8px 20px ${action.color}40`
                                    }}>
                                        {action.icon}
                                    </div>
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{action.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '30px',
                    flexWrap: 'wrap'
                }}>
                    {['dashboard', 'books', 'students', 'transactions', 'reservations'].map(tab => (
                        <button
                            key={tab}
                            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                textTransform: 'capitalize',
                                padding: '10px 20px'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dashboard Tab - Will continue in the file... */}
                {activeTab === 'dashboard' && (
                    <div>
                        {/* Key Metrics */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            <div className="card stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Books</div>
                                        <div style={{ fontSize: '42px', fontWeight: '800' }}>{stats.totalBooks}</div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(102, 126, 234, 0.2)', borderRadius: '12px' }}>
                                        <Book size={28} color="#667eea" />
                                    </div>
                                </div>
                                <div className="badge badge-up">
                                    <ArrowUp size={14} />
                                    +{dashboardData.trends.booksChange}% this month
                                </div>
                            </div>

                            <div className="card stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available</div>
                                        <div style={{ fontSize: '42px', fontWeight: '800', color: '#34d399' }}>{stats.availableBooks}</div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(52, 211, 153, 0.2)', borderRadius: '12px' }}>
                                        <CheckCircle size={28} color="#34d399" />
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', opacity: 0.7 }}>
                                    {((stats.availableBooks / stats.totalBooks) * 100).toFixed(1)}% of collection
                                </div>
                            </div>

                            <div className="card stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Issued</div>
                                        <div style={{ fontSize: '42px', fontWeight: '800', color: '#fbbf24' }}>{stats.issuedBooks}</div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(251, 191, 36, 0.2)', borderRadius: '12px' }}>
                                        <Clock size={28} color="#fbbf24" />
                                    </div>
                                </div>
                                <div className="badge badge-up">
                                    <ArrowUp size={14} />
                                    +{dashboardData.trends.circulationChange}% circulation
                                </div>
                            </div>

                            <div className="card stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overdue</div>
                                        <div style={{ fontSize: '42px', fontWeight: '800', color: '#ef4444' }}>{stats.overdueBooks}</div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
                                        <AlertCircle size={28} color="#ef4444" />
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', opacity: 0.7 }}>
                                    Requires attention
                                </div>
                            </div>
                        </div>

                        {/* Performance Indicators */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px',
                            marginBottom: '30px'
                        }}>
                            <div className="metric-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.8 }}>Circulation Rate</span>
                                    <Activity size={16} color="#667eea" />
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{stats.circulationRate}%</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${stats.circulationRate}%` }} />
                                </div>
                            </div>

                            <div className="metric-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.8 }}>Avg Loan Duration</span>
                                    <Target size={16} color="#764ba2" />
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{stats.avgLoanDuration} days</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${(stats.avgLoanDuration / 21) * 100}%`, background: 'linear-gradient(90deg, #764ba2, #f093fb)' }} />
                                </div>
                            </div>

                            <div className="metric-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.8 }}>Member Engagement</span>
                                    <Award size={16} color="#34d399" />
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{stats.memberEngagement}%</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${stats.memberEngagement}%`, background: 'linear-gradient(90deg, #34d399, #10b981)' }} />
                                </div>
                            </div>

                            <div className="metric-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.8 }}>Overdue Rate</span>
                                    <TrendingDown size={16} color="#ef4444" />
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{stats.overdueRate}%</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${stats.overdueRate}%`, background: 'linear-gradient(90deg, #ef4444, #f87171)' }} />
                                </div>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            {/* Monthly Circulation Chart */}
                            <div className="card">
                                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700' }}>📈 Monthly Circulation</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={dashboardData.monthlyData}>
                                        <defs>
                                            <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis dataKey="month" stroke="#fff" />
                                        <YAxis stroke="#fff" />
                                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                                        <Legend />
                                        <Area type="monotone" dataKey="issues" stroke="#667eea" fillOpacity={1} fill="url(#colorIssues)" />
                                        <Area type="monotone" dataKey="returns" stroke="#34d399" fillOpacity={1} fill="url(#colorReturns)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Category Distribution */}
                            <div className="card">
                                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700' }}>📚 Collection by Category</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={dashboardData.categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {dashboardData.categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '20px'
                        }}>
                            {/* Priority Alerts */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>🚨 Priority Alerts</h3>
                                    <span style={{
                                        padding: '4px 12px',
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        {alerts.filter(a => a.priority === 'high').length} HIGH
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {alerts.map(alert => (
                                        <div key={alert.id} className={`alert alert-${alert.type}`}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{alert.message}</div>
                                                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginTop: '8px' }}>
                                                    {alert.action}
                                                </button>
                                            </div>
                                            <ChevronRight size={20} opacity={0.5} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>⚡ Recent Activity</h3>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveTab('transactions')}>
                                        <Eye size={14} />
                                        View All
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {recentActivity.map(activity => (
                                        <div key={activity.id} className="activity-item">
                                            <div style={{ fontSize: '24px' }}>{activity.icon}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{activity.book}</div>
                                                <div style={{ fontSize: '12px', opacity: 0.7 }}>{activity.student}</div>
                                            </div>
                                            <div style={{ fontSize: '11px', opacity: 0.6, textAlign: 'right' }}>
                                                <div>{activity.time}</div>
                                                <div style={{
                                                    marginTop: '4px',
                                                    padding: '2px 8px',
                                                    background: activity.type === 'overdue' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                                                    borderRadius: '8px',
                                                    fontSize: '10px',
                                                    fontWeight: '700',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {activity.type}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Books */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>🏆 Most Popular Books</h3>
                                    <Star size={18} fill="#fbbf24" color="#fbbf24" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {dashboardData.topBooks.map((book, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                background: index === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : index === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : index === 2 ? 'linear-gradient(135deg, #cd7f32, #b87333)' : 'rgba(255,255,255,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '800',
                                                fontSize: '14px'
                                            }}>
                                                {index + 1}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{book.title}</div>
                                                <div style={{ fontSize: '12px', opacity: 0.7 }}>{book.issues} issues • {book.rating} ⭐</div>
                                            </div>
                                            <div>
                                                {book.trend === 'up' && <ArrowUp size={16} color="#34d399" />}
                                                {book.trend === 'down' && <ArrowDown size={16} color="#ef4444" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Books Tab */}
                {activeTab === 'books' && (
                    <div>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    className="input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>

                            <select className="select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ width: 'auto' }}>
                                <option value="all">All Categories</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Technology">Technology</option>
                                <option value="History">History</option>
                                <option value="Romance">Romance</option>
                            </select>

                            <select className="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
                                <option value="all">All Status</option>
                                <option value="available">Available</option>
                                <option value="issued">Issued</option>
                                <option value="overdue">Overdue</option>
                            </select>

                            <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: 'auto' }}>
                                <option value="title">Sort by Title</option>
                                <option value="author">Sort by Author</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="popularity">Sort by Popularity</option>
                            </select>

                            <button className="btn btn-primary" onClick={() => openModal('addBook')}>
                                <Plus size={18} />
                                Add Book
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '20px'
                        }}>
                            {filteredBooks.map(book => (
                                <div key={book.id} className="card" style={{ padding: '20px', position: 'relative' }}>
                                    <button
                                        onClick={() => toggleFavorite(book.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Heart size={20} fill={book.favorited ? '#ef4444' : 'none'} color={book.favorited ? '#ef4444' : '#fff'} />
                                    </button>

                                    <div style={{ marginBottom: '12px' }}>
                                        <h3 style={{ margin: '0 40px 8px 0', fontSize: '18px', fontWeight: '600' }}>{book.title}</h3>
                                        <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>{book.author}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                        <span className={`badge badge-${book.status}`}>{book.status}</span>
                                        <span className="badge" style={{ background: 'rgba(147, 51, 234, 0.2)', color: '#a78bfa', border: '1px solid rgba(147, 51, 234, 0.4)' }}>
                                            {book.category}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                                            <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                            <span>{book.rating.toFixed(1)}</span>
                                        </div>
                                        <div>ISBN: {book.isbn}</div>
                                        <div>Issued {book.timesIssued} times</div>
                                        <div>{book.pages} pages • {book.publishYear}</div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                                        <button className="btn btn-secondary" onClick={() => openModal('editBook', book)} style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
                                            <Edit2 size={14} />
                                        </button>
                                        <button className="btn btn-primary" onClick={() => openModal('issueBook', book)} style={{ flex: 1, padding: '8px', fontSize: '14px' }} disabled={book.status !== 'available'}>
                                            Issue
                                        </button>
                                        {book.status === 'issued' && (
                                            <button className="btn btn-primary" onClick={() => openModal('returnBook', book)} style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
                                                Return
                                            </button>
                                        )}
                                        <button className="btn btn-danger" onClick={() => deleteBook(book.id)} style={{ padding: '8px', fontSize: '14px' }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Student Directory</h2>
                            <button className="btn btn-primary" onClick={() => openModal('addStudent')}>
                                <Plus size={18} />
                                Add Student
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                            {students.map(student => (
                                <div key={student.id} className="card" style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '32px'
                                        }}>
                                            {student.avatar}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>{student.name}</h3>
                                            <div style={{ fontSize: '14px', opacity: 0.7 }}>{student.studentId}</div>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <Mail size={14} />
                                            <span>{student.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <Phone size={14} />
                                            <span>{student.phone}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <MapPin size={14} />
                                            <span>{student.address}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} />
                                            <span>Member since {student.joinDate}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                        <div className="card" style={{ flex: 1, padding: '10px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '24px', fontWeight: '700' }}>{student.borrowedBooks}</div>
                                            <div style={{ fontSize: '12px', opacity: 0.7 }}>Borrowed</div>
                                        </div>
                                        <div className="card" style={{ flex: 1, padding: '10px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '24px', fontWeight: '700', color: student.fines > 0 ? '#ef4444' : '#34d399' }}>${student.fines}</div>
                                            <div style={{ fontSize: '12px', opacity: 0.7 }}>Fines</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn btn-secondary" onClick={() => openModal('editStudent', student)} style={{ flex: 1 }}>
                                            <Edit2 size={14} />
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Transactions Tab */}
                {activeTab === 'transactions' && (
                    <div>
                        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '600' }}>Transaction History</h2>
                        <div className="card" style={{ padding: '20px' }}>
                            {transactions.map(trans => (
                                <div key={trans.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>{trans.bookTitle}</div>
                                        <div style={{ fontSize: '14px', opacity: 0.7 }}>{trans.studentName}</div>
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'center' }}>
                                        <span className={`badge badge-${trans.type === 'issue' ? 'issued' : trans.status === 'overdue' ? 'overdue' : 'available'}`}>
                                            {trans.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'right' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{trans.date}</div>
                                        {trans.dueDate && <div style={{ fontSize: '12px', opacity: 0.7 }}>Due: {trans.dueDate}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reservations Tab */}
                {activeTab === 'reservations' && (
                    <div>
                        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '600' }}>Reservation Requests</h2>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {reservations.map(res => (
                                <div key={res.id} className="card" style={{
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{res.bookTitle}</h3>
                                        <div style={{ fontSize: '14px', opacity: 0.8 }}>
                                            <div>Requested by: {res.studentName} ({res.studentId})</div>
                                            <div>Date: {res.requestDate}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`badge ${res.status === 'pending' ? 'badge-issued' : 'badge-available'}`}>
                                            {res.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => approveReservation(res.id)}
                                            disabled={res.status !== 'pending'}
                                        >
                                            <CheckCircle size={16} />
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => rejectReservation(res.id)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
                                {modalType === 'addBook' && 'Add New Book'}
                                {modalType === 'editBook' && 'Edit Book'}
                                {modalType === 'issueBook' && 'Issue Book'}
                                {modalType === 'returnBook' && 'Return Book'}
                                {modalType === 'addStudent' && 'Add New Student'}
                                {modalType === 'editStudent' && 'Edit Student'}
                            </h2>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {(modalType === 'addBook' || modalType === 'editBook') && (
                                <>
                                    <input type="text" placeholder="Book Title" className="input" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                    <input type="text" placeholder="Author" className="input" value={formData.author || ''} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                                    <input type="text" placeholder="ISBN" className="input" value={formData.isbn || ''} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
                                    <select className="select" value={formData.category || 'Fiction'} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Technology">Technology</option>
                                        <option value="History">History</option>
                                        <option value="Romance">Romance</option>
                                    </select>
                                    <input type="number" placeholder="Publish Year" className="input" value={formData.publishYear || ''} onChange={(e) => setFormData({ ...formData, publishYear: parseInt(e.target.value) })} />
                                    <input type="number" placeholder="Number of Pages" className="input" value={formData.pages || ''} onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })} />
                                    <input type="number" placeholder="Number of Copies" className="input" value={formData.copies || ''} onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) })} />
                                    <input type="text" placeholder="Publisher" className="input" value={formData.publisher || ''} onChange={(e) => setFormData({ ...formData, publisher: e.target.value })} />
                                </>
                            )}

                            {modalType === 'issueBook' && (
                                <>
                                    <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                                        <strong>Book:</strong> {selectedItem?.title}
                                    </div>
                                    <select className="select" value={formData.studentId || ''} onChange={(e) => setFormData({ ...formData, studentId: parseInt(e.target.value), bookId: selectedItem.id })}>
                                        <option value="">Select Student</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.studentId})</option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {modalType === 'returnBook' && (
                                <>
                                    <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                                        <strong>Book:</strong> {selectedItem?.title}
                                    </div>
                                    <select className="select" value={formData.studentId || ''} onChange={(e) => setFormData({ ...formData, studentId: parseInt(e.target.value), bookId: selectedItem.id })}>
                                        <option value="">Select Student</option>
                                        {students.filter(s => s.borrowedBooks > 0).map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.studentId})</option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {(modalType === 'addStudent' || modalType === 'editStudent') && (
                                <>
                                    <input type="text" placeholder="Student Name" className="input" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input type="text" placeholder="Student ID" className="input" value={formData.studentId || ''} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} />
                                    <input type="email" placeholder="Email" className="input" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    <input type="tel" placeholder="Phone" className="input" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                    <input type="text" placeholder="Address" className="input" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button className="btn btn-secondary" onClick={closeModal} style={{ flex: 1 }}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (modalType === 'addBook') addBook();
                                        else if (modalType === 'editBook') editBook();
                                        else if (modalType === 'issueBook') issueBook();
                                        else if (modalType === 'returnBook') returnBook();
                                        else if (modalType === 'addStudent') addStudent();
                                        else if (modalType === 'editStudent') editStudent();
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    {modalType.includes('add') ? 'Add' : modalType.includes('edit') ? 'Save' : modalType.includes('issue') ? 'Issue' : 'Return'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Scanner Modal */}
            {showScanner && (
                <div className="modal-overlay" onClick={() => setShowScanner(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
                        <h2 style={{ margin: '0 0 20px 0' }}>Barcode Scanner</h2>
                        <div style={{
                            width: '100%',
                            height: '300px',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <QrCode size={80} style={{ opacity: 0.5 }} />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10%',
                                right: '10%',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
                                animation: 'scan 2s infinite'
                            }} />
                        </div>
                        <style>{`
              @keyframes scan {
                0%, 100% { transform: translateY(-150px); }
                50% { transform: translateY(150px); }
              }
            `}</style>
                        <p style={{ opacity: 0.8, marginBottom: '20px' }}>Position barcode within frame</p>
                        <button className="btn btn-primary" onClick={() => setShowScanner(false)}>
                            Close Scanner
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompleteLibraryApp;
