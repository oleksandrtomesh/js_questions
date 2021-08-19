import { Html } from './html';
export class Question{
    static create(question){
        return fetch('https://js-questions-app-c2fe8-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => {
                question.id = resp.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList(){
        const questions = getQuestionFromLocalStorage()
        if(!localStorage.getItem('userToken')){
            const html = /*html*/`<div class="mui--text-headline subtitle">If you want to see already asked questions please login</div>`
            document.getElementById('list').innerHTML = html
            return
        }
        const html = questions.length
            ? questions.map(Html.toCard).join('')
            : /*html*/`<div class="mui--text-headline">No any questions yet</div>`

        document.getElementById('list').innerHTML = html
    }

    static getQuestionsForAuthUser(token){
        if(!token){
            return Promise.resolve(/*html*/`<p class='error'>You provide wrong email or password</p>`)
        }
        localStorage.setItem('userToken', token)
        return fetch(`https://js-questions-app-c2fe8-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
            .then(resp => {
                return resp.json()})
            .then(data => {
                console.log(data)
                if(data.error){
                    return /*html*/`<p class='error'>${data.error}</p>`
                }
                return data 
                    ? Object.keys(data).map(key => ({
                        ...data[key],
                        id: key
                    }))
                    : []
            })
    }

}

export function addToLocalStorage(data) {
    let questions = getQuestionFromLocalStorage()
    data.length 

        //if get array from firebase, destructure it and sort
        ? questions = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        //if get string, unshift it on the list
        : questions.unshift(data)
    localStorage.setItem('questions', JSON.stringify(questions))
}

export function getQuestionFromLocalStorage(){
    return JSON.parse(localStorage.getItem('questions') || '[]')
}