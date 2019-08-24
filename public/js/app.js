// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data.puzzle)
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data) =>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log('Location: '+ data.location)
//             console.log('Forecast: '+ data.forecast)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search =  document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    const url = '/weather?address='+ encodeURI(location)
    // console.log(location)
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error

        }
        else{
            // console.log('Location: '+ data.location)
            // console.log('Forecast: '+ data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})