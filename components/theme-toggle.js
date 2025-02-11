class ThemeToggle extends HTMLElement {
    connectedCallback() {
      this.render()
      this.querySelector("button").addEventListener("click", this.toggleTheme)
    }
  
    render() {
      this.innerHTML = `
              <button id="themeToggle" aria-label="Toggle theme">
                  <span class="light-icon">☀️</span>
                  <span class="dark-icon">🌙</span>
              </button>
          `
    }
  
    toggleTheme() {
      document.body.classList.toggle("dark-theme")
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
    }
  }
  
  customElements.define("theme-toggle", ThemeToggle)
  
  