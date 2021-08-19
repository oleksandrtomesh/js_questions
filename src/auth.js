const fetchOptions = (email, password) => ({
    method: 'POST',
    body: JSON.stringify({
        email, password,
        returnSecureToken: true
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})

export function authWithEmailAndPassword(email, password){
    const apikey = 'AIzaSyCIek1UGaS_7ByKTIMlIHy4us06FwGlFsg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`, fetchOptions(email, password)) 
        .then(resp => resp.json())
        .then(data => data.idToken)
}

export function singUpWithEmailAndPassword(email, password){
    const apikey = 'AIzaSyCIek1UGaS_7ByKTIMlIHy4us06FwGlFsg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`, fetchOptions(email,password))
        .then(resp => resp.json())
}