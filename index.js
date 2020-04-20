addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

 function changeHtmlContent(response,variant){
    var changeContent =  new HTMLRewriter().on('title', {element(element){
  	element.setInnerContent("Variant"+(variant+1));
  }}).on('h1#title', {element(element){
  	element.setInnerContent("Cloudflare Full Stack Internship Assignment");
  }}).on('p#description', {element(element){
  	element.setInnerContent("I love creating and building apps and figuring out how things work.");
  }}).on('a#url', {element(element){
  	element.setInnerContent("Checkout my latest work");
  	element.setAttribute("href","http://arunbalaji-srinivasan.github.io/");
  }}).transform(response);
  return changeContent;
}


async function handleRequest(request) {
  const url = 'https://cfw-takehome.developers.workers.dev/api/variants';
  const response = await fetch(url) .then(res => res.json()) 
  var variants= [];
  variants = response['variants'];
  var variant = Math.round(Math.random());
  var responseData = await fetch(variants[variant]);
  return changeHtmlContent(responseData ,variant);
}
