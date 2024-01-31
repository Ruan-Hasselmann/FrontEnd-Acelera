document.getElementById('btn').addEventListener('click', (e) => {
    textarea = document.getElementById('texto').value;
    result = document.getElementById('result');
    arrayWords = textarea.replace(/\s+/g, ' ').split(' ');
    result.innerText = arrayWords.length - 1;
});