document.addEventListener("DOMContentLoaded", () => {
  // Load theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.body.classList.add(savedTheme + "-theme")
  }

  // Load notes
  const notes = JSON.parse(localStorage.getItem("notes"))
  if (!notes || notes.length === 0) {
    import("./data/notes.js").then((module) => {
      const initialNotes = module.default
      localStorage.setItem("notes", JSON.stringify(initialNotes))
      document.querySelector("note-list").render()
    })
  } else {
    document.querySelector("note-list").render()
  }
})

