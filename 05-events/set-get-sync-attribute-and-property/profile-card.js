export class ProfileCard extends HTMLElement {
    constructor() {
        super();

        this.firstName = 'John';
        this.lastName = 'Doe';
        this.fullName = this.firstName + ' ' + this.lastName;

        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        // Change a property and see it reflected as an attribute
        this.lastName = 'Adamoon';
        this.render();
    }



    render() {
        this.shadowRoot.innerHTML = `
            <img src='https://placeimg.com/100/100/people' />

            <h1>${this.firstName} : ${this.lastName}</h1>
            
            <h1>${this.fullName}</h1>
            <p>Title</p>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {

        // if we were to set property firstName to new attribute value it would fire off SET which in
        // turn fires of atributeChangedCallback - an endless loop that gives an out of memory error.

        // if we have set attributes on component in html then we can do this.firstName = newValue;
        // and we then don't need getters and setters.

        // NB This gets fired initially as attribute is null but we set firstName and lastName in constror which tiggers the set method
        if (name === 'the-first-name' || name == 'the-last-name') {
            //this.firstName = newValue; endless loop
            this.fullName = `${this.firstName} ${this.lastName}`;
            console.log("[attributeChangedCallback] FIRST " + this.firstName);
            console.log("[attributeChangedCallback] LAST " + this.lastName);
            console.log("[attributeChangedCallback] " + this.firstName + " --> " + this.lastName + " Fullname is now: " + this.fullName);
        }

        this.render();
    }

    static get observedAttributes() {
        return ['the-first-name', 'the-last-name'];
    }

    // set  means that when we change the firstName we also change the atribute to be in sync
    set firstName(val) {
        if (val) {
            this.setAttribute('the-first-name', val);
            console.log("firstName setter")
        } else {
            this.removeAttribute('the-first-name');
        }
    }
    // get  means if use/call firstName it uses the-first-name attribute value.
    // getters and setters make fns into properties so get firstName() === this.firstName
    get firstName() {
        console.log("firstName getter")
        return this.getAttribute('the-first-name');

    }

    set lastName(val) {
        if (val) {
            this.setAttribute('the-last-name', val);
            console.log("lastName setter")
        } else {
            this.removeAttribute('the-last-name');
        }
    }

    get lastName() {
        console.log("lastName getter")
        return this.getAttribute('the-last-name');
    }
}

customElements.define('profile-card', ProfileCard);