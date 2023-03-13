const mainEl = document.querySelector(".main");
const resultList = document.querySelector(".result");

const formEl = document.createElement("form");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputsValue = e.target.name.value;
  console.log(inputsValue);
  const response = await fetch(`
  https://api.github.com/search/repositories?q=${inputsValue}&page=1&per_page=10
  `);

  const data = await response.json();
  if (data.items.length !== 0) {
    createRepo(data.items);
    inputEl.value = "";
  } else {
    nothingFound();
    inputEl.value = "";
  }
});

const inputEl = document.createElement("input");
inputEl.classList.add("search-input");
inputEl.setAttribute("name", "name");
inputEl.setAttribute("required", "");
inputEl.setAttribute("minlength", "5");

const searchButtonEl = document.createElement("button");
searchButtonEl.classList.add("search-button");
searchButtonEl.setAttribute("type", "submit");
searchButtonEl.innerHTML = "Поиск";

const removeButtonEl = document.createElement("button");
removeButtonEl.classList.add("delete-button");
removeButtonEl.addEventListener("click", (e) => {
  e.preventDefault();
  resultList.innerHTML = "";
});
removeButtonEl.innerHTML = "Очистить список";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
formEl.appendChild(removeButtonEl);

mainEl.appendChild(formEl);

const nothingFound = () => {
  resultList.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("card-result");
  div.textContent = `По вашему запросу ничего не найдено`;
  resultList.append(div);
  resultList = "";
};

const createRepo = (repoData) => {
  resultList.innerHTML = "";
  for (let el of repoData) {
    let li = document.createElement("li");
    li.classList.add("card-result");
    let repoName = document.createElement("a");
    let repoDescription = document.createElement("div");
    let repoOwner = document.createElement("div");

    repoName.setAttribute("href", el.html_url);
    repoName.setAttribute("target", "_blank");
    repoName.textContent = el.name;

    repoDescription.textContent = el.description
      ? `Описание: + ${el.description}`
      : `Описание отсутствует`;
    repoOwner.textContent = `Автор: + ${el.owner.login}`;
    li.append(repoName);
    li.append(repoOwner);
    li.append(repoDescription);

    resultList.append(li);
  }
  resultList.append(createDeleteBtnEl());
};
