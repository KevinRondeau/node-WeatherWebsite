/* --------------------------- Form EventListener --------------------------- */
//#region 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    //prevent auto refresh from the browser so you can handle the rest
    e.preventDefault()
    const location = searchElement.value
    //fetch=get a response from a page ( for exemple a json file) --->then method will tell what to do with the fetched response
    message1.textContent = 'Loading'
    message2.textContent = ''
    fetch('/weather?adress=' + location).then((response) => {
        // //response.json()    --->get the data in a json format
        response.json().then((data) => {
            if (data.error) {
                //textContent   ->change content of paragraphs
                message1.textContent = data.error
                message2.textContent = ''
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})
//#endregion