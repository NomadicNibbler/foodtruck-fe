const checkForError = (response) => {
  if(!response.ok) {
    throw new Error(response.status)
} else {
    return response.json()
}
}

export const fetchUserName = (userName) => {
  return fetch("https://warm-scrubland-95764.herokuapp.com/api/v1/sessions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: userName})
    }) 
    .then(response => checkForError(response))
}

export const fetchNewUser = (newUser) => {
  return fetch("https://warm-scrubland-95764.herokuapp.com/api/v1/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newUser)
  }) 
  .then(response => checkForError(response))
}

export const fetchTrucks = (id) => {
  return fetch(`https://warm-scrubland-95764.herokuapp.com/api/v1/trucks?id=${id}`)
  .then(response => checkForError(response))
}

export const updateUser = (updatedUser, id) => {
  return fetch(`https://warm-scrubland-95764.herokuapp.com/api/v1/users/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedUser)
  }) 
  .then(response => checkForError(response))
}