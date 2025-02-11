class PixelParticles extends HTMLElement {
    connectedCallback() {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")
      this.particles = []
      this.mouseX = 0
      this.mouseY = 0
  
      this.setupCanvas()
      this.createParticles()
      this.animate()
  
      window.addEventListener("resize", () => this.setupCanvas())
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX
        this.mouseY = e.clientY
      })
    }
  
    setupCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.canvas.style.position = "fixed"
      this.canvas.style.top = "0"
      this.canvas.style.left = "0"
      this.canvas.style.zIndex = "-1"
      this.appendChild(this.canvas)
    }
  
    createParticles() {
      const particleCount = 100
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
        })
      }
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
      this.particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
  
        if (particle.x > this.canvas.width) particle.x = 0
        if (particle.y > this.canvas.height) particle.y = 0
        if (particle.x < 0) particle.x = this.canvas.width
        if (particle.y < 0) particle.y = this.canvas.height
  
        const dx = particle.x - this.mouseX
        const dy = particle.y - this.mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
  
        if (distance < 50) {
          particle.x += (dx / distance) * 2
          particle.y += (dy / distance) * 2
        }
  
        this.ctx.fillStyle = document.body.classList.contains("dark-theme") ? "#ffffff" : "#000000"
        this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
      })
  
      requestAnimationFrame(() => this.animate())
    }
  }
  
  customElements.define("pixel-particles", PixelParticles)
  
  