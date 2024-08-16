// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];


// Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector("main")
console.log(mainEl)

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = "var(--main-bg)";

// Set the content of mainEl to <h1>DOM Manipulation</h1>. 
mainEl.innerHTML="<h1>DOM Manipulation</h1>"

// Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr");

/** === Part 2: Creating a Menu Bar === */

//Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.querySelector("nav")
console.log(topMenuEl)

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");






/** Part 3: Adding Menu Buttons */
// Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object.
// Append the new element to the topMenuEl element.

for (const key in menuLinks) {
  //console.log(menuLinks[key].text)
  let nav_menu = (document.createElement("a"));
  nav_menu.innerHTML = menuLinks[key].text;
  nav_menu.setAttribute('href', menuLinks[key].href);
  topMenuEl.append(nav_menu);  
}

/** PART 2 STARTS here */

//Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById("sub-menu")
console.log(subMenuEl);

// Set the height of subMenuEl to be 100%.
subMenuEl.style.height = "100%";

//Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

//Add the class of flex-around to the subMenuEl element.
subMenuEl.setAttribute('class', 'flex-around')


//Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = "absolute"

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = 0

//Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.

//const topMenuLinks = []
// for (const key in menuLinks) {
//   topMenuLinks.push(document.querySelector("nav>a"))
// }

const topMenuLinks = document.querySelectorAll("nav>a")
console.log(topMenuLinks);


    //The first line of code of the event listener function should call the event object's preventDefault() method.
    topMenuEl.addEventListener('click', function(e){
    e.preventDefault()

    //The second line of code of the function should immediately return if the element clicked was not an <a> element.
   
    if(!e.target.matches('a')){ return }

     // Log the content of the <a> to verify the handler is working.
    //console.log(e.target);
    //console.log(e.target.textContent);

    //The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
    e.target.classList.toggle('active')

  
    // The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.

    topMenuLinks.forEach(link => {
      if(link!== e.target){
        link.classList.remove('active')
      }
    })
    const clickedLink = menuLinks.find(link =>link.text === e.target.textContent)

    
    if(e.target.classList.contains('active') && clickedLink.subLinks){
      subMenuEl.style.top ="100%"
      mainEl.innerHTML=`<h1>${e.target.textContent}</h1>`
      buildSubMenu(clickedLink.subLinks)
    }else{
      subMenuEl.style.top = 0
      mainEl.innerHTML=`<h1>${e.target.textContent}</h1>`
    }

    function buildSubMenu(subLinks){
      subMenuEl.innerHTML=""

      subLinks.forEach(link =>{
        const a = document.createElement('a')
        a.setAttribute('href', link.href)
        a.textContent = link.text
        subMenuEl.appendChild(a)
      })
    }
  
});

subMenuEl.addEventListener('click', function(e){
  e.preventDefault()
  if(!e.target.matches('a')){
    return
  }
  console.log(e.target);
  subMenuEl.style.top = '0'
  topMenuLinks.forEach(link =>{
    link.classList.remove('a')
  })
  console.log(mainEl.innerHTML);
  
  if(topMenuEl.innerHTML === 'about'){
    mainEl.innerHTML=`<h1>About</h1>`
  }else{
    mainEl.innerHTML=`<h1>${e.target.textContent}</h1>`
  }
})