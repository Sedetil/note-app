class NoteItem extends HTMLElement {
  connectedCallback() {
    if (this.note) {
      this.render()
    }
  }

  set note(note) {
    this._note = note
    this.render()
  }

  formatContent(content) {
    const lines = content.split("\n")
    let formattedContent = ""
    let inList = false
    let listType = ""

    lines.forEach((line, index) => {
      if (line.match(/^\d+\.\s/)) {
        if (!inList || listType !== "ol") {
          if (inList) formattedContent += "</ul>"
          formattedContent += "<ol>"
          inList = true
          listType = "ol"
        }
        formattedContent += `<li>${line.replace(/^\d+\.\s/, "")}</li>`
      } else if (line.match(/^[-•]\s/)) {
        if (!inList || listType !== "ul") {
          if (inList) formattedContent += "</ol>"
          formattedContent += "<ul>"
          inList = true
          listType = "ul"
        }
        formattedContent += `<li>${line.replace(/^[-•]\s/, "")}</li>`
      } else {
        if (inList) {
          formattedContent += listType === "ol" ? "</ol>" : "</ul>"
          inList = false
        }
        formattedContent += `<p>${line}</p>`
      }
    })

    if (inList) {
      formattedContent += listType === "ol" ? "</ol>" : "</ul>"
    }

    return formattedContent
  }

  render() {
    const formattedContent = this.formatContent(this._note.body)
    this.innerHTML = `
            <div class="note-item">
                <h3>${this._note.title}</h3>
                <div class="note-content">${formattedContent}</div>
                <div class="note-footer">
                    <small>${new Date(this._note.createdAt).toLocaleDateString()}</small>
                    ${this._note.id.startsWith("new-") ? `<button class="delete-btn" data-id="${this._note.id}">Hapus</button>` : ""}
                </div>
            </div>
        `
    const deleteBtn = this.querySelector(".delete-btn")
    if (deleteBtn) {
      deleteBtn.addEventListener("click", this.deleteNote)
    }
  }

  deleteNote(event) {
    const noteId = event.target.dataset.id
    let notes = JSON.parse(localStorage.getItem("notes")) || []
    notes = notes.filter((note) => note.id !== noteId)
    localStorage.setItem("notes", JSON.stringify(notes))
    document.querySelector("note-list").render()
  }
}
customElements.define("note-item", NoteItem)

