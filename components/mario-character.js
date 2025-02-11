class MarioCharacter extends HTMLElement {
  connectedCallback() {
    this.render()
    this.mario = this.querySelector(".mario")
    document.addEventListener("mousemove", this.followCursor.bind(this))
  }

  render() {
    this.innerHTML = `
            <div class="mario"></div>
        `
  }

  followCursor(e) {
    const marioRect = this.mario.getBoundingClientRect()
    const marioCenter = {
      x: marioRect.left + marioRect.width / 2,
      y: marioRect.top + marioRect.height / 2,
    }

    const angle = Math.atan2(e.clientY - marioCenter.y, e.clientX - marioCenter.x)
    const degrees = (angle * 180) / Math.PI

    this.mario.style.transform = `rotate(${degrees}deg)`
  }
}

customElements.define("mario-character", MarioCharacter)
