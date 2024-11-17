import '../public/style.css'; 

// State management
const state = {
    emails: [],
    filteredEmails: [],
    currentFilter: 'unread',
    currentPage: 1, // Start at page 1
    readEmails: new Set(),
    favoriteEmails: new Set()
};

// DOM Elements
const emailContainer = document.querySelector('.email-list');
const filterButtons = document.querySelectorAll('.filter button');
const emailDetail = document.querySelector('.email-detail');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

// Email API endpoint
const API_BASE_URL = 'https://flipkart-email-mock.vercel.app';

/**
 * Fetches email data from the API
 */
async function fetchEmails(page = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/?page=${page}`);
        const data = await response.json();
        state.emails = data.list.map(email => ({
            ...email,
            isRead: false,
            isFavorite: false
        }));
        applyCurrentFilter();
    } catch (error) {
        console.error('Error fetching emails:', error);
        emailContainer.innerHTML = '<p>Error loading emails. Please try again later.</p>';
    }
}

/**
 * Creates an email item DOM element
 */
function createEmailElement(email) {
    const emailItem = document.createElement('article');
    emailItem.classList.add('email-item');
    
    if (state.readEmails.has(email.id)) {
        emailItem.classList.add('read');
    }
    
    if (state.favoriteEmails.has(email.id)) {
        emailItem.classList.add('favorite');
    }

    emailItem.innerHTML = `
        <aside class="email-avatar">${email.from.name[0]}</aside>
        <section class="email-content">
            <header class="email-header">
                From: <strong><span class="name">${email.from.name}</span> 
                &lt;<span class="email">${email.from.email}</span>&gt;</strong>
            </header>
            <h2 class="email-subject">Subject: <strong class="subj">${email.subject}</strong></h2>
            <p class="email-body">${email.short_description}</p>
            <footer class="email-footer">
                ${new Date(email.date).toLocaleString()}
                <button class="favorite-btn" data-id="${email.id}">
                    ${state.favoriteEmails.has(email.id) ? '★' : '☆'}
                </button>
            </footer>
        </section>
    `;

    // Add event listeners
    emailItem.addEventListener('click', (e) => {
        if (!e.target.classList.contains('favorite-btn')) {
            showEmailDetail(email);
            markAsRead(email.id);
        }
    });

    emailItem.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(email.id);
    });

    return emailItem;
}

/**
 * Shows the email detail view
 */
function showEmailDetail(email) {
    emailDetail.innerHTML = `
       <header class="email-header">
            <span class="email-header-content">
            <aside class="email-avatar">${email.from.name[0]}</aside>
            <h2 id="email-subject">${email.subject}</h2>
            </span>
            
            <button class="favorite-btn1" data-id="${email.id}">
                ${state.favoriteEmails.has(email.id) ? 'favorite' : 'make as favorite'}
            </button>
        </header>
        
        
        <p id="email-from">From: <strong>${email.from.name}</strong> &lt;${email.from.email}&gt;</p>
        <p id="email-body">${email.body || email.short_description}</p>
        <footer id="email-footer">Sent on: ${new Date(email.date).toLocaleString()}</footer>
    `;
    
    emailDetail.querySelector('.favorite-btn1').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(email.id);
    });

    // Add responsive classes
    emailContainer.classList.add('active');
    emailDetail.classList.add('active');
}

/**
 * Marks an email as read
 */
function markAsRead(emailId) {
    state.readEmails.add(emailId);
    applyCurrentFilter();
}

/**
 * Toggles favorite status of an email
 */
function toggleFavorite(emailId) {
    if (state.favoriteEmails.has(emailId)) {
        state.favoriteEmails.delete(emailId);
    } else {
        state.favoriteEmails.add(emailId);
    }
    applyCurrentFilter();
}

/**
 * Applies the current filter to emails
 */
function applyCurrentFilter() {
    switch (state.currentFilter) {
        case 'unread':
            state.filteredEmails = state.emails.filter(email => !state.readEmails.has(email.id));
            break;
        case 'read':
            state.filteredEmails = state.emails.filter(email => state.readEmails.has(email.id));
            break;
        case 'favorites':
            state.filteredEmails = state.emails.filter(email => state.favoriteEmails.has(email.id));
            break;
        default:
            state.filteredEmails = state.emails;
    }
    renderEmails();
}

/**
 * Renders the email list
 */
function renderEmails() {
    emailContainer.innerHTML = '';
    state.filteredEmails.forEach(email => {
        emailContainer.appendChild(createEmailElement(email));
    });
}

/**
 * Initialize the application
 */
function init() {
    // Set up filter button listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and re-render
            state.currentFilter = button.textContent.toLowerCase();
            applyCurrentFilter();
        });
    });

    // Pagination button listeners
    prevPageButton.addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            fetchEmails(state.currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        state.currentPage++;
        fetchEmails(state.currentPage);
    });

    // Add responsive handling
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleScreenSize(e) {
        if (e.matches) {
            // Mobile view adjustments
            emailContainer.classList.remove('active');
            emailDetail.classList.remove('active');
        }
    }
    mediaQuery.addEventListener('change', handleScreenSize);
    handleScreenSize(mediaQuery);

    // Initial load
    fetchEmails();
}

// Start the application
init();
