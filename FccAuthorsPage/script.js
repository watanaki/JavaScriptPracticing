const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let startingIndex = 0, endingIndex = 8;
let authorDataArr = [];

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then(res => res.json())
  .then(data => {
    authorDataArr = data;
    console.log(data);
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex))
  }).catch(err => {
    authorContainer.innerHTML = `<p class="error-msg">
      There was an error loading the authors
    </p>`
  });

const displayAuthors = authors => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
      <div id="${index}" class="user-card">
        <h2 class="author-name">${author}</h2>
        <image class="user-img" src="${image}" alt="${author} avatar"></image>
        <div class="purple-divider"></div>
        <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
        <a class="author-link" href="${url}" target="_blank">${author} 's author page</a>
      </div>
    `;
  });
}

loadMoreBtn.addEventListener("click", () => {
  if (endingIndex < 0) {
    alert("That's all!");
    return;
  }
  endingIndex += 8;
  startingIndex += 8;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex > 26 ? 26 : endingIndex));
  if (endingIndex >= 26) {
    endingIndex = -1;
  }
})

document.getElementById('reset-content').addEventListener('click', () => {
  authorContainer.textContent = '';
  startingIndex = -8;
  endingIndex = 0;
})