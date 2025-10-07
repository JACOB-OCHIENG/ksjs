// Enrollment Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enrollmentForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    let currentStep = 1;
    const totalSteps = 4;

    // Initialize form
    initEnrollmentForm();

    function initEnrollmentForm() {
        // Step navigation
        nextBtn.addEventListener('click', nextStep);
        prevBtn.addEventListener('click', prevStep);
        
        // Form submission
        form.addEventListener('submit', handleFormSubmission);
        
        // File upload handling
        initFileUploads();
        
        // Form validation
        initFormValidation();
        
        // Update progress indicator
        updateProgressIndicator();
    }

    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                updateProgressIndicator();
                updateNavigationButtons();
            }
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgressIndicator();
            updateNavigationButtons();
        }
    }

    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index + 1 === step);
        });
        
        // Update review section if on step 4
        if (step === 4) {
            updateReviewSection();
        }
    }

    function updateProgressIndicator() {
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 <= currentStep);
            step.classList.toggle('completed', index + 1 < currentStep);
        });
    }

    function updateNavigationButtons() {
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(field);
            }

            // Additional validation
            if (field.type === 'email' && field.value) {
                if (!isValidEmail(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            if (field.type === 'tel' && field.value) {
                if (!isValidPhone(field.value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            }

            if (field.type === 'date' && field.value) {
                if (!isValidDate(field.value)) {
                    showFieldError(field, 'Please enter a valid date');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^(\+254|0)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function isValidDate(date) {
        const inputDate = new Date(date);
        const today = new Date();
        return inputDate < today;
    }

    function initFileUploads() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', handleFileUpload);
            
            // Drag and drop functionality
            const uploadArea = input.closest('.file-upload-area');
            if (uploadArea) {
                uploadArea.addEventListener('dragover', handleDragOver);
                uploadArea.addEventListener('dragleave', handleDragLeave);
                uploadArea.addEventListener('drop', handleDrop);
                uploadArea.addEventListener('click', () => input.click());
            }
        });
    }

    function handleFileUpload(event) {
        const input = event.target;
        const files = Array.from(input.files);
        const previewContainer = document.getElementById(input.id + 'Preview');
        
        if (files.length > 0) {
            previewContainer.innerHTML = '';
            files.forEach(file => {
                if (validateFile(file)) {
                    displayFilePreview(file, previewContainer);
                } else {
                    showNotification('Invalid file type or size for ' + file.name, 'error');
                }
            });
        }
    }

    function validateFile(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        
        if (file.size > maxSize) {
            showNotification('File size must be less than 5MB', 'error');
            return false;
        }
        
        if (!allowedTypes.includes(file.type)) {
            showNotification('Only PDF, JPG, and PNG files are allowed', 'error');
            return false;
        }
        
        return true;
    }

    function displayFilePreview(file, container) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'file-preview-item';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.className = 'preview-image';
            previewDiv.appendChild(img);
        } else {
            previewDiv.innerHTML = `
                <div class="file-icon">📄</div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            `;
        }
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file-btn';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = () => {
            previewDiv.remove();
            updateFileInput(file.name);
        };
        
        previewDiv.appendChild(removeBtn);
        container.appendChild(previewDiv);
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('drag-over');
    }

    function handleDragLeave(event) {
        event.currentTarget.classList.remove('drag-over');
    }

    function handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
        
        const files = Array.from(event.dataTransfer.files);
        const input = event.currentTarget.querySelector('input[type="file"]');
        
        if (files.length > 0) {
            input.files = event.dataTransfer.files;
            handleFileUpload({ target: input });
        }
    }

    function initFormValidation() {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    showFieldError(input, 'This field is required');
                } else {
                    clearFieldError(input);
                }
            });
        });
    }

    function updateReviewSection() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Student Information Review
        const studentReview = document.getElementById('studentReview');
        studentReview.innerHTML = `
            <p><strong>Name:</strong> ${data.studentFirstName} ${data.studentMiddleName || ''} ${data.studentLastName}</p>
            <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Applying for:</strong> ${data.applyingFor}</p>
            <p><strong>Previous School:</strong> ${data.previousSchool || 'N/A'}</p>
            <p><strong>Medical Conditions:</strong> ${data.medicalConditions || 'None'}</p>
        `;
        
        // Parent Information Review
        const parentReview = document.getElementById('parentReview');
        parentReview.innerHTML = `
            <p><strong>Name:</strong> ${data.parentFirstName} ${data.parentLastName}</p>
            <p><strong>Relationship:</strong> ${data.parentRelationship}</p>
            <p><strong>Phone:</strong> ${data.parentPhone}</p>
            <p><strong>Email:</strong> ${data.parentEmail}</p>
            <p><strong>Occupation:</strong> ${data.parentOccupation || 'N/A'}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            ${data.secondaryContactName ? `<p><strong>Secondary Contact:</strong> ${data.secondaryContactName} (${data.secondaryContactPhone})</p>` : ''}
        `;
        
        // Documents Review
        const documentsReview = document.getElementById('documentsReview');
        const fileInputs = form.querySelectorAll('input[type="file"]');
        let documentsList = '';
        
        fileInputs.forEach(input => {
            if (input.files.length > 0) {
                const files = Array.from(input.files);
                files.forEach(file => {
                    documentsList += `<p>• ${input.name}: ${file.name}</p>`;
                });
            }
        });
        
        documentsReview.innerHTML = documentsList || '<p>No documents uploaded</p>';
    }

    async function handleFormSubmission(event) {
        event.preventDefault();
        
        if (!validateCurrentStep()) {
            showNotification('Please complete all required fields', 'error');
            return;
        }
        
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(form);
            const applicationRef = generateApplicationRef();
            formData.append('applicationRef', applicationRef);
            
            // Simulate API call (replace with actual endpoint)
            const response = await submitApplication(formData);
            
            if (response.success) {
                showSuccessModal(applicationRef);
                form.reset();
                resetForm();
            } else {
                throw new Error(response.message || 'Submission failed');
            }
        } catch (error) {
            showNotification('Failed to submit application: ' + error.message, 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async function submitApplication(formData) {
        // Save application to database (localStorage simulation)
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    // Generate application reference
                    const applicationRef = generateApplicationRef();
                    
                    // Convert FormData to object
                    const data = Object.fromEntries(formData.entries());
                    data.applicationRef = applicationRef;
                    data.submissionDate = new Date().toISOString();
                    data.status = 'new';
                    
                    // Handle file uploads
                    const files = {};
                    for (let [key, value] of formData.entries()) {
                        if (value instanceof File) {
                            // Convert file to base64 for storage
                            const reader = new FileReader();
                            reader.onload = function() {
                                files[key] = {
                                    name: value.name,
                                    type: value.type,
                                    size: value.size,
                                    data: reader.result
                                };
                            };
                            reader.readAsDataURL(value);
                        }
                    }
                    data.files = files;
                    
                    // Save to localStorage (simulating database)
                    const applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
                    applications.push(data);
                    localStorage.setItem('schoolApplications', JSON.stringify(applications));
                    
                    // Send notification to admin dashboard
                    notifyAdminDashboard(data);
                    
                    // Send acknowledgment notification to parent
                    sendApplicationReceivedNotification(data);
                    
                    resolve({ success: true, applicationRef });
                } catch (error) {
                    resolve({ success: false, message: error.message });
                }
            }, 1000);
        });
    }

    function notifyAdminDashboard(applicationData) {
        // Update admin dashboard with new application notification
        const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
        adminNotifications.push({
            type: 'new_application',
            message: `New application from ${applicationData.studentFirstName} ${applicationData.studentLastName}`,
            applicationRef: applicationData.applicationRef,
            timestamp: new Date().toISOString(),
            read: false
        });
        localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));
        
        // Trigger admin dashboard update if it's open
        if (window.updateAdminDashboard) {
            window.updateAdminDashboard();
        }
    }

    function sendApplicationReceivedNotification(applicationData) {
        const parentName = `${applicationData.parentFirstName} ${applicationData.parentLastName}`;
        const studentName = `${applicationData.studentFirstName} ${applicationData.studentLastName}`;
        const grade = applicationData.applyingFor;
        const parentEmail = applicationData.parentEmail;
        const parentPhone = applicationData.parentPhone;
        
        // Email template
        const emailTemplate = {
            subject: `Application Received – King Solomon Junior Primary School`,
            body: `Dear ${parentName},

We have received your application for **${studentName}**, applying for Grade **${grade}**. Our admissions team will review the application and notify you of the next steps.

Thank you for considering King Solomon Junior Primary School.

Regards,
Admissions Office
King Solomon Junior Primary School`
        };
        
        // SMS template
        const smsTemplate = `Dear ${parentName}, we have received your application for ${studentName}, Grade ${grade}. You will be notified once it is reviewed. – King Solomon Junior`;
        
        // Send notifications (simulated)
        console.log('📧 APPLICATION RECEIVED EMAIL:');
        console.log('To:', parentEmail);
        console.log('Subject:', emailTemplate.subject);
        console.log('Body:', emailTemplate.body);
        console.log('---');
        
        console.log('📱 APPLICATION RECEIVED SMS:');
        console.log('To:', parentPhone);
        console.log('Message:', smsTemplate);
        console.log('---');
        
        // Store in notification logs
        const emailLog = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
        emailLog.push({
            to: parentEmail,
            subject: emailTemplate.subject,
            body: emailTemplate.body,
            timestamp: new Date().toISOString(),
            status: 'sent',
            type: 'application_received'
        });
        localStorage.setItem('emailNotifications', JSON.stringify(emailLog));
        
        const smsLog = JSON.parse(localStorage.getItem('smsNotifications') || '[]');
        smsLog.push({
            to: parentPhone,
            message: smsTemplate,
            timestamp: new Date().toISOString(),
            status: 'sent',
            type: 'application_received'
        });
        localStorage.setItem('smsNotifications', JSON.stringify(smsLog));
    }

    function sendEmailToManagement(formData) {
        // This would integrate with an email service like EmailJS, SendGrid, or a backend API
        const data = Object.fromEntries(formData.entries());
        
        const emailData = {
            to: 'admissions@kingsolomonjunior.ac.ke, principal@kingsolomonjunior.ac.ke',
            subject: `New Enrollment Application - ${data.studentFirstName} ${data.studentLastName}`,
            html: generateEmailTemplate(data, formData)
        };
        
        // Log for demonstration (replace with actual email service)
        console.log('Email would be sent to management:', emailData);
        
        // In a real implementation, you would use:
        // - EmailJS for client-side email sending
        // - A backend API endpoint
        // - A service like SendGrid, Mailgun, etc.
    }

    function generateEmailTemplate(data, formData) {
        return `
            <h2>New Enrollment Application</h2>
            <h3>Student Information</h3>
            <p><strong>Name:</strong> ${data.studentFirstName} ${data.studentMiddleName || ''} ${data.studentLastName}</p>
            <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Applying for:</strong> ${data.applyingFor}</p>
            <p><strong>Previous School:</strong> ${data.previousSchool || 'N/A'}</p>
            
            <h3>Parent/Guardian Information</h3>
            <p><strong>Name:</strong> ${data.parentFirstName} ${data.parentLastName}</p>
            <p><strong>Relationship:</strong> ${data.parentRelationship}</p>
            <p><strong>Phone:</strong> ${data.parentPhone}</p>
            <p><strong>Email:</strong> ${data.parentEmail}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            
            <h3>Application Reference:</h3>
            <p><strong>${data.applicationRef}</strong></p>
            
            <p>Please review the attached documents and contact the family to schedule an interview.</p>
        `;
    }

    function generateApplicationRef() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `KSJ-${timestamp}-${random}`.toUpperCase();
    }

    function showSuccessModal(applicationRef) {
        document.getElementById('applicationRef').textContent = applicationRef;
        document.getElementById('successModal').style.display = 'block';
    }

    function closeSuccessModal() {
        document.getElementById('successModal').style.display = 'none';
    }

    function resetForm() {
        currentStep = 1;
        showStep(currentStep);
        updateProgressIndicator();
        updateNavigationButtons();
        
        // Clear all file previews
        document.querySelectorAll('.file-preview').forEach(preview => {
            preview.innerHTML = '';
        });
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Make functions globally available
    window.closeSuccessModal = closeSuccessModal;
});

// EmailJS Integration (Optional - for actual email sending)
// Uncomment and configure if using EmailJS
/*
function initEmailJS() {
    emailjs.init("YOUR_PUBLIC_KEY");
}

async function sendEmailViaEmailJS(formData) {
    const data = Object.fromEntries(formData.entries());
    
    const templateParams = {
        to_email: 'admissions@kingsolomonjunior.ac.ke',
        student_name: `${data.studentFirstName} ${data.studentLastName}`,
        parent_name: `${data.parentFirstName} ${data.parentLastName}`,
        parent_email: data.parentEmail,
        parent_phone: data.parentPhone,
        applying_for: data.applyingFor,
        application_ref: data.applicationRef,
        message: generateEmailTemplate(data, formData)
    };
    
    try {
        const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        return { success: true, response };
    } catch (error) {
        throw new Error('Failed to send email: ' + error.text);
    }
}
*/
