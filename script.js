const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//Show Loading
function Loading(){
    loader.hidden = false;
    quoteContainer.hidden = true; 

}
//Hide Loader
function complete(){
    if(!loader.hidden){
        loader.hidden =true;
        quoteContainer.hidden = false;
    }

}

//Get Quote From Api
async function getQuote() {
    Loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUri = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl +apiUri);
        const data = await response.json();
        // If Author is blank, add Unknown 
        if(data.quoteAuthor === ''){
            authorText.innerText === 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;

        }
        //Reducing the font if Quote is long
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
       
        quoteText.innerText = data.quoteText; 
        complete();
        
    }catch(error){
       getQuote();
        
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

//EventLinstener for Buttons
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();
