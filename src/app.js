import './style.css'
import { Question, addToLocalStorage } from './question';
import { isValid, createModal } from './utils';
import {
    authWithEmailAndPassword,
    singUpWithEmailAndPassword
} from './auth';
import {Html} from './html'


const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit ')
const modalBtn = document.getElementById('modal')
//render list after page load
window.addEventListener('load', Question.renderList)

//sign of modal button depends on log in status
window.addEventListener('load', () => {
    if(localStorage.getItem('userToken')){
        modalBtn.childNodes[0].data = 'LOGOUT'
    } else {
        modalBtn.childNodes[0].data = 'LOGIN'
    }
})

//event listener to submit question form 
form.addEventListener('submit', submitHandler)

//validation fir question from
input.addEventListener('input', (e) => {
    submitBtn.disabled = !isValid(e.target.value)
})

//modal button handler
modalBtn.addEventListener('click', openModal)

function submitHandler(e) {
    e.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
        //async request to server
        Question.create(question).then(resp => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        }) 
    }
}

//open modal
function openModal(){
    //check if user already log in, if yes, make it button log out
    if(localStorage.getItem('userToken')){
        localStorage.clear()
        Question.renderList()
        modalBtn.childNodes[0].data = 'LOGIN'
        return
    }
    //If user is not log in, open Modal to sing in
    createModal('LOGIN', Html.getAuthForm())
    const authForm = document.querySelector('#auth-form')
    //validation for password field
    authForm.querySelector('#password').addEventListener('input', (e) => {
        authForm.querySelector('button').disabled = !isValid(e.target.value)
    })
    //modal submit handler
    authForm.addEventListener('submit', authSubmitHandler)

    //If user click sing up, show sing up modal
    authForm.querySelector('#singup-btn').addEventListener('click', () => {
        createModal('REGISTER', Html.getSingUpForm())
        const singUpForm = document.querySelector('#sing-up-form')
        singUpForm.querySelector('#password').addEventListener('input', (e) => {
            singUpForm.querySelector('button').disabled = !isValid(e.target.value)
        })
        singUpForm.addEventListener('submit', singUpHandler)

    })
    
}

function authSubmitHandler(e){
    e.preventDefault()
    const btn = e.target.querySelector('button')
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value
    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.getQuestionsForAuthUser)
        .then(renderQuestionsAfterAuth)
        .then(() => {
                modalBtn.childNodes[0].data = 'LOGOUT'
                btn.disabled = false
            })

}

function renderQuestionsAfterAuth(content){
    if(typeof content === 'string'){
        const error = document.getElementById('error')
        error.innerHTML = content
    } else {
        mui.overlay('off')
        addToLocalStorage(content)
        Question.renderList()
    }
    
}

function singUpHandler(e){
    e.preventDefault()
    const btn = e.target.querySelector('button')
    const email = e.target.querySelector('#email')
    const password = e.target.querySelector('#password')
    const repeatPassword = e.target.querySelector('#repeat-password').value
    const error = e.target.querySelector('#error')
    password.addEventListener('input', (e) => {
        
        btn.disabled = isValid(e.target.value)
    } )

    if(password.value !== repeatPassword){
        error.innerHTML = `<p class='error'>Passwords don't match</p>`
        return
    }
    btn.disabled = true
    singUpWithEmailAndPassword(email.value, password.value)
        .then(data => {
            if(data.error){
                error.innerHTML = `<p class='error'>${data.error.message.replace('_', ' ')}</p>`
            } else {
                createModal('SUCCESS SING UP', Html.successSingUp())
                document.getElementById('success-singup-btn').addEventListener('click', openModal)
            }
            
        })
        .then(() => btn.disabled = false)

}