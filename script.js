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
})