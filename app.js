const apiURL = " http://localhost:3000/dogBreeds";

const form = document.querySelector("form");
const button = document.querySelector("#uploadDog");
console.log(button);

button.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(event);
  uploadDogBreed(event);
});
// Creating a function to upload the dog breed to the server
function uploadDogBreed(event) {
  //   event.preventDefault();
  const dogBreed = document.querySelector("#breed").value;
  const dogImageURL = document.querySelector("#image-url").value;
  const dogTemperament = document.querySelector("#temperament").value;
  console.log(dogBreed);
  console.log(dogImageURL);
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Application-Type": "application/json",
    },
    body: JSON.stringify({
      breed: dogBreed,
      image: dogImageURL,
      temperament: dogTemperament,
    }),
  })
    .then((response) => response.json())
    .then((dogBreed) => {
      console.log(dogBreed);
    });
}

// When the DOM loads the each image will render inside the content div
document.addEventListener("DOMContentLoaded", () => {
  fetch(apiURL)
    .then((response) => response.json())
    .then((dogBreeds) => {
      dogBreeds.forEach((dogBreed) => {
        const content = document.querySelector(".content-conatiner");
        // Creating a card div for each dog breed
        const card = document.createElement("div");
        card.classList.add("card");
        content.appendChild(card);
        // Creating a h2 element for each dog breed
        const breedName = document.createElement("h2");
        breedName.textContent = dogBreed.breed;
        card.appendChild(breedName);
        // For each dog breed, create a img element and set the src attribute to the image url
        const img = document.createElement("img");
        img.src = dogBreed.image;
        card.appendChild(img);
        content.appendChild(card);

        // Creating temperament qualities for each dog breed and appending them to the card
        dogBreed.temperament.forEach((temperament) => {
          const qualities = document.createElement("p");
          qualities.textContent = `I am ${temperament}`;
          card.appendChild(qualities);
        });

        // Creating an Adopt me Button for each dog breed
        const adoptMeButton = document.createElement("button");
        adoptMeButton.textContent = "Adopt Me";
        card.appendChild(adoptMeButton);
      });
    });
});
