(() => {
    const STYLE = `<link rel="stylesheet" href="style.css"></link>`;

    class MyCustomElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
      
        static get observedAttributes() {
            return ["data-structure"];
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-structure") {
                this.structure = newValue;
                this.render();
            }
        }

        get structure() {
            return this._structure;
        }
    
        set structure(value) {
            this._structure = JSON.parse(value);
        }
    }
    
    class MyTree extends MyCustomElement {
        render() {
            this.shadowRoot.innerHTML = (this.structure.items || []).reduce(
                (accumulator, i) => accumulator + `<my-leaf data-structure='${JSON.stringify(i)}'></my-leaf>`,
                `${STYLE} ${this.structure.id}`
            );
        }
    }
    
    class MyLeaf extends MyCustomElement {
        render() {
            this.shadowRoot.innerHTML = `${STYLE} <my-tree data-structure='${JSON.stringify(this.structure)}'></my-tree>`;
        }
    }
      
    customElements.define("my-tree", MyTree);
    customElements.define("my-leaf", MyLeaf);
    

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
    
    const wrapper = document.getElementById("wrapper");
    wrapper.attachShadow({ mode: "open" });

    wrapper.shadowRoot.innerHTML = `${STYLE} <my-tree data-structure='${JSON.stringify(structure)}'></my-tree>`;
})();

// Для динамического задания структуры из консоли
// document.getElementById("wrapper").shadowRoot.querySelector("my-tree").setAttribute("data-structure", JSON.stringify(/* newStructure */));