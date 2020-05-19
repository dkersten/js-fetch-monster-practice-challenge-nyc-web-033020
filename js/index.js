const BASE_URL = 'http://localhost:3000/monsters/'
const LIMIT_SEARCH_URL = '?_limit=50'

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const monContainerDiv = document.querySelector('#monster-container')

    const createMonster = () => {
        const formContainerDiv = document.querySelector('#create-monster')
        const createMonsterForm = document.createElement('form')
        createMonsterForm.id = "monster-form"

        formContainerDiv.appendChild(createMonsterForm)
        createMonsterForm.innerHTML += `
            <input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button>
        `

        const monsterName = document.querySelector('input#name')
        const monsterAge = document.querySelector('input#age')
        const monsterDescription = document.querySelector('input#description')

        createMonsterForm.addEventListener('submit', (e) => {
            e.preventDefault()

            console.log(monsterName.value)
            console.log(monsterAge.value)
            console.log(monsterDescription.value)

            fetch("http://localhost:3000/monsters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: monsterName.value,
                    age: monsterAge.value,
                    description: monsterDescription.value
                })
            })
                .then(resp => resp.json())
                .then(json => addMonster(json))
            
            e.target.reset()
        })

        let addMonster = (monster) => {
            const monCardDiv = document.createElement('div')
                monCardDiv.className = 'card'
                monContainerDiv.appendChild(monCardDiv)
                monCardDiv.innerHTML += `
                    <h2>${monster.name}</h2>
                    <h4>Age: ${monster.age}</h4>
                    <p>${monster.description}</p>
                `
            monContainerDiv.prepend(monCardDiv)
        }

    }
    createMonster()



    fetch(`${BASE_URL}${LIMIT_SEARCH_URL}`)
        .then(resp => resp.json())
        // .then(json => console.log(json))
        .then(json => renderMonsters(json))

        function renderMonsters(data) {
            for (let i = 0; i < data.length; i++) {

                //logic to create card (move to helper function)
                const monCardDiv = document.createElement('div')
                monCardDiv.className = 'card'
                monContainerDiv.appendChild(monCardDiv)
                monCardDiv.innerHTML += `
                    <h2>${data[i].name}</h2>
                    <h4>Age: ${data[i].age}</h4>
                    <p>${data[i].description}</p>
                `

            }
        }


    // At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

});