/**
 * TodoItem class represents an HTML element for one todo item in a list
 * @extends {HTMLElement}
 */
class TodoItem extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");

    template.innerHTML = `<style>
    :host {
      display: block;
    }
    </style><slot></slot>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

customElements.define("todo-item", TodoItem);
