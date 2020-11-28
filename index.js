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

function getParks(stateCode, limit) {
  fetch(
    `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${stateCode}&limit=${limit}`
  )
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
  $(".results").empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $(".results").append(`
      <div class="parkInformation">
      <h4>${responseJson.data[i].fullName}</h4>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}" target="_blank">Click here to visit the park's website</a></p>
     </div>`);
  }

  $(".results").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let stateCode = $('input[name="nationalParkName"]').val().toUpperCase();
    let limit = $('input[name="max-results"]').val();
    getParks(stateCode, limit);
    console.log(stateCode, limit);
  });
}

$(function () {
  console.log("App loaded! Waiting for submit!");
  watchForm();
  // getParks("NY,FL", 15);
});
