// PDF Generator for King Solomon Junior Primary School Application Form
// This script generates a downloadable PDF application form

class SchoolPDFGenerator {
    constructor() {
        this.schoolInfo = {
            name: "King Solomon Junior Primary School",
            tagline: "Excellence in Education",
            location: "Koginga Road, Asego, Homa Bay County, Kenya",
            phone: "+254 720 456 789",
            email: "info@kingsolomonjunior.ac.ke",
            website: "www.kingsolomonjunior.co.ke"
        };
    }

    // Generate and download PDF application form
    async generateApplicationForm() {
        try {
            // Check if jsPDF is available
            if (typeof window.jsPDF === 'undefined') {
                await this.loadJsPDF();
            }

            // Double check after loading
            if (typeof window.jsPDF === 'undefined') {
                throw new Error('jsPDF library failed to load');
            }

            const doc = new window.jsPDF('p', 'mm', 'a4');
            
            // Set up fonts and colors
            doc.setFont('helvetica');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            // Header Section
            this.addHeader(doc, pageWidth);
            
            // School Information
            this.addSchoolInfo(doc, pageWidth);
            
            // Form Title
            this.addFormTitle(doc, pageWidth);
            
            // Instructions
            this.addInstructions(doc, pageWidth);
            
            // Student Information Section
            this.addStudentSection(doc, pageWidth);
            
            // Parent/Guardian Information Section
            this.addParentSection(doc, pageWidth);
            
            // Additional Information Section
            this.addAdditionalSection(doc, pageWidth);
            
            // Required Documents Section
            this.addDocumentsSection(doc, pageWidth);
            
            // Declaration Section
            this.addDeclarationSection(doc, pageWidth);
            
            // Signature Section
            this.addSignatureSection(doc, pageWidth);
            
            // Footer
            this.addFooter(doc, pageWidth, pageHeight);
            
            // Download the PDF
            const fileName = `King_Solomon_Junior_Application_Form_${new Date().getFullYear()}.pdf`;
            doc.save(fileName);
            
            return { success: true, fileName };
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            return { success: false, error: error.message };
        }
    }

    // Load jsPDF library dynamically
    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (typeof window.jsPDF !== 'undefined') {
                resolve();
                return;
            }

            // Check if script is already being loaded
            const existingScript = document.querySelector('script[src*="jspdf"]');
            if (existingScript) {
                existingScript.onload = () => resolve();
                existingScript.onerror = () => reject(new Error('Failed to load jsPDF library'));
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.async = true;
            script.onload = () => {
                // Wait a bit for the library to initialize
                setTimeout(() => {
                    if (typeof window.jsPDF !== 'undefined') {
                        resolve();
                    } else {
                        reject(new Error('jsPDF library loaded but not available'));
                    }
                }, 100);
            };
            script.onerror = () => reject(new Error('Failed to load jsPDF library'));
            document.head.appendChild(script);
        });
    }

    // Add header with school logo and name
    addHeader(doc, pageWidth) {
        // School name
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138); // Blue color
        doc.text(this.schoolInfo.name, pageWidth / 2, 20, { align: 'center' });
        
        // Tagline
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(this.schoolInfo.tagline, pageWidth / 2, 28, { align: 'center' });
        
        // Line separator
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.5);
        doc.line(20, 35, pageWidth - 20, 35);
    }

    // Add school information
    addSchoolInfo(doc, pageWidth) {
        let yPos = 45;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        
        doc.text(`Location: ${this.schoolInfo.location}`, 20, yPos);
        yPos += 6;
        doc.text(`Phone: ${this.schoolInfo.phone} | Email: ${this.schoolInfo.email}`, 20, yPos);
        yPos += 6;
        doc.text(`Website: ${this.schoolInfo.website}`, 20, yPos);
        
        yPos += 10;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, pageWidth - 20, yPos);
    }

    // Add form title
    addFormTitle(doc, pageWidth) {
        let yPos = 80;
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text('STUDENT ADMISSION APPLICATION FORM', pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 8;
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.3);
        doc.line(pageWidth / 2 - 60, yPos, pageWidth / 2 + 60, yPos);
    }

    // Add instructions
    addInstructions(doc, pageWidth) {
        let yPos = 100;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text('Application Instructions:', 20, yPos);
        
        yPos += 8;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        
        const instructions = [
            '• Please fill out this form completely and legibly',
            '• All fields marked with (*) are required',
            '• Attach all required documents (birth certificate, passport photos, previous school reports)',
            '• Submit the completed form to our school office or via email',
            '• Applications are accepted year-round'
        ];
        
        instructions.forEach(instruction => {
            doc.text(instruction, 20, yPos);
            yPos += 5;
        });
        
        yPos += 5;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, pageWidth - 20, yPos);
    }

    // Add student information section
    addStudentSection(doc, pageWidth) {
        let yPos = 140;
        
        this.addSectionTitle(doc, 'STUDENT INFORMATION', 20, yPos);
        yPos += 15;
        
        // Student name fields
        this.addFormField(doc, 'First Name *', 20, yPos, 50);
        this.addFormField(doc, 'Middle Name', 100, yPos, 30);
        this.addFormField(doc, 'Last Name *', 150, yPos, 50);
        yPos += 20;
        
        // Date of birth and gender
        this.addFormField(doc, 'Date of Birth *', 20, yPos, 40);
        this.addFormField(doc, 'Gender *', 80, yPos, 30);
        this.addFormField(doc, 'Nationality', 130, yPos, 30);
        yPos += 20;
        
        // Applying for grade and previous school
        this.addFormField(doc, 'Applying for Grade *', 20, yPos, 50);
        this.addFormField(doc, 'Previous School', 100, yPos, 80);
        yPos += 20;
        
        // Medical conditions
        this.addFormField(doc, 'Medical Conditions or Special Needs', 20, yPos, 160, true);
        yPos += 30;
        
        // Section separator
        this.addSectionSeparator(doc, yPos, pageWidth);
    }

    // Add parent/guardian information section
    addParentSection(doc, pageWidth) {
        let yPos = 220;
        
        this.addSectionTitle(doc, 'PARENT/GUARDIAN INFORMATION', 20, yPos);
        yPos += 15;
        
        // Parent name fields
        this.addFormField(doc, 'Parent/Guardian First Name *', 20, yPos, 50);
        this.addFormField(doc, 'Parent/Guardian Last Name *', 100, yPos, 50);
        this.addFormField(doc, 'Relationship *', 170, yPos, 30);
        yPos += 20;
        
        // Contact information
        this.addFormField(doc, 'Phone Number *', 20, yPos, 40);
        this.addFormField(doc, 'Email Address *', 80, yPos, 50);
        this.addFormField(doc, 'Occupation', 150, yPos, 50);
        yPos += 20;
        
        // Address
        this.addFormField(doc, 'Home Address *', 20, yPos, 160, true);
        yPos += 30;
        
        // Emergency contact
        this.addFormField(doc, 'Emergency Contact Name', 20, yPos, 50);
        this.addFormField(doc, 'Emergency Contact Phone', 100, yPos, 50);
        yPos += 20;
        
        // Section separator
        this.addSectionSeparator(doc, yPos, pageWidth);
    }

    // Add additional information section
    addAdditionalSection(doc, pageWidth) {
        let yPos = 320;
        
        this.addSectionTitle(doc, 'ADDITIONAL INFORMATION', 20, yPos);
        yPos += 15;
        
        // Transportation
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        doc.text('Transportation Method:', 20, yPos);
        yPos += 8;
        
        doc.text('☐ School Bus    ☐ Private Transport    ☐ Walking', 20, yPos);
        yPos += 15;
        
        // Lunch program
        doc.text('Lunch Program:', 20, yPos);
        yPos += 8;
        doc.text('☐ School Lunch Program    ☐ Packed Lunch from Home', 20, yPos);
        yPos += 15;
        
        // Additional information
        this.addFormField(doc, 'Additional Information or Special Requests', 20, yPos, 160, true);
        yPos += 30;
        
        // Section separator
        this.addSectionSeparator(doc, yPos, pageWidth);
    }

    // Add required documents section
    addDocumentsSection(doc, pageWidth) {
        let yPos = 400;
        
        this.addSectionTitle(doc, 'REQUIRED DOCUMENTS CHECKLIST', 20, yPos);
        yPos += 15;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        
        const documents = [
            '☐ Birth Certificate (Original and Copy)',
            '☐ 2 Recent Passport Photos',
            '☐ Previous School Report (if applicable)',
            '☐ Transfer Certificate (if applicable)',
            '☐ Medical Certificate (if applicable)',
            '☐ Immunization Record'
        ];
        
        documents.forEach(docItem => {
            doc.text(docItem, 20, yPos);
            yPos += 6;
        });
        
        yPos += 10;
        this.addSectionSeparator(doc, yPos, pageWidth);
    }

    // Add declaration section
    addDeclarationSection(doc, pageWidth) {
        let yPos = 480;
        
        this.addSectionTitle(doc, 'DECLARATION', 20, yPos);
        yPos += 15;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        
        doc.text('I hereby declare that the information provided in this application is true and accurate to the best of my knowledge.', 20, yPos);
        yPos += 8;
        doc.text('I understand that providing false information may result in the rejection of this application.', 20, yPos);
        yPos += 15;
        
        doc.text('☐ I agree to the terms and conditions of admission *', 20, yPos);
        yPos += 8;
        doc.text('☐ I consent to the processing of personal data for admission purposes *', 20, yPos);
        yPos += 15;
        
        this.addSectionSeparator(doc, yPos, pageWidth);
    }

    // Add signature section
    addSignatureSection(doc, pageWidth) {
        let yPos = 550;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text('SIGNATURES', 20, yPos);
        yPos += 15;
        
        // Parent signature
        doc.setFont('helvetica', 'normal');
        doc.text('Parent/Guardian Signature:', 20, yPos);
        doc.line(80, yPos - 2, 150, yPos - 2);
        doc.text('Date:', 160, yPos);
        doc.line(180, yPos - 2, 220, yPos - 2);
        yPos += 20;
        
        // Student signature
        doc.text('Student Signature (if applicable):', 20, yPos);
        doc.line(80, yPos - 2, 150, yPos - 2);
        doc.text('Date:', 160, yPos);
        doc.line(180, yPos - 2, 220, yPos - 2);
    }

    // Add footer
    addFooter(doc, pageWidth, pageHeight) {
        const yPos = pageHeight - 20;
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        
        doc.text(this.schoolInfo.name, pageWidth / 2, yPos - 15, { align: 'center' });
        doc.text(`${this.schoolInfo.location} | Phone: ${this.schoolInfo.phone} | Email: ${this.schoolInfo.email}`, pageWidth / 2, yPos - 10, { align: 'center' });
        doc.text(`Application Form - Version 2024 | Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos - 5, { align: 'center' });
    }

    // Helper methods
    addSectionTitle(doc, title, x, y) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 58, 138);
        doc.text(title, x, y);
        
        // Underline
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.3);
        doc.line(x, y + 2, x + 60, y + 2);
    }

    addFormField(doc, label, x, y, width, isTextArea = false) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        doc.text(label, x, y);
        
        if (isTextArea) {
            // Draw a larger rectangle for textarea
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.2);
            doc.rect(x, y + 2, width, 15);
        } else {
            // Draw a line for input field
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.2);
            doc.line(x, y + 2, x + width, y + 2);
        }
    }

    addSectionSeparator(doc, y, pageWidth) {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(20, y, pageWidth - 20, y);
    }
}

// Global function to download PDF form
async function downloadPDFForm() {
    try {
        // First try the dynamic PDF generation
        const generator = new SchoolPDFGenerator();
        const result = await generator.generateApplicationForm();
        
        if (result.success) {
            // Show success message
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'PDF Downloaded!',
                    text: `Application form has been downloaded as ${result.fileName}`,
                    icon: 'success',
                    timer: 3000
                });
            } else {
                alert(`Application form downloaded as ${result.fileName}`);
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.warn('Dynamic PDF generation failed, falling back to print dialog:', error);
        
        // Fallback: Open the HTML form in a new window for printing
        try {
            const printWindow = window.open('documents/application-form.html', '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                };
                
                // Show fallback message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Print Form',
                        text: 'The application form has been opened in a new window. Please use your browser\'s print function to save as PDF.',
                        icon: 'info',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert('The application form has been opened in a new window. Please use your browser\'s print function to save as PDF.');
                }
            } else {
                throw new Error('Could not open print window');
            }
        } catch (fallbackError) {
            console.error('Print fallback failed, trying simple PDF generator:', fallbackError);
            
            // Final fallback: Use simple PDF generator
            try {
                if (typeof downloadSimplePDFForm === 'function') {
                    const simpleResult = downloadSimplePDFForm();
                    if (simpleResult.success) {
                        return; // Success message already shown
                    }
                }
                
                throw new Error('All PDF generation methods failed');
            } catch (finalError) {
                console.error('All fallbacks failed:', finalError);
                
                // Final error message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Error',
                        text: `Failed to generate PDF: ${error.message}. Please try the "View PDF Form" button instead.`,
                        icon: 'error'
                    });
                } else {
                    alert(`Failed to generate PDF: ${error.message}. Please try the "View PDF Form" button instead.`);
                }
            }
        }
    }
}

// Make function globally available
window.downloadPDFForm = downloadPDFForm;
