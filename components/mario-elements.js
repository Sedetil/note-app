class MarioElements extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
            <div class="mario-elements">
                <div class="ground"></div>
                <div class="bush"></div>
                <div class="cloud"></div>
                <div class="pipe"></div>
                <div class="castle"></div>
            </div>
        `
  }
}

customElements.define("mario-elements", MarioElements)

