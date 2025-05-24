
// ---------------------------
// 🌗 Theme Toggle Logic
// ---------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Function to apply theme
function applyTheme(isDark) {
  if (isDark) {
    body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️'; // Sun icon => Light mode
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    themeToggleBtn.textContent = '🌙'; // Moon icon => Dark mode
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

// Toggle theme on click
themeToggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-theme');
  applyTheme(!isDark);
});

// ---------------------------
// 📬 Contact Form Handling
// ---------------------------
const form = document.getElementById('contact-form');
const status = document.getElementById('status');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // ✅ Validate Email
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    emailError.style.display = 'inline';
    emailInput.style.borderColor = 'red';
    status.textContent = "❌ Invalid email address.";
    status.style.color = 'red';
    return;
  } else {
    emailError.style.display = 'none';
    emailInput.style.borderColor = '#ccc';
  }

  // 📤 Send Data
  const formData = {
    name: form.name.value,
    email: email,
    message: form.message.value,
  };

  try {
    const res = await fetch('https://my-portfolio-backend.onrender.com/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      status.textContent = "✅ Thank you! Your message has been sent.";
      status.style.color = 'green';
      form.reset();
    } else {
      status.textContent = "❌ Message failed to send.";
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = "❌ Server not responding. Try again later.";
    status.style.color = 'red';
  }
});

