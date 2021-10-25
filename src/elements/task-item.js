import { baseURL } from "../utils/constants.js";

/**
 * TasksList class represents an HTML element for one task in a project.
 * It can be used separately from <task-list> element but in that case it should be provided with an appropriate attributes.
 * @attributes { id, projectId, title, description, checked - status of the task }
 *
 * @extends {HTMLElement}
 */
class TaskItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  get checked() {
    return JSON.parse(this.getAttribute("checked"));
  }

  set checked(v) {
    this.setAttribute("checked", JSON.stringify(v));
  }

  get id() {
    return JSON.parse(this.getAttribute("id"));
  }

  set id(v) {
    this.setAttribute("id", JSON.stringify(v));
  }

  get projectId() {
    return JSON.parse(this.getAttribute("projectId"));
  }

  async saveProjectStatus(status) {
    try {
      // const response = await fetch(`${baseURL}/Tasks/Save`, {
      //   method: "post",
      //   body: JSON.stringify({
      //     "project-id": this.projectId,
      //     "task-id": this.id,
      //     checked: this.checked,
      //   }),
      // });
      // const json = await response.json();
      // return json[0];

      // Fake GET request for testing purposes. Correct code is above
      const response = await fetch(`${baseURL}/Tasks/Save`);
      const json = await response.json();
      return json[0];
    } catch (error) {
      return {
        status: "error",
      };
    }
  }

  connectedCallback() {
    this.addEventListener("click", async (e) => {
      e.preventDefault();
      const output = await this.saveProjectStatus(!this.checked);
      if (output.status === "success") {
        this.checked = !this.checked;
      }
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  render() {
    const attributes = {
      title: this.getAttribute("title"),
      description: this.getAttribute("description"),
      checked: this.getAttribute("checked") == "true",
    };

    if (attributes.checked) {
      this.setAttribute("class", "card mb-3 text-white bg-success");
    } else {
      this.setAttribute("class", "card mb-3 text-white bg-danger");
    }

    this.innerHTML = `
      <div class="card-header">${attributes.title}</div>
      <div class="card-body">
        <p class="card-text">${attributes.description}</p>
      </div>
    `;
  }
}

customElements.define("task-item", TaskItem);
