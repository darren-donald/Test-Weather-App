
// console.log('Yep works')

    


const weatherForm = document.querySelector('form')
const searchString = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchString.value
    
    message1.textContent = 'Loading.....'
    message2.textContent = ''

    const url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = 'Feels like: ' + data.forecast.Feels_like + ' Forecast: ' + data.forecast.forecast
                console.log(data.location)
                console.log(data.forecast)
                    
            }
        })
    })
})