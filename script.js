const RANDOME_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

//
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

//Getting quote using fetch and converting it to JSON and grabbing the quote by referencing the content key logs in the console the status of each fetch
function getRandomQuote() {
    return fetch(RANDOME_QUOTE_API_URL)
     .then(response => {
         if (response.ok) {
             console.log('Successfully loaded quote from API')
         }
         else {
             console.log('Failed to load quote from API')
         }
         response.json()
     })
     .then(data => data.content)
}j

//Get new quote from API and split the quote to characters and iterate through the string and append to quoteDisplayElement
async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

//Starting a timer by setting an interval of 1000 ms and setting equal to current datetime
let startTime
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()