/**
 * Modern Portal Enhancements - Phase 1
 * Add interactive charts, dark mode, animations, and modern UI elements
 */

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeModernFeatures();
});

function initializeModernFeatures() {
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize AOS animations if library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Initialize FAB if needed - check if user is logged in (optional)
    const userRole = localStorage.getItem('user_role');
    if (userRole) {
        initializeFAB();
    }
    
    // Add number counting animation to stats
    animateStatNumbers();
    
    // Initialize tooltips
    initializeTooltips();
}

// =====================================================
// DARK MODE
// =====================================================

function initializeDarkMode() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.onclick = toggleDarkMode;
    
    document.body.appendChild(themeToggle);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portal_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('portal_theme', isDark ? 'dark' : 'light');
    
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    
    // Animate the toggle
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
    
    // Show feedback
    showModernToast(
        isDark ? 'Dark mode enabled' : 'Light mode enabled',
        'success'
    );
}

// =====================================================
// INTERACTIVE CHARTS
// =====================================================

// Create performance trend chart
function createPerformanceTrendChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels || ['Term 1', 'Term 2', 'Term 3'],
            datasets: [{
                label: 'Your Performance',
                data: data.studentScores || [75, 80, 85],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Class Average',
                data: data.classAverage || [72, 75, 78],
                borderColor: '#f56565',
                backgroundColor: 'rgba(245, 101, 101, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '📈 Performance Trend',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    borderRadius: 8,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Create attendance pie chart
function createAttendancePieChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Late', 'Excused'],
            datasets: [{
                data: data || [85, 5, 7, 3],
                backgroundColor: [
                    '#059669',
                    '#dc2626',
                    '#f59e0b',
                    '#0891b2'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '📊 Attendance Distribution',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: `${label}: ${percentage}%`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} days (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Create subject comparison bar chart
function createSubjectComparisonChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.subjects || ['Math', 'English', 'Science', 'History', 'Geography'],
            datasets: [{
                label: 'Your Scores',
                data: data.scores || [85, 78, 92, 75, 80],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(245, 101, 101, 0.8)',
                    'rgba(5, 150, 105, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(8, 145, 178, 0.8)'
                ],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '📚 Subject Performance Comparison',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Create progress radar chart
function createProgressRadarChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.labels || ['Attendance', 'Participation', 'Homework', 'Exams', 'Behavior'],
            datasets: [{
                label: 'Current Performance',
                data: data.current || [95, 85, 90, 88, 92],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#667eea',
                borderWidth: 2
            }, {
                label: 'Target',
                data: data.target || [100, 90, 95, 95, 95],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                pointBackgroundColor: '#059669',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#059669',
                borderWidth: 2,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '🎯 Overall Progress',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: {
                    position: 'bottom',
                    labels: { padding: 15 }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// =====================================================
// MODERN TOAST NOTIFICATIONS
// =====================================================

function showModernToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type} slide-up`;
    
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// =====================================================
// RIPPLE EFFECT FOR BUTTONS
// =====================================================

function addRippleEffect() {
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button, .btn, .ripple-button');
        if (!button) return;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// =====================================================
// FLOATING ACTION BUTTON (FAB)
// =====================================================

function initializeFAB() {
    // Check if FAB should be shown (based on user role)
    const userRole = localStorage.getItem('user_role');
    if (!userRole) return;
    
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-container';
    fabContainer.id = 'fabContainer';
    
    fabContainer.innerHTML = `
        <button class="fab-main" onclick="toggleFAB()" aria-label="Quick actions">
            <i class="fas fa-plus"></i>
        </button>
        <div class="fab-menu">
            ${getFABMenuItems(userRole)}
        </div>
    `;
    
    document.body.appendChild(fabContainer);
}

function getFABMenuItems(role) {
    const menuItems = {
        student: `
            <button class="fab-item" onclick="quickSubmitAssignment()" title="Submit Assignment">
                <i class="fas fa-file-upload"></i>
            </button>
            <button class="fab-item" onclick="quickViewTimetable()" title="View Timetable">
                <i class="fas fa-calendar"></i>
            </button>
            <button class="fab-item" onclick="quickCheckResults()" title="Check Results">
                <i class="fas fa-chart-line"></i>
            </button>
        `,
        parent: `
            <button class="fab-item" onclick="quickPayFees()" title="Pay Fees">
                <i class="fas fa-money-bill"></i>
            </button>
            <button class="fab-item" onclick="quickMessageTeacher()" title="Message Teacher">
                <i class="fas fa-envelope"></i>
            </button>
            <button class="fab-item" onclick="quickViewChildren()" title="View Children">
                <i class="fas fa-users"></i>
            </button>
        `,
        teacher: `
            <button class="fab-item" onclick="quickMarkAttendance()" title="Mark Attendance">
                <i class="fas fa-check-square"></i>
            </button>
            <button class="fab-item" onclick="quickCreateAssignment()" title="Create Assignment">
                <i class="fas fa-plus-circle"></i>
            </button>
            <button class="fab-item" onclick="quickMessageParents()" title="Message Parents">
                <i class="fas fa-comment"></i>
            </button>
        `,
        admin: `
            <button class="fab-item" onclick="quickAddUser()" title="Add User">
                <i class="fas fa-user-plus"></i>
            </button>
            <button class="fab-item" onclick="quickGenerateReport()" title="Generate Report">
                <i class="fas fa-file-alt"></i>
            </button>
            <button class="fab-item" onclick="quickViewAnalytics()" title="View Analytics">
                <i class="fas fa-chart-bar"></i>
            </button>
        `
    };
    
    return menuItems[role] || '';
}

function toggleFAB() {
    const fabContainer = document.getElementById('fabContainer');
    if (fabContainer) {
        fabContainer.classList.toggle('active');
    }
}

// =====================================================
// ANIMATED NUMBER COUNTER
// =====================================================

function animateStatNumbers() {
    const statValues = document.querySelectorAll('.stat-value, .stat-value-enhanced');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statValues.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(number)) return;
    
    const suffix = text.replace(/[0-9.]/g, '');
    const duration = 1000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, duration / steps);
}

// =====================================================
// SKELETON LOADING
// =====================================================

function showSkeletonLoading(containerId, type = 'card') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const skeletonTemplates = {
        card: `
            <div class="skeleton-card">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-button"></div>
            </div>
        `,
        table: `
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                ${Array(5).fill('<div class="skeleton skeleton-text"></div>').join('')}
            </div>
        `,
        list: `
            <div class="skeleton-card">
                ${Array(3).fill(`
                    <div style="margin-bottom: 15px;">
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text short"></div>
                    </div>
                `).join('')}
            </div>
        `
    };
    
    container.innerHTML = skeletonTemplates[type] || skeletonTemplates.card;
}

function hideSkeletonLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Fade out skeleton
    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = '';
        container.style.opacity = '1';
    }, 300);
}

// =====================================================
// MODERN TOOLTIPS
// =====================================================

function initializeTooltips() {
    const elementsWithTitle = document.querySelectorAll('[title]');
    
    elementsWithTitle.forEach(element => {
        const title = element.getAttribute('title');
        if (!title) return;
        
        element.removeAttribute('title');
        element.setAttribute('data-tooltip', title);
        
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    if (!text) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'modern-tooltip';
    tooltip.textContent = text;
    tooltip.id = 'activeTooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('activeTooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Add tooltip styles
const tooltipStyles = `
<style>
.modern-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    z-index: 10000;
    pointer-events: none;
    animation: fadeIn 0.2s ease;
    white-space: nowrap;
}

.modern-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
}
</style>
`;

if (!document.querySelector('#tooltip-styles')) {
    const styleEl = document.createElement('div');
    styleEl.id = 'tooltip-styles';
    styleEl.innerHTML = tooltipStyles;
    document.head.appendChild(styleEl);
}

// =====================================================
// PROGRESS BARS WITH ANIMATION
// =====================================================

function createAnimatedProgressBar(percentage, color = '#667eea') {
    return `
        <div class="progress-container">
            <div class="progress-bar-animated" 
                 style="width: 0%; background: linear-gradient(90deg, ${color}, ${adjustColor(color, 20)});"
                 data-target="${percentage}">
            </div>
        </div>
    `;
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target');
                setTimeout(() => {
                    entry.target.style.width = target + '%';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Helper: Adjust color brightness
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
}

// =====================================================
// ENHANCED MODALS (If using SweetAlert2)
// =====================================================

function showModernAlert(title, message, icon = 'info') {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonColor: '#667eea',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {
        // Fallback to regular alert
        alert(title + '\n' + message);
    }
}

function showModernConfirm(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#dc2626',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            }
        });
    } else {
        // Fallback to confirm
        return Promise.resolve({ isConfirmed: confirm(title + '\n' + message) });
    }
}

function showModernSuccess(message, duration = 2000) {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message,
            showConfirmButton: false,
            timer: duration,
            toast: true,
            position: 'top-end',
            timerProgressBar: true
        });
    } else {
        showModernToast(message, 'success', duration);
    }
}

function showModernError(message) {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            confirmButtonColor: '#667eea'
        });
    } else {
        showModernToast(message, 'error', 4000);
    }
}

// =====================================================
// LOADING OVERLAY (Enhanced)
// =====================================================

function showModernLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'modern-loading-overlay';
    overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: white;
                padding: 40px 60px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: zoomIn 0.3s ease;
            ">
                <div class="loader-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <p style="margin: 20px 0 0 0; font-size: 1.2rem; color: #374151; font-weight: 600;">
                    ${message}
                </p>
            </div>
        </div>
    `;
    
    // Add loader styles if not exist
    if (!document.querySelector('#loader-styles')) {
        const loaderStyles = document.createElement('style');
        loaderStyles.id = 'loader-styles';
        loaderStyles.textContent = `
            .loader-dots {
                display: flex;
                gap: 12px;
                justify-content: center;
            }
            .loader-dots .dot {
                width: 14px;
                height: 14px;
                background: #667eea;
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
            }
            .loader-dots .dot:nth-child(1) { animation-delay: -0.32s; }
            .loader-dots .dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(loaderStyles);
    }
    
    document.body.appendChild(overlay);
}

function hideModernLoading() {
    const overlay = document.getElementById('modern-loading-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Copy to clipboard with feedback
async function copyToClipboard(text, feedbackMessage = 'Copied to clipboard!') {
    try {
        await navigator.clipboard.writeText(text);
        showModernToast(feedbackMessage, 'success');
    } catch (err) {
        console.error('Failed to copy:', err);
        showModernToast('Failed to copy', 'error');
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate percentage
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
}

// =====================================================
// QUICK ACTION HANDLERS (Placeholders)
// =====================================================

function quickSubmitAssignment() {
    toggleFAB();
    const assignmentSection = document.querySelector('[data-section="assignments"]');
    if (assignmentSection) {
        assignmentSection.click();
    }
    showModernToast('Opening assignments...', 'info');
}

function quickViewTimetable() {
    toggleFAB();
    const timetableSection = document.querySelector('[data-section="timetable"]');
    if (timetableSection) {
        timetableSection.click();
    }
}

function quickCheckResults() {
    toggleFAB();
    const resultsSection = document.querySelector('[data-section="results"]');
    if (resultsSection) {
        resultsSection.click();
    }
}

function quickPayFees() {
    toggleFAB();
    const feesSection = document.querySelector('[data-section="fees"]');
    if (feesSection) {
        feesSection.click();
    }
}

function quickMessageTeacher() {
    toggleFAB();
    const communicationSection = document.querySelector('[data-section="communication"]');
    if (communicationSection) {
        communicationSection.click();
    }
}

function quickViewChildren() {
    toggleFAB();
    const childrenSection = document.querySelector('[data-section="children"]');
    if (childrenSection) {
        childrenSection.click();
    }
}

function quickMarkAttendance() {
    toggleFAB();
    showModernToast('Opening attendance...', 'info');
}

function quickCreateAssignment() {
    toggleFAB();
    showModernToast('Opening assignment creator...', 'info');
}

function quickMessageParents() {
    toggleFAB();
    showModernToast('Opening messaging...', 'info');
}

function quickAddUser() {
    toggleFAB();
    showModernToast('Opening user management...', 'info');
}

function quickGenerateReport() {
    toggleFAB();
    window.location.href = 'class-results-generator.html';
}

function quickViewAnalytics() {
    toggleFAB();
    showModernToast('Opening analytics...', 'info');
}

// =====================================================
// INITIALIZE PROGRESS BARS ON LOAD
// =====================================================

window.addEventListener('load', () => {
    animateProgressBars();
});

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

// Make functions available globally
window.ModernEnhancements = {
    showToast: showModernToast,
    showAlert: showModernAlert,
    showConfirm: showModernConfirm,
    showSuccess: showModernSuccess,
    showError: showModernError,
    showLoading: showModernLoading,
    hideLoading: hideModernLoading,
    createPerformanceChart: createPerformanceTrendChart,
    createAttendanceChart: createAttendancePieChart,
    createSubjectChart: createSubjectComparisonChart,
    createRadarChart: createProgressRadarChart,
    createProgressBar: createAnimatedProgressBar,
    toggleDarkMode: toggleDarkMode
};

console.log('✨ Modern Enhancements initialized successfully!');

