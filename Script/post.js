// Nav Change

let nav = document.querySelector('body>nav');
let links = document.querySelectorAll('body>nav>ul>li>a');
let logo = document.querySelector('body>nav>a>img');
let hero = document.getElementById("hero");
let heroHeight = hero.scrollHeight;
let title = document.getElementById("title");
let navTitle = document.querySelector('.navTitle');

window.addEventListener('scroll', function() {
    let scrollHeight = window.pageYOffset
    if (scrollHeight > heroHeight - 50) {
        nav.classList.add("scrolled");
        links[0].classList.add("scrolled");
        links[1].classList.add("scrolled");
        navTitle.innerHTML = title.textContent;
        logo.style.filter = "invert(100%) sepia(8%) saturate(7490%) hue-rotate(182deg) brightness(305%) contrast(102%)";
        logo.style.height = "2rem"
        nav.style.alignItems = "center";
        nav.style.boxShadow = "0 0 0.5rem 0rem #000";
        nav.style.padding = "0rem 1rem 0rem 1rem"
    } else {
        nav.classList.remove("scrolled");
        links[0].classList.remove("scrolled");
        links[1].classList.remove("scrolled");
        logo.style.filter = "";
        navTitle.innerHTML = "";
        logo.style.height = ""
        nav.style.alignItems = "flex-start";
        nav.style.boxShadow = "none";
        nav.style.padding = "1rem 1rem 0rem 1rem"
    }
});

// Recomendations

// Find Current post number
let fileName = location.pathname.split("/").slice(-1)
let currentHref = fileName.toString()
let currentNb = currentHref.split(".").shift()

// Fetch Posts from JSON

const postTemplate = document.getElementById('postTemplate')
const postSection = document.getElementById('posts')

getData()
    .catch(err => console.log(err));

async function getData() {
    const postStream = await fetch('/thomasmineo/Data/posts.json');
    const posts = await postStream.json();
    let i = 0;

    // Filter based on category and nb

    posts.forEach(post => {
        let category = post.category;
        let currentCategory = document.getElementById("category").innerHTML;
        let id = post.id;

        if (category === currentCategory && id != currentNb) {
            i++;

            if (i <= 4) {

                // And then insert the posts using a recomendation template

                const title = post.title;
                const heroImg = post.heroImg;
                const href = post.href;

                const newPost = document.importNode(postTemplate.content, true);
                const postDiv = newPost.querySelector('#post');
                const postHref = postDiv.querySelector('.post__href');
                const postTitle = newPost.querySelector('.post__title');
                const postImg = newPost.querySelector('.post__img');

                postDiv.id = `article${i}`;
                postHref.href = href;
                postTitle.innerText = title;
                postImg.src = heroImg;

                postSection.appendChild(newPost);
            } else {
                console.log("done")
            }
        } else {
            console.log("no similar posts")
        }
    });
}

// Function to update the json list of posts with the current page's information        

// Asign current values to variables and create a json object
let currentCategory = document.getElementById("category").innerHTML;
let currentSubtitile = document.getElementById("subtitle").innerText;
let tempHeroImg = document.getElementById("hero");
let tempHeroImg2 = getComputedStyle(tempHeroImg).backgroundImage;
let tempHeroImg3 = tempHeroImg2.split('url').slice(1);
let tempHeroImg4 = tempHeroImg3.toString().split('0/').slice(1);
let tempHeroImg5 = tempHeroImg4.toString().split('")').slice(0, -1)
let currentHeroImg = "../" + tempHeroImg5.toString();
let currentTitle = title.innerText;


function post(id, category, title, subtitle, heroImg, href) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.subtitle = subtitle;
    this.heroImg = heroImg;
    this.href = href;
}

const currentPost = new post(currentNb, currentCategory, currentTitle, currentSubtitile, currentHeroImg, currentHref);