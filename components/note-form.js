class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render()
    this.querySelector("#noteForm").addEventListener("submit", this.addNote)
  }

  render() {
    this.innerHTML = `
            <form id="noteForm">
                <input type="text" id="title" placeholder="Judul" required>
                <textarea id="body" placeholder="Isi Catatan (Gunakan '1. ' untuk daftar bernomor, '- ' atau '• ' untuk daftar dengan poin)" required></textarea>
                <button type="submit">Tambah Catatan</button>
            </form>
        `
  }

  addNote(event) {
    event.preventDefault()
    const title = document.querySelector("#title").value.trim()
    const body = document.querySelector("#body").value.trim()

    if (title === "" || body === "") {
      alert("Judul dan isi tidak boleh kosong!")
      return
    }

    const newNote = {
      id: "new-" + Date.now().toString(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || []
    notes.unshift(newNote)
    localStorage.setItem("notes", JSON.stringify(notes))

    document.querySelector("note-list").render()
    event.target.reset()
  }
}
customElements.define("note-form", NoteForm)

