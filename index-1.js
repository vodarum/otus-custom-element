class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    get style() {
        return `<link rel="stylesheet" href="style.css"></link>`;
    }
}

class MyCustomStructureElement extends MyCustomElement {
    static get observedAttributes() {
        return ["data-structure"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "data-structure") {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `${this.style} <my-tree></my-tree>`;
    }
}

class MyGround extends MyCustomStructureElement {}
class MyLeaf extends MyCustomStructureElement {}
class MyTree extends MyCustomElement {
    connectedCallback() {
        const structure = JSON.parse(this.parentNode.host.getAttribute("data-structure"));

        this.shadowRoot.innerHTML = (structure.items || []).reduce(
            (accumulator, i) => accumulator + `<my-leaf data-structure='${JSON.stringify(i)}'></my-leaf>`,
            `${this.style} ${structure.id}`
        );
    }
}
  
customElements.define("my-ground", MyGround);
customElements.define("my-leaf", MyLeaf);
customElements.define("my-tree", MyTree);


const structure = {
    id: "A1",
    items: [
        {
            id: "B1",
            items: [
                {
                    id: "C1",
                    items: [
                        {
                            id: "D1"
                        },
                        {
                            id: "D2"
                        }
                    ]
                }
            ]
        },
        {
            id: "B2",
            items: [
                {
                    id: "C2"
                },
                {
                    id: "C3"
                }
            ]
        }
    ]
};

document.getElementById("wrapper").innerHTML = `<my-ground data-structure='${JSON.stringify(structure)}'></my-ground>`;

// Для динамического задания структуры из консоли
// document.getElementById("wrapper").querySelector("my-ground").setAttribute("data-structure", JSON.stringify(/* newStructure */));