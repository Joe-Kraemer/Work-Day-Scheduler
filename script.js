// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let schedule = {}

const handleClick = (id, text) => {
schedule[id] = text
localStorage.setItem("schedule", JSON.stringify(schedule));

}
$(function () {

  const now = dayjs().toString()
  console.log(now)
  const timeText = document.getElementById('currentDay')
  timeText.innerHTML = now
  if (localStorage.getItem('schedule')){
    schedule = JSON.parse(localStorage.getItem('schedule'))
  }
  let currentHour = dayjs().hour()
  currentHour = dayjs().format('h') // gets current hour
    const blocks =document.querySelectorAll("[id^='hour']")
  blocks.forEach(block=>{
    let hour = block.id.split('-')
  
    const date1 = dayjs();
    const date2 = dayjs().hour(parseInt(hour[1]));
    
    let hours = date2.diff(date1, 'hours');
    const days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    console.log(hours)
    if (hours > 12 ){
      //future
     block.classList.remove('future','present')
     block.classList.add('past')
    } else if(hours==0){
      //present
      block.classList.remove('future','past')
      block.classList.add('present')
    } else {
      //past
      block.classList.remove('present','past')
      block.classList.add('future')
    }
    const text = block.children[1].value
    const button = block.children[2]
    button.addEventListener("click", handleClick(hour[1], text))
  })

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
