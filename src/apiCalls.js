const checkForError = () => {
  if(!response.ok) {
    throw new Error(response.status)
} else {
    response.json()
}
}

export const fetchUserName = () => {
  fetch("https://warm-scrubland-95764.herokuapp.com/api/v1/sessions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: userName})
    }) 
    .then(response => checkForError(response))
}