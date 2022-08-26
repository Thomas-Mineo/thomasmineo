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
    const postStream = await fetch('/Data/posts.json');
    const posts = await postStream.json();
    let i = 0;

    posts.forEach(post => {

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
    });
}