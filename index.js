"use strict";

var myHeaders = new Headers();
myHeaders.append(
  "Cookie",
  "AWSALB=aLyNMGwT4sJFpKAvcC5ISG/49vk92Uuymo3ibeptssgTHEfUZu6KpQkpQ5b3eQHQucoq9/BUMDXxuzzKeYETtzrP9R7bl+rXnm3jjkj7wwKzMKb9X/rQ4jTiliU4; AWSALBCORS=aLyNMGwT4sJFpKAvcC5ISG/49vk92Uuymo3ibeptssgTHEfUZu6KpQkpQ5b3eQHQucoq9/BUMDXxuzzKeYETtzrP9R7bl+rXnm3jjkj7wwKzMKb9X/rQ4jTiliU4"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let apiKey = "tZ6NWjkWvoNpgJc6WXhYEPNwl59yJyXbw1U5FNRD";
let url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}`;

function getParks() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayParks(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayParks(responseJson) {
  // if there are previous results, remove them
  $(".results").empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.data.length; i++) {
    let nameOfParks = $('input[name="nationalParkName"]').val().toUpperCase();
    if (nameOfParks === responseJson.data[i].states) {
      $(".results").append(
        `<div class="parkInformation">
          <h4>${responseJson.data[i].fullName}</h4>
          <p>${responseJson.data[i].description}</p>
          <p><a href="${responseJson.data[i].url}" target="_blank">Click here to visit the park's website</a></p>
         </div>`
      );
    }
  }
  //display the results section
  $(".results").removeClass("hidden");
}

// function multipleParkNames() {
//   let nameOfParks = $('input[name="nationalParkName"]').val();
// }

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let nameOfParks = $('input[name="nationalParkName"]').val().toUpperCase();
    getParks(nameOfParks);
  });
}

$(function () {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});

// Requirements:
// 1) The user must be able to search for parks in one or more states.
// 2) The user must be able to set the max number of results, with a default of 10.
// 3) The search must trigger a call to NPS's API.
// 4) The parks in the given state must be displayed on the page. Include at least:
//    * Full name
//    * Description
//    * Website URL
// 5) The user must be able to make multiple searches and see only the results for the current search.
