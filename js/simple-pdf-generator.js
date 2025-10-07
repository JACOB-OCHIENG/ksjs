// Simple PDF Generator - Fallback for when jsPDF fails
// This creates a downloadable HTML file that can be saved as PDF

function downloadSimplePDFForm() {
    try {
        // Create HTML content for the PDF
        const htmlContent = createPDFHTML();
        
        // Create a blob with the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `King_Solomon_Junior_Application_Form_${new Date().getFullYear()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL
        URL.revokeObjectURL(url);
        
        // Show success message
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Form Downloaded!',
                text: 'The application form has been downloaded. You can open it in your browser and use "Print to PDF" to save as PDF.',
                icon: 'success',
                timer: 5000
            });
        } else {
            alert('The application form has been downloaded. You can open it in your browser and use "Print to PDF" to save as PDF.');
        }
        
        return { success: true };
        
    } catch (error) {
        console.error('Error creating simple PDF:', error);
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Error',
                text: 'Failed to download form. Please try the "View PDF Form" button instead.',
                icon: 'error'
            });
        } else {
            alert('Failed to download form. Please try the "View PDF Form" button instead.');
        }
        
        return { success: false, error: error.message };
    }
}

function createPDFHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>King Solomon Junior Primary School - Application Form</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #1e3a8a;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .school-name {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 0;
        }
        
        .school-tagline {
            font-size: 14px;
            color: #666;
            margin: 5px 0;
        }
        
        .school-details {
            font-size: 12px;
            color: #555;
            margin: 10px 0;
        }
        
        .form-title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 30px 0 20px;
            text-decoration: underline;
        }
        
        .section {
            margin-bottom: 25px;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 15px;
            border-bottom: 1px solid #1e3a8a;
            padding-bottom: 5px;
        }
        
        .form-row {
            display: flex;
            margin-bottom: 15px;
            gap: 20px;
        }
        
        .form-group {
            flex: 1;
            margin-bottom: 10px;
        }
        
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 12px;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 3px;
            font-size: 12px;
            box-sizing: border-box;
        }
        
        .form-group textarea {
            height: 60px;
            resize: vertical;
        }
        
        .required {
            color: red;
        }
        
        .checkbox-group {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .checkbox-group input[type="checkbox"] {
            margin-right: 8px;
        }
        
        .signature-section {
            margin-top: 30px;
            border-top: 2px solid #1e3a8a;
            padding-top: 20px;
        }
        
        .signature-line {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .signature-box {
            width: 200px;
            border-bottom: 1px solid #333;
            text-align: center;
            padding-bottom: 5px;
        }
        
        .date-box {
            width: 150px;
            border-bottom: 1px solid #333;
            text-align: center;
            padding-bottom: 5px;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        
        .instructions {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #1e3a8a;
            margin-bottom: 20px;
        }
        
        .instructions h3 {
            margin-top: 0;
            color: #1e3a8a;
        }
        
        .instructions ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .instructions li {
            margin-bottom: 5px;
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="school-name">King Solomon Junior Primary School</h1>
        <p class="school-tagline">Excellence in Education</p>
        <div class="school-details">
            <p><strong>Location:</strong> Koginga Road, Asego, Homa Bay County, Kenya</p>
            <p><strong>Phone:</strong> +254 720 456 789 | <strong>Email:</strong> info@kingsolomonjunior.ac.ke</p>
            <p><strong>Website:</strong> www.kingsolomonjunior.co.ke</p>
        </div>
    </div>

    <h2 class="form-title">STUDENT ADMISSION APPLICATION FORM</h2>

    <div class="instructions">
        <h3>Application Instructions:</h3>
        <ul>
            <li>Please fill out this form completely and legibly</li>
            <li>All fields marked with (*) are required</li>
            <li>Attach all required documents (birth certificate, passport photos, previous school reports)</li>
            <li>Submit the completed form to our school office or via email</li>
            <li>Applications are accepted year-round</li>
        </ul>
    </div>

    <!-- Student Information Section -->
    <div class="section">
        <h3 class="section-title">STUDENT INFORMATION</h3>
        
        <div class="form-row">
            <div class="form-group">
                <label for="firstName">First Name <span class="required">*</span></label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            <div class="form-group">
                <label for="middleName">Middle Name</label>
                <input type="text" id="middleName" name="middleName">
            </div>
            <div class="form-group">
                <label for="lastName">Last Name <span class="required">*</span></label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="dateOfBirth">Date of Birth <span class="required">*</span></label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" required>
            </div>
            <div class="form-group">
                <label for="gender">Gender <span class="required">*</span></label>
                <select id="gender" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="nationality">Nationality</label>
                <input type="text" id="nationality" name="nationality" value="Kenyan">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="applyingFor">Applying for Grade <span class="required">*</span></label>
                <select id="applyingFor" name="applyingFor" required>
                    <option value="">Select Grade</option>
                    <option value="Pre-Primary 1">Pre-Primary 1 (Age 3-4)</option>
                    <option value="Pre-Primary 2">Pre-Primary 2 (Age 4-5)</option>
                    <option value="Grade 1">Grade 1 (Age 5-6)</option>
                    <option value="Grade 2">Grade 2 (Age 6-7)</option>
                    <option value="Grade 3">Grade 3 (Age 7-8)</option>
                    <option value="Grade 4">Grade 4 (Age 8-9)</option>
                    <option value="Grade 5">Grade 5 (Age 9-10)</option>
                    <option value="Grade 6">Grade 6 (Age 10-11)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="previousSchool">Previous School (if any)</label>
                <input type="text" id="previousSchool" name="previousSchool">
            </div>
        </div>
        
        <div class="form-group">
            <label for="medicalConditions">Medical Conditions or Special Needs</label>
            <textarea id="medicalConditions" name="medicalConditions" placeholder="Please describe any medical conditions, allergies, or special needs..."></textarea>
        </div>
    </div>

    <!-- Parent/Guardian Information Section -->
    <div class="section">
        <h3 class="section-title">PARENT/GUARDIAN INFORMATION</h3>
        
        <div class="form-row">
            <div class="form-group">
                <label for="parentFirstName">Parent/Guardian First Name <span class="required">*</span></label>
                <input type="text" id="parentFirstName" name="parentFirstName" required>
            </div>
            <div class="form-group">
                <label for="parentLastName">Parent/Guardian Last Name <span class="required">*</span></label>
                <input type="text" id="parentLastName" name="parentLastName" required>
            </div>
            <div class="form-group">
                <label for="relationship">Relationship to Student <span class="required">*</span></label>
                <select id="relationship" name="relationship" required>
                    <option value="">Select Relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="parentPhone">Phone Number <span class="required">*</span></label>
                <input type="tel" id="parentPhone" name="parentPhone" placeholder="+254 700 000 000" required>
            </div>
            <div class="form-group">
                <label for="parentEmail">Email Address <span class="required">*</span></label>
                <input type="email" id="parentEmail" name="parentEmail" required>
            </div>
            <div class="form-group">
                <label for="occupation">Occupation</label>
                <input type="text" id="occupation" name="occupation">
            </div>
        </div>
        
        <div class="form-group">
            <label for="address">Home Address <span class="required">*</span></label>
            <textarea id="address" name="address" placeholder="Please provide your complete home address..." required></textarea>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="emergencyContact">Emergency Contact Name</label>
                <input type="text" id="emergencyContact" name="emergencyContact">
            </div>
            <div class="form-group">
                <label for="emergencyPhone">Emergency Contact Phone</label>
                <input type="tel" id="emergencyPhone" name="emergencyPhone">
            </div>
        </div>
    </div>

    <!-- Additional Information Section -->
    <div class="section">
        <h3 class="section-title">ADDITIONAL INFORMATION</h3>
        
        <div class="form-group">
            <label for="transportation">Transportation Method</label>
            <div class="checkbox-group">
                <input type="checkbox" id="schoolBus" name="transportation" value="School Bus">
                <label for="schoolBus">School Bus</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="privateTransport" name="transportation" value="Private Transport">
                <label for="privateTransport">Private Transport</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="walking" name="transportation" value="Walking">
                <label for="walking">Walking</label>
            </div>
        </div>
        
        <div class="form-group">
            <label for="lunchProgram">Lunch Program</label>
            <div class="checkbox-group">
                <input type="checkbox" id="schoolLunch" name="lunchProgram" value="School Lunch">
                <label for="schoolLunch">School Lunch Program</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="packedLunch" name="lunchProgram" value="Packed Lunch">
                <label for="packedLunch">Packed Lunch from Home</label>
            </div>
        </div>
        
        <div class="form-group">
            <label for="additionalInfo">Additional Information or Special Requests</label>
            <textarea id="additionalInfo" name="additionalInfo" placeholder="Please provide any additional information or special requests..."></textarea>
        </div>
    </div>

    <!-- Required Documents Section -->
    <div class="section">
        <h3 class="section-title">REQUIRED DOCUMENTS CHECKLIST</h3>
        <p><strong>Please attach the following documents:</strong></p>
        
        <div class="checkbox-group">
            <input type="checkbox" id="birthCert" name="documents" value="Birth Certificate">
            <label for="birthCert">Birth Certificate (Original and Copy)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="passportPhoto" name="documents" value="Passport Photos">
            <label for="passportPhoto">2 Recent Passport Photos</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="previousReport" name="documents" value="Previous School Report">
            <label for="previousReport">Previous School Report (if applicable)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="transferCert" name="documents" value="Transfer Certificate">
            <label for="transferCert">Transfer Certificate (if applicable)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="medicalCert" name="documents" value="Medical Certificate">
            <label for="medicalCert">Medical Certificate (if applicable)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="immunization" name="documents" value="Immunization Record">
            <label for="immunization">Immunization Record</label>
        </div>
    </div>

    <!-- Declaration Section -->
    <div class="section">
        <h3 class="section-title">DECLARATION</h3>
        <p>I hereby declare that the information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may result in the rejection of this application.</p>
        
        <div class="checkbox-group">
            <input type="checkbox" id="declaration" name="declaration" required>
            <label for="declaration">I agree to the terms and conditions of admission <span class="required">*</span></label>
        </div>
        
        <div class="checkbox-group">
            <input type="checkbox" id="dataProtection" name="dataProtection" required>
            <label for="dataProtection">I consent to the processing of personal data for admission purposes <span class="required">*</span></label>
        </div>
    </div>

    <!-- Signature Section -->
    <div class="signature-section">
        <div class="signature-line">
            <div class="signature-box">
                <strong>Parent/Guardian Signature</strong>
            </div>
            <div class="date-box">
                <strong>Date</strong>
            </div>
        </div>
        
        <div class="signature-line">
            <div class="signature-box">
                <strong>Student Signature (if applicable)</strong>
            </div>
            <div class="date-box">
                <strong>Date</strong>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p><strong>King Solomon Junior Primary School</strong> | Koginga Road, Asego, Homa Bay County, Kenya</p>
        <p>Phone: +254 720 456 789 | Email: info@kingsolomonjunior.ac.ke | Website: www.kingsolomonjunior.co.ke</p>
        <p>Application Form - Version 2024 | Generated on ${new Date().toLocaleDateString()}</p>
    </div>

    <script>
        // Auto-fill current date
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            // You can add auto-fill functionality here if needed
        });
        
        // Print function
        function printForm() {
            window.print();
        }
        
        // Download as PDF function
        function downloadPDF() {
            window.print();
        }
    </script>
</body>
</html>`;
}

// Make function globally available
window.downloadSimplePDFForm = downloadSimplePDFForm;
