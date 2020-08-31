let url = 'http://localhost:3000/quotes?_embed=likes/'
let quoteUrl = 'http://localhost:3000/quotes/'
const quoteList = document.getElementById('quote-list')
const createQuoteForm = document.getElementById('new-quote-form')
const likesUrl = 'http://localhost:3000/likes'
let newLikes = 0

fetch(url)
.then(res => res.json())
.then(queryQuotes => queryArray(queryQuotes))

function queryArray(queryQuotes){
    queryQuotes.forEach(quote => displayQuote(quote))
}


function displayQuote(quote){
    const quoteLi = document.createElement('li')
    quoteLi.className = 'quote-card'
    
    const blockQuote = document.createElement('blockquote')
    blockQuote.className = 'blockquote'
    quoteLi.append(blockQuote)

    const p = document.createElement('p')
    p.className = 'mb-0'
    p.innerText = quote.quote
    
    const footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.innerText =  quote.author

    const br = document.createElement('br')

    const likesBtn = document.createElement('button')
    likesBtn.className = 'btn-success'
    likesBtn.innerText = 'Likes: ' 
    const likeSpan = document.createElement('span')
    likeSpan.innerText = newLikes
    likesBtn.append(likeSpan)

    likesBtn.addEventListener('click', () => {
        ++newLikes 
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                quoteId: quote.id
            })
        }
        fetch(likesUrl, configObj)
        .then(res => res.json())
        .then(likeSpan.innerText = newLikes)
    })

    const delBtn = document.createElement('button')
    delBtn.className = 'btn-danger'
    delBtn.innerText = 'Delete'
    
    blockQuote.append(p, footer, br, likesBtn, delBtn)

    delBtn.addEventListener('click', () =>{
        fetch(quoteUrl+quote.id, {
            method: 'DELETE'
        })
        .then(() => quoteLi.remove())
    })

    quoteList.append(quoteLi)

}

createQuoteForm.addEventListener('submit', () =>{
    event.preventDefault()
    const quote = event.target[0].value
    const author = event.target[1].value
    
    let configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            quote, 
            author
        })
    }
    fetch(url, configObj)
    .then(res => res.json())
    .then(newQuote => displayQuote(newQuote))

})