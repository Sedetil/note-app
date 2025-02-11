class NoteList extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    this.innerHTML = `
            <div class="note-list">
                ${notes
                  .map(
                    (note) => `
                    <note-item data-id="${note.id}"></note-item>
                `,
                  )
                  .join("")}
            </div>
        `

    notes.forEach((note) => {
      const noteItem = this.querySelector(`note-item[data-id="${note.id}"]`)
      noteItem.note = note
    })
  }
}
customElements.define("note-list", NoteList)

