document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year')
  if (yearSpan) yearSpan.textContent = new Date().getFullYear()

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href && href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    })
  })

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  revealEls.forEach(el => observer.observe(el))

  // Build email links at runtime to avoid exposing raw email in source
  const emailLinks = document.querySelectorAll('.email-link')
  emailLinks.forEach(link => {
    const user = link.getAttribute('data-user')
    const d1 = link.getAttribute('data-domain1')
    const d2 = link.getAttribute('data-domain2')
    if (user && d1 && d2) {
      const email = `${user}@${d1}.${d2}`
      link.setAttribute('href', `mailto:${email}`)
      const label = link.getAttribute('data-label') || email
      if (!link.textContent.trim()) link.textContent = label
    }
  })

  // Contact form handling
  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault()
      
      // Get form data
      const formData = new FormData(this)
      const name = formData.get('name')
      const email = formData.get('email')
      const subject = formData.get('subject')
      const message = formData.get('message')
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error')
        return
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error')
        return
      }
      
      // Simulate form submission (replace with actual form handling)
      showNotification('Thank you! Your message has been sent successfully.', 'success')
      
      // Reset form
      this.reset()
      
      // In a real implementation, you would send this data to your backend
      // or use a service like Formspree, Netlify Forms, or EmailJS
      console.log('Form submitted:', { name, email, subject, message })
    })
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification')
    if (existingNotification) {
      existingNotification.remove()
    }
    
    // Create notification element
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#dcfce7' : type === 'error' ? '#fecaca' : '#dbeafe'};
      color: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#1e40af'};
      border: 1px solid ${type === 'success' ? '#bbf7d0' : type === 'error' ? '#fca5a5' : '#bfdbfe'};
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    `
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close')
    closeBtn.addEventListener('click', () => {
      notification.remove()
    })
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)
    
    // Add to page
    document.body.appendChild(notification)
  }

  // Add CSS animation for notifications
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .notification-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      margin-left: 12px;
      color: inherit;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `
  document.head.appendChild(style)
})