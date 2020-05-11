import {
  IDB
} from './idb.js'
import './profile-card.js'
class WPIndexedDBRead extends HTMLElement {
  constructor() {
    super();
    // this.Posts;
    this.DB_VERSION; //= 2;
    this.DB_NAME; // = 'CAT6';
    this.TABLE; // = 'wpCAT6';
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
        <style>
            body { 
              font-family: sans-serif;
            }
            #info {
                display:none;
                padding:20px;
                background:#ccc;
                width:700px;
                margin-top:20px;
                border: 4px solid #2196f3;
                border-radius:10px;
                font-size:20px;
            }
            #btn {
                background-color: #2196f3;
                color: #fff;
                font-size:22px;
                width:100px;
            }
        </style>
        <div id="output"></div>
    `;
  }
  static get observedAttributes() {
    return ['cat'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // this will fire initially as the element has no atrribute but is added when page runs
    if (oldValue === newValue) {
      return;
    }
    // if we use && oldValue !== null then we would need to call readData() in connectedCallback
    if (name === 'cat') {
      console.log(name, oldValue, newValue);
      const db = 'cat' + newValue;
      var table = 'wpcat' + newValue;
      this.readData(db, table, 2);
    }
  }
  connectedCallback() {
    // if we are not responding to change in attribute from 'null' to a value then we
    // would need to uncomment the line below...
    // this.readData(this.DB_NAME, this.TABLE, this.DB_VERSION);
  }
  readData(db, table, version) {
    console.log("readData", db, table, version);
    const DB_NAME = db;
    const TABLE = table;
    const DB_VERSION = version;
    const output = this.shadowRoot.querySelector('#output');
    IDB.idb(DB_NAME, DB_VERSION, TABLE)
      .then(function (db) {
        let post;
        const tx = db.transaction(TABLE, 'readonly');
        const dbTable = tx.objectStore(TABLE);
        const request = dbTable.getAll();
        request.onsuccess = function (event) {
          post = event.target.result;
          let info = "<div style='margin-left:40px;'><h2>" + TABLE + "</h2></div><div>";

          console.log(post)
          for (var i = 0; i < post.length; i++) {
            //console.log(post[i].id + " " + post[i].title + " " + post[i].authorName); 
            info += `<p>
            <profile-card
              pid= "${post[i].id}" 
              t="${post[i].title}" 
              a="${post[i].authorName}" 
              c="${post[i].content}" 

              ></profile-card></p>
       `;

            output.innerHTML = info;
          }
          info += "</div>";

        }
      })
  }
  disconnectedCallback() {}
}
customElements.define('wp-indexeddb-read', WPIndexedDBRead);