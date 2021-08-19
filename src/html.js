export class Html {
    static getAuthForm(){
        return /*html*/`
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required minLength='6'>
                <label for="password">Password</label>
            </div>
            <div id="error"></div>
            <button type="submit" id="submit" class="mui-btn mui-btn--raised mui-btn--primary" disabled>LOGIN</button>
            <div>
                <span>If you don't have an account please register: </span>
                <button type="button" id="singup-btn" class="mui-btn mui-btn--flat mui-btn--primary">REGISTER</button>
            </div>
            
        </form>
        `
    }
    
    static getSingUpForm(){
        return /*html*/`
        <form class="mui-form" id="sing-up-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required minLength='6'>
                <label for="password">Password</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="repeat-password" required minLength='6'>
                <label for="repeat-password">Repeat password</label>
            </div>
            <div id="error"></div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" disabled>Register</button>
        </form>
        `
    }

    static successSingUp(){
        return /*html*/`
            <div>
                <p class='success'>You successfully registered. You can login now to see the questions</p>
                <button type="button" id="success-singup-btn" class="mui-btn mui-btn--flat mui-btn--primary">LOGIN</button>
            </div>
        `
    }

    static toCard(question){
        return /*html*/`
        <div class="question">
            <div class="mui--text-black-54 question-date">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div class="question-text">${question.text}</div>
        </div>`
    }
}