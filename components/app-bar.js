class AppBar extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
            <header>
                <h1>Catatan Pribadi</h1>
                <theme-toggle></theme-toggle>
            </header>
        `
  }
}
customElements.define("app-bar", AppBar)

