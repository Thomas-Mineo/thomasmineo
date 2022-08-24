// // Post the object to the JSON file
// const postData = post => {
//     let jsonUrl = '../Data/posts.json'
//     const options = {
//         method: 'POST',
//         body: JSON.stringify(post),
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         })
//     }

//     return fetch(jsonUrl, options)
//         .then(res => res.json())
//         .then(posts => console.log(posts))
//         .catch(err => console.log(err));
// }

// postData(currentPost);