
const ICONS = {
    Dashboard: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.085-1.085-1.085m1.085 1.085L12 21m-4.5-4.5H5.25" /></svg>`,
    Admissions: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
    Students: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663l.001.001z" /></svg>`,
    Financial: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0H3.75m0 0A.75.75 0 013 7.5v-.75m12 12.75v-2.25a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v2.25m3.75 0-3.75 0a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-2.25" /></svg>`,
    Hostel: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>`,
    Library: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>`,
    Announcements: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-3.375l-4.5 4.5m0-4.5l4.5 4.5m-4.5 0v3.75c0 .621.504 1.125 1.125 1.125h2.09" /></svg>`,
    SortArrow: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sort-arrow"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>`,
};
const NAV_ITEMS = [ { name: 'Dashboard', icon: ICONS.Dashboard }, { name: 'Admissions', icon: ICONS.Admissions }, { name: 'Student Info', icon: ICONS.Students }, { name: 'Financial', icon: ICONS.Financial }, { name: 'Hostel', icon: ICONS.Hostel }, { name: 'Library', icon: ICONS.Library }, { name: 'Announcements', icon: ICONS.Announcements }, ];

let state = {
    currentView: 'Dashboard',
    applications: [],
    students: [],
    transactions: [],
    books: [],
    announcements: [],
    studentHostelData: [],
    admissions: { searchTerm: '', filterStatus: 'All' },
    studentInfo: { searchTerm: '', filterBranch: 'All', filterYear: 'All' },
    financial: { filterType: 'All', sortConfig: { key: 'date', direction: 'desc' } },
    hostel: { searchTerm: '' },
    library: { searchTerm: '' },
};

// =================================================================================
// 2. DOM SELECTORS & API HELPERS
// =================================================================================
const sidebarNavList = document.getElementById('sidebar-nav-list');
const mainContentHeader = document.getElementById('main-content-header');
const contentArea = document.getElementById('content-area');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');

// Centralized API Request Function
async function apiRequest(method, path, body = null) {
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`${API_BASE_URL}${path}`, options);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        if (response.status === 204) return; // For DELETE requests
        return await response.json();
    } catch (error) {
        console.error(`Failed to ${method} ${path}:`, error);
        alert('An error occurred. Please check the console and ensure the backend is running.');
    }
}

// =================================================================================
// 3. HELPER FUNCTIONS
// =================================================================================
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const sanitize = (str) => str.toLowerCase().replace(/\s+/g, '-');
const calculateFine = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    if (today <= due) return 0;
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * 1; // $1 per day fine
};

// =================================================================================
// 4. RENDER FUNCTIONS
// =================================================================================

/** Main render function to update the entire view */
function renderApp() {
    mainContentHeader.textContent = state.currentView;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === state.currentView);
    });
    
    switch (state.currentView) {
        case 'Dashboard': renderDashboard(); break;
        case 'Admissions': renderAdmissions(); break;
        case 'Student Info': renderStudentInfo(); break;
        case 'Financial': renderFinancial(); break;
        case 'Hostel': renderHostel(); break;
        case 'Library': renderLibrary(); break;
        case 'Announcements': renderAnnouncements(); break;
        default: renderDashboard();
    }
}

function renderSidebar() {
    sidebarNavList.innerHTML = NAV_ITEMS.map(item => `
        <li class="nav-item" data-view="${item.name}">
            ${item.icon}
            <span>${item.name}</span>
        </li>
    `).join('');
}

function renderDashboard() {
    const totalStudents = state.students.length;
    const outstandingFees = state.transactions.filter(t => t.status === 'Pending' && t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const recentApplications = [...state.applications].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)).slice(0, 5);
    const boysHostelOccupancy = state.studentHostelData.filter(s => s.hostel === "Boys' Hostel").length;
    const girlsHostelOccupancy = state.studentHostelData.filter(s => s.hostel === "Girls' Hostel").length;

    contentArea.innerHTML = `
        <div class="main-dashboard-container">
            <div class="dashboard-grid">
                <div class="metric-card"><h2>Total Student Enrollment</h2><p class="value">${totalStudents}</p></div>
                <div class="metric-card"><h2>Total Outstanding Fees</h2><p class="value">${formatCurrency(outstandingFees)}</p></div>
                <div class="metric-card"><h2>Boys Hostel Occupancy</h2><p class="value">${boysHostelOccupancy} / ${HOSTEL_DATA[0].totalBeds} Beds</p></div>
                <div class="metric-card"><h2>Girls Hostel Occupancy</h2><p class="value">${girlsHostelOccupancy} / ${HOSTEL_DATA[1].totalBeds} Beds</p></div>
            </div>
            <div class="dashboard-panel">
                <h2>Recent Admission Applications</h2>
                <div class="table-container">
                    <table class="student-table">
                         <thead><tr><th>Applicant Name</th><th>Applied Course</th><th>Application Date</th><th>Status</th></tr></thead>
                        <tbody>
                            ${recentApplications.map(app => `
                                <tr>
                                    <td>${app.name}</td>
                                    <td>${app.appliedCourse}</td>
                                    <td>${app.applicationDate}</td>
                                    <td><span class="status-badge status-${sanitize(app.status)}">${app.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderAdmissions() {
    const { searchTerm, filterStatus } = state.admissions;
    const statusCounts = state.applications.reduce((acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }), {});
    const filteredApplications = state.applications.filter(app => 
        (app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.appliedCourse.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'All' || app.status === filterStatus)
    );
    const statusOptions = ['All', ...Object.keys(statusCounts)];

    contentArea.innerHTML = `
        <div class="admissions-container">
            <div class="toolbar">
                <input type="text" placeholder="Search applications..." class="search-input" value="${searchTerm}" data-view="admissions" data-filter="searchTerm">
                <select class="filter-select" data-view="admissions" data-filter="filterStatus">
                    ${statusOptions.map(status => `<option value="${status}" ${filterStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
                </select>
            </div>
            <div class="table-container">
                <table class="student-table">
                    <thead><tr><th>Applicant Name</th><th>Applied Course</th><th>Application Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        ${filteredApplications.map(app => `
                            <tr>
                                <td>${app.name}</td>
                                <td>${app.appliedCourse}</td>
                                <td>${app.applicationDate}</td>
                                <td><span class="status-badge status-${sanitize(app.status)}">${app.status}</span></td>
                                <td><button class="action-button">View Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderStudentInfo() {
    const { searchTerm, filterBranch, filterYear } = state.studentInfo;
    const filteredStudents = state.students.filter(student => 
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterBranch === 'All' || student.branch === filterBranch) &&
        (filterYear === 'All' || student.year.toString() === filterYear)
    );
    const branches = ['All', ...Array.from(new Set(state.students.map(s => s.branch)))];
    const years = ['All', ...Array.from(new Set(state.students.map(s => s.year.toString())))].sort();

    contentArea.innerHTML = `
        <div class="student-info-container">
            <div class="toolbar">
                <input type="text" placeholder="Search students by name, ID, or email..." class="search-input wide" value="${searchTerm}" data-view="studentInfo" data-filter="searchTerm">
                <select class="filter-select" data-view="studentInfo" data-filter="filterBranch">
                    ${branches.map(branch => `<option value="${branch}" ${filterBranch === branch ? 'selected' : ''}>${branch}</option>`).join('')}
                </select>
                <select class="filter-select" data-view="studentInfo" data-filter="filterYear">
                    ${years.map(year => `<option value="${year}" ${filterYear === year ? 'selected' : ''}>${year === 'All' ? 'All Years' : `Year ${year}`}</option>`).join('')}
                </select>
            </div>
            <div class="table-container">
                <table class="student-table">
                    <thead><tr><th>Student ID</th><th>Name</th><th>Branch</th><th>Year</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${filteredStudents.map(student => `
                            <tr>
                                <td>${student.studentId}</td>
                                <td>${student.name}</td>
                                <td>${student.branch}</td>
                                <td>${student.year}</td>
                                <td>${student.email}</td>
                                <td><span class="status-badge status-${sanitize(student.status)}">${student.status}</span></td>
                                <td>
                                    <button class="action-button" data-action="edit-student" data-student-id="${student.id}">Edit</button>
                                    <button class="action-button danger" data-action="delete-student" data-student-id="${student.id}">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderFinancial() {
    const { filterType, sortConfig } = state.financial;
    const filteredTransactions = state.transactions.filter(t => filterType === 'All' || t.type === filterType);
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (!sortConfig) return 0;
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });
    const getSortClassName = (name) => (!sortConfig || sortConfig.key !== name) ? '' : sortConfig.direction;
    const transactionTypes = ['All', ...Array.from(new Set(state.transactions.map(t => t.type)))];

    contentArea.innerHTML = `
        <div class="financial-container">
             <div class="toolbar">
                <select class="filter-select" data-view="financial" data-filter="filterType">
                    ${transactionTypes.map(type => `<option value="${type}" ${filterType === type ? 'selected' : ''}>${type}</option>`).join('')}
                </select>
            </div>
            <div class="table-container">
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Student</th>
                            <th data-sort-key="date" class="sortable ${getSortClassName('date')}">Date ${ICONS.SortArrow}</th>
                            <th>Description</th>
                            <th data-sort-key="amount" class="sortable ${getSortClassName('amount')}">Amount ${ICONS.SortArrow}</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedTransactions.map(t => `
                            <tr>
                                <td>${t.id}</td>
                                <td>${t.studentName} (${t.studentId})</td>
                                <td>${t.date}</td>
                                <td>${t.description}</td>
                                <td class="${t.amount > 0 ? 'amount-positive' : 'amount-negative'}">${formatCurrency(t.amount)}</td>
                                <td>${t.type}</td>
                                <td><span class="status-badge status-financial-${t.status.toLowerCase()}">${t.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderHostel() {
    const { searchTerm } = state.hostel;
    const filteredStudents = state.studentHostelData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const boysHostel = HOSTEL_DATA.find(h => h.name === "Boys' Hostel");
    const girlsHostel = HOSTEL_DATA.find(h => h.name === "Girls' Hostel");
    const boysOccupied = state.studentHostelData.filter(s => s.hostel === boysHostel.name && s.roomNumber).length;
    const girlsOccupied = state.studentHostelData.filter(s => s.hostel === girlsHostel.name && s.roomNumber).length;
    const boysPercentage = (boysOccupied / boysHostel.totalBeds) * 100;
    const girlsPercentage = (girlsOccupied / girlsHostel.totalBeds) * 100;

    contentArea.innerHTML = `
        <div class="hostel-container">
            <div class="dashboard-grid">
                <div class="metric-card">
                    <h3>${boysHostel.name} Occupancy</h3>
                    <p class="value">${boysOccupied} / ${boysHostel.totalBeds}</p>
                    <div class="progress-bar-container"><div class="progress-bar" style="width: ${boysPercentage}%"></div></div>
                </div>
                <div class="metric-card">
                    <h3>${girlsHostel.name} Occupancy</h3>
                    <p class="value">${girlsOccupied} / ${girlsHostel.totalBeds}</p>
                    <div class="progress-bar-container"><div class="progress-bar" style="width: ${girlsPercentage}%"></div></div>
                </div>
            </div>
            <div class="dashboard-panel">
                <h3>Student Room Allocation</h3>
                <div class="toolbar">
                    <input type="text" placeholder="Search by student name or ID..." class="search-input wide" value="${searchTerm}" data-view="hostel" data-filter="searchTerm">
                </div>
                <div class="table-container">
                    <table class="student-table">
                        <thead><tr><th>Student ID</th><th>Name</th><th>Branch</th><th>Hostel</th><th>Room Number</th><th>Action</th></tr></thead>
                        <tbody>
                            ${filteredStudents.map(student => `
                                <tr>
                                    <td>${student.studentId}</td>
                                    <td>${student.name}</td>
                                    <td>${student.branch}</td>
                                    <td>${student.hostel || 'N/A'}</td>
                                    <td>${student.roomNumber || 'N/A'}</td>
                                    <td><button class="action-button" data-action="open-hostel-modal" data-student-id="${student.id}">${student.roomNumber ? 'Change Room' : 'Allocate Room'}</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderLibrary() {
    const { searchTerm } = state.library;
    const filteredBooks = state.books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()) || book.isbn.includes(searchTerm));
    
    contentArea.innerHTML = `
         <div class="library-container">
            <div class="dashboard-panel">
                <h3>Book Catalog</h3>
                <div class="toolbar">
                    <input type="text" placeholder="Search by title, author, or ISBN..." class="search-input wide" value="${searchTerm}" data-view="library" data-filter="searchTerm">
                    <button class="action-button primary" data-action="open-library-modal" data-modal-type="add">Add New Book</button>
                </div>
                <div class="table-container">
                    <table class="student-table">
                        <thead><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Status</th><th>Checked Out By</th><th>Due Date</th><th>Actions</th></tr></thead>
                        <tbody>
                           ${filteredBooks.map(book => `
                                <tr>
                                    <td>${book.title}</td>
                                    <td>${book.author}</td>
                                    <td>${book.isbn}</td>
                                    <td><span class="status-badge status-${sanitize(book.status)}">${book.status}</span></td>
                                    <td>${book.checkedOutBy || 'N/A'}</td>
                                    <td>${book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        ${book.status === 'Available' ? `<button class="action-button" data-action="open-library-modal" data-modal-type="checkout" data-book-id="${book.id}">Check Out</button>` : ''}
                                        ${(book.status === 'Checked Out' || book.status === 'Overdue') ? `<button class="action-button" data-action="open-library-modal" data-modal-type="checkin" data-book-id="${book.id}">Check In</button>` : ''}
                                        <button class="action-button danger" data-action="open-library-modal" data-modal-type="remove" data-book-id="${book.id}">Remove</button>
                                    </td>
                                </tr>
                           `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderAnnouncements() {
    const sortedAnnouncements = [...state.announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    contentArea.innerHTML = `
        <div class="announcements-container">
            <div class="dashboard-panel announcement-form">
                <h2>Create New Announcement</h2>
                <textarea id="announcement-text" class="form-control" placeholder="Type your message here..."></textarea>
                <div class="form-footer">
                    <button class="action-button primary" data-action="post-announcement">Post Announcement</button>
                </div>
            </div>
            
            <div class="announcements-list">
                <h2>Posted Announcements</h2>
                ${sortedAnnouncements.length > 0 ? sortedAnnouncements.map(ann => `
                    <div class="announcement-card">
                        <div class="announcement-header">
                            <span class="date">Posted on: ${new Date(ann.createdAt).toLocaleString()}</span>
                            <button class="action-button danger" data-action="delete-announcement" data-announcement-id="${ann.id}">Delete</button>
                        </div>
                        <div class="announcement-body">
                            <p>${ann.message}</p>
                        </div>
                    </div>
                `).join('') : '<p>No announcements have been posted yet.</p>'}
            </div>
        </div>
    `;
}


// =================================================================================
// 5. MODAL MANAGEMENT
// =================================================================================
function openModal(modalHTML) {
    modalContent.innerHTML = modalHTML;
    modalBackdrop.style.display = 'flex';
}

function closeModal() {
    modalBackdrop.style.display = 'none';
    modalContent.innerHTML = '';
}

function renderStudentModal(type, studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    if (type === 'edit') {
        const branches = [...Array.from(new Set(state.students.map(s => s.branch)))];
        const statuses = ['Active', 'Inactive', 'Graduated', 'On Leave'];
        openModal(`
            <div class="modal-header"><h3>Edit Student: ${student.name}</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div>
            <div class="modal-body">
                <div class="form-group"><label>Name</label><input id="student-name" type="text" class="form-control" value="${student.name}"></div>
                <div class="form-group"><label>Email</label><input id="student-email" type="email" class="form-control" value="${student.email}"></div>
                <div class="form-group"><label>Branch</label><select id="student-branch" class="form-control">${branches.map(b => `<option value="${b}" ${student.branch === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
                <div class="form-group"><label>Year</label><input id="student-year" type="number" class="form-control" value="${student.year}"></div>
                <div class="form-group"><label>Status</label><select id="student-status" class="form-control">${statuses.map(s => `<option value="${s}" ${student.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
            </div>
            <div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button primary" data-action="save-student-changes" data-student-id="${student.id}">Save Changes</button></div>
        `);
    } else if (type === 'delete') {
        openModal(`
            <div class="modal-header"><h3>Confirm Deletion</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div>
            <div class="modal-body"><p>Are you sure you want to delete the student "${student.name}" (ID: ${student.studentId})?</p></div>
            <div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button danger" data-action="confirm-delete-student" data-student-id="${student.id}">Delete Student</button></div>
        `);
    }
}

function renderHostelModal(studentId) {
    const student = state.studentHostelData.find(s => s.id === studentId);
    if (!student) return;

    openModal(`
        <div class="modal-header"><h3>Allocate Room for ${student.name}</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div>
        <div class="modal-body">
            <div class="form-group"><label for="hostel-select">Hostel</label><select id="hostel-select" class="form-control">${HOSTEL_DATA.map(h => `<option value="${h.name}" ${student.hostel === h.name ? 'selected' : ''}>${h.name}</option>`).join('')}</select></div>
            <div class="form-group"><label for="room-number-input">Room Number</label><input id="room-number-input" type="text" class="form-control" placeholder="e.g., A-101" value="${student.roomNumber || ''}"></div>
        </div>
        <div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button primary" data-action="save-hostel-allocation" data-student-id="${student.id}">Save Changes</button></div>
    `);
}

function renderLibraryModal(type, bookId = null) {
    const book = bookId ? state.books.find(b => b.id === bookId) : null;
    let modalHTML = '';

    switch (type) {
        case 'add':
            modalHTML = `<div class="modal-header"><h3>Add New Book</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div><div class="modal-body"><div class="form-group"><label>Title</label><input id="new-book-title" type="text" class="form-control" /></div><div class="form-group"><label>Author</label><input id="new-book-author" type="text" class="form-control" /></div><div class="form-group"><label>ISBN</label><input id="new-book-isbn" type="text" class="form-control" /></div></div><div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button primary" data-action="add-book">Add Book</button></div>`;
            break;
        case 'remove':
            if (!book) return;
            modalHTML = `<div class="modal-header"><h3>Confirm Removal</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div><div class="modal-body"><p>Are you sure you want to remove "${book.title}" from the catalog?</p></div><div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button danger" data-action="remove-book" data-book-id="${book.id}">Remove</button></div>`;
            break;
        case 'checkout':
            if (!book) return;
            modalHTML = `<div class="modal-header"><h3>Check Out Book</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div><div class="modal-body"><p>Checking out: <strong>${book.title}</strong></p><div class="form-group"><label>Student ID</label><input id="checkout-student-id" type="text" class="form-control" placeholder="e.g., STU001" /></div></div><div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button primary" data-action="confirm-checkout" data-book-id="${book.id}">Confirm Checkout</button></div>`;
            break;
        case 'checkin':
            if (!book) return;
            modalHTML = `<div class="modal-header"><h3>Check In Book</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div><div class="modal-body"><p>Checking in: <strong>${book.title}</strong></p>${book.status === 'Overdue' ? `<div class="fine-alert"><strong>Fine Due: ${formatCurrency(calculateFine(book.dueDate))}</strong></div>` : ''}</div><div class="modal-footer"><button class="action-button" data-action="close-modal">Cancel</button><button class="action-button primary" data-action="confirm-checkin" data-book-id="${book.id}">Confirm Check In</button></div>`;
            break;
    }
    openModal(modalHTML);
}

function renderAnnouncementModal(announcementId) {
    const announcement = state.announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    openModal(`
        <div class="modal-header"><h3>Confirm Deletion</h3><button class="modal-close-btn" data-action="close-modal">&times;</button></div>
        <div class="modal-body"><p>Are you sure you want to delete this announcement?</p></div>
        <div class="modal-footer">
            <button class="action-button" data-action="close-modal">Cancel</button>
            <button class="action-button danger" data-action="confirm-delete-announcement" data-announcement-id="${announcement.id}">Delete</button>
        </div>
    `);
}


// =================================================================================
// 6. EVENT HANDLERS & INITIALIZATION
// =================================================================================
function handleSidebarClick(event) {
    const navItem = event.target.closest('.nav-item');
    if (navItem) {
        state.currentView = navItem.dataset.view;
        renderApp();
    }
}

async function handleContentInteraction(event) {
    const target = event.target;
    const action = target.dataset.action;
    const studentId = target.dataset.studentId;
    const bookId = target.dataset.bookId;
    const announcementId = target.dataset.announcementId;

    if (action === 'edit-student' || action === 'delete-student') {
        renderStudentModal(action.split('-')[0], studentId);
    }
    if (action === 'open-hostel-modal') {
        renderHostelModal(studentId);
    }
    if (action === 'open-library-modal') {
        renderLibraryModal(target.dataset.modalType, bookId);
    }
    if (action === 'delete-announcement') {
        renderAnnouncementModal(announcementId);
    }
    
    // Announcement Actions
    if (action === 'post-announcement') {
        const textArea = document.getElementById('announcement-text');
        const message = textArea.value.trim();
        if (message) {
            const newAnnouncement = await apiRequest('POST', '/announcements', { message });
            state.announcements.push({ ...newAnnouncement, id: newAnnouncement._id });
            renderAnnouncements();
        } else {
            alert('Please enter a message for the announcement.');
        }
    }

    const sortHeader = target.closest('[data-sort-key]');
    if (sortHeader) {
        const key = sortHeader.dataset.sortKey;
        const currentSort = state.financial.sortConfig;
        const direction = (currentSort.key === key && currentSort.direction === 'asc') ? 'desc' : 'asc';
        state.financial.sortConfig = { key, direction };
        renderFinancial();
    }
}

async function handleModalInteraction(event) {
    const target = event.target;
    const action = target.dataset.action;
    if (!action) return;

    const studentId = target.dataset.studentId;
    const bookId = target.dataset.bookId;
    const announcementId = target.dataset.announcementId;

    if (action === 'close-modal') return closeModal();

    // Student Info Actions
    if (action === 'save-student-changes') {
        const student = state.students.find(s => s.id === studentId);
        const updatedData = {
            ...student, // Send all existing data to prevent fields from being erased
            name: document.getElementById('student-name').value,
            email: document.getElementById('student-email').value,
            branch: document.getElementById('student-branch').value,
            year: parseInt(document.getElementById('student-year').value, 10),
            status: document.getElementById('student-status').value,
        };
        const updatedStudent = await apiRequest('PUT', `/students/${studentId}`, updatedData);
        state.students = state.students.map(s => s.id === studentId ? {...updatedStudent, id: updatedStudent._id} : s);
        state.studentHostelData = state.students;
        closeModal();
        renderStudentInfo();
    }
    if (action === 'confirm-delete-student') {
        await apiRequest('DELETE', `/students/${studentId}`);
        state.students = state.students.filter(s => s.id !== studentId);
        state.studentHostelData = state.students;
        closeModal();
        renderStudentInfo();
    }
    if (action === 'confirm-delete-announcement') {
        await apiRequest('DELETE', `/announcements/${announcementId}`);
        state.announcements = state.announcements.filter(a => a.id !== announcementId);
        closeModal();
        renderAnnouncements();
    }

    // Hostel Actions
    if (action === 'save-hostel-allocation') {
        const student = state.students.find(s => s.id === studentId);
        const hostelData = {
            ...student,
            hostel: document.getElementById('hostel-select').value,
            roomNumber: document.getElementById('room-number-input').value,
        };
        const updatedStudent = await apiRequest('PUT', `/students/${studentId}`, hostelData);
        state.students = state.students.map(s => s.id === studentId ? {...updatedStudent, id: updatedStudent._id} : s);
        state.studentHostelData = state.students;
        closeModal();
        renderHostel();
    }

    // Library Actions
    if (action === 'add-book') {
        const data = {
            title: document.getElementById('new-book-title').value,
            author: document.getElementById('new-book-author').value,
            isbn: document.getElementById('new-book-isbn').value,
        };
        if (data.title && data.author && data.isbn) {
            const newBook = await apiRequest('POST', '/library', data);
            state.books.push({...newBook, id: newBook._id});
            closeModal();
            renderLibrary();
        }
    }
    if (action === 'remove-book') {
        await apiRequest('DELETE', `/library/${bookId}`);
        state.books = state.books.filter(b => b.id !== bookId);
        closeModal();
        renderLibrary();
    }
    if (action === 'confirm-checkout') {
        const checkoutStudentId = document.getElementById('checkout-student-id').value;
        if (checkoutStudentId && state.students.some(s => s.studentId === checkoutStudentId)) {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14);
            const data = { status: 'Checked Out', checkedOutBy: checkoutStudentId, dueDate: dueDate.toISOString() };
            const updatedBook = await apiRequest('PUT', `/library/${bookId}`, data);
            state.books = state.books.map(b => b.id === bookId ? {...updatedBook, id: updatedBook._id} : b);
            closeModal();
            renderLibrary();
        } else {
            alert('Invalid Student ID. Please enter a valid ID.');
        }
    }
    if (action === 'confirm-checkin') {
        const data = { status: 'Available', checkedOutBy: null, dueDate: null };
        const updatedBook = await apiRequest('PUT', `/library/${bookId}`, data);
        state.books = state.books.map(b => b.id === bookId ? {...updatedBook, id: updatedBook._id} : b);
        closeModal();
        renderLibrary();
    }
}

function handleFilterChange(event) {
    const { view, filter } = event.target.dataset;
    if (view && filter) {
        state[view][filter] = event.target.value;
        renderApp();
    }
}

// --- App Initialization ---
async function initializeApp() {
    contentArea.innerHTML = '<h2>Loading University Data...</h2>';

    const [admissions, students, financials, books, announcements] = await Promise.all([
        apiRequest('GET', '/admissions'),
        apiRequest('GET', '/students'),
        apiRequest('GET', '/financials'),
        apiRequest('GET', '/library'),
        apiRequest('GET', '/announcements')
    ]);

    state.applications = admissions.map(a => ({...a, id: a._id}));
    state.students = students.map(s => ({...s, id: s._id}));
    state.transactions = financials.map(t => ({...t, id: t._id}));
    state.books = books.map(b => ({...b, id: b._id}));
    state.announcements = announcements.map(a => ({...a, id: a._id}));
    state.studentHostelData = state.students;

    renderSidebar();
    renderApp();

    sidebarNavList.addEventListener('click', handleSidebarClick);
    contentArea.addEventListener('click', handleContentInteraction);
    modalBackdrop.addEventListener('click', handleModalInteraction);
    contentArea.addEventListener('input', handleFilterChange);
    contentArea.addEventListener('change', handleFilterChange);
}

document.addEventListener('DOMContentLoaded', initializeApp);