// document.querySelector('span').innerHTML = 'HaHa';
let span = document.querySelector('span');
let color = window.getComputedStyle(span).color;
console.log(color);