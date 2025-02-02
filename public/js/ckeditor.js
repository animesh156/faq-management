// Initialize CKEditor
let editor;
ClassicEditor.create(document.querySelector('#answer'))
    .then(ed => {
        editor = ed;
    })
    .catch(error => {
        console.error(error);
    });

// Create FAQ function to send POST request
async function createFAQ() {
    const question = document.getElementById('question').value;
    const answer = editor.getData();  // Get the answer from CKEditor

    if (!question || !answer) {
        alert('Please fill in both the question and answer.');
        return;
    }

    try {
        const response = await fetch('http://localhost:6123/api/faqs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, answer })
        });

        if (response.ok) {
            const createdFAQ = await response.json();
            console.log('FAQ created successfully:', createdFAQ);
            loadFAQs();  // Reload FAQs after creation
            document.getElementById('faqForm').reset();  // Reset form fields
            editor.setData('');  // Reset CKEditor content
        } else {
            alert('Failed to create FAQ');
        }
    } catch (error) {
        console.error('Error creating FAQ:', error);
        alert('An error occurred while creating the FAQ.');
    }
}

// Function to load FAQs
async function loadFAQs() {
    const res = await fetch('http://localhost:6123/api/faqs');
    const faqs = await res.json();

    document.getElementById('faqList').innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
        </div>
    `).join("");
}

// Initially load FAQs
loadFAQs();
