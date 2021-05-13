
export default async function defineBlogPostTemplate(){

    const template = document.createElement("template");

    template.innerHTML= await fetch("/components/blog-post.html")
        .then(res => res.text());

    class BlogPostTemplate extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({mode: 'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true))

        }

        connectedCallback(){
            // get the id attribute
            const id = this.getAttribute('post-id')
            // fetch the content

        }
    }

    customElements.define('blog-post', BlogPostTemplate);

}





