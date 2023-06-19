export default function capitalizeFirstLetter(phrase) {
    let capitalizedPhrase;
    let phraseWords = phrase.split(' ');
    capitalizedPhrase = phraseWords.map(word => `${word.charAt(0).toUpperCase() + word.slice(1)}`)

    return capitalizedPhrase.join(' ');
}