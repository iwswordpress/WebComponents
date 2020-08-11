class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
            
            .card {
                    padding: 10px;
                    margin: 15px auto;
                    border: 2px solid orange;
                    border-radius: 10px;
                    background: #ccc;
                    box-sizing: border-box;
                    max-width: 750px;
                    font-size:22px; 
                }
               div {
                   margin:10px 0;
               }
            </style>
            <div class="card">              
                <div class="content">
                    <strong>ID: ${this.postid}</strong>
                </div>
                <div>
                    ${this.posttitle}
                </div>
                <div>
                    Authored by <em>${this.author}</em><br>
                </div>
                <div>
                    <span style="color:#2196f3">${this.content.toUpperCase()}</span> - Service as core &innovations as power makes our brand pre launch pushback quick-win but are we in agreeance. Touch base horsehead offer, or move the needle i don't want to drain the whole swamp, i just want to shoot some alligators if you're not hurting you're not winning. Q1 big data, but all hands on deck for where do we stand on the latest client ask, nor can you put it on my calendar? so Bob called an all-hands this afternoon corporate synergy. Ensure to follow requirements when developing solutions. P
                </div>
            </div>  
        `;
    }
    static get observedAttributes() {
        return ['postid', 'posttitle', 'author', 'content'];
    }
    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue)
        if (attributeName === 'posttitle') {
            this.posttitle = newValue;
        }
        if (attributeName === 'postid') {
            this.postid = newValue;
        }
        if (attributeName === 'author') {
            this.author = newValue;
        }
        if (attributeName === 'content') {
            this.content = newValue;
        }
        this.render();
    }
}
customElements.define('profile-card', ProfileCard);