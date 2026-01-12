// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = darkModeToggle.querySelector('i');
  
  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply dark mode if saved preference exists
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'true');
    } else {
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'false');
    }
    
    // Dispatch custom event for any components that need to know
    const event = new CustomEvent('darkModeChange', {
      detail: { darkMode: document.body.classList.contains('dark-mode') }
    });
    window.dispatchEvent(event);
  });
  
  // Listen for system dark mode preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Update if system preference changes
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only apply if user hasn't manually set preference
    if (!localStorage.getItem('darkMode')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
      } else {
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
      }
    }
  });
  
  // Initialize with system preference if no user preference exists
  if (!localStorage.getItem('darkMode') && prefersDarkScheme.matches) {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
  }
});