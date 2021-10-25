import { baseURL } from "../utils/constants.js";

/**
 * TasksList class represents an HTML element for a list of tasks.
 * It fetches tasks for the given project id and renders tasks in an appropriate custom elements
 * using fetched data.
 * @attributes { id - projectId }
 *
 * @extends {HTMLElement}
 */
class TasksList extends HTMLElement {
  constructor() {
    super();
  }

  // Subscribing on changes for stated elements
  static get observedAttributes() {
    return ["loading", "tasks"];
  }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }

  get tasks() {
    return JSON.parse(this.getAttribute("tasks"));
  }
  set tasks(v) {
    this.setAttribute("tasks", JSON.stringify(v));
  }

  get id() {
    return JSON.parse(this.getAttribute("id"));
  }
  set id(v) {
    this.setAttribute("id", JSON.stringify(v));
  }

  /**
   * Function for fetching tasks
   *
   * @param {string} url
   * @returns {Promise}
   */
  async fetchTasks(url) {
    this.loading = true;

    const response = await fetch(url);
    const json = await response.json();

    this.tasks = json;
    this.loading = false;
  }

  // Executes each time element is added to the DOM
  async connectedCallback() {
    this.setAttribute("class", "d-block");

    await this.fetchTasks(`${baseURL}/Tasks/Get?project-id=${this.id}`);
  }

  // Executes each time one of the subscribed attributes changed
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  // Render element
  render() {
    if (this.loading) {
      this.innerHTML = `<p>Loading...</p>`;
    } else {
      this.innerHTML = `
        ${this.tasks
          .map((task) => {
            return `
            <task-item class="card" projectId="${this.id}" id="${task.id}" title="${task.title}" description="${task.description}" checked="${task.checked}"></task-item>
          `;
          })
          .join("")}
      `;
    }
  }
}

customElements.define("tasks-list", TasksList);
