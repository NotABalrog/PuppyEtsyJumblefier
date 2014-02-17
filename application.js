$(document).ready(function () {
    var results = "data not filled";


    $("#getJumble").on("click", function () {

        var puppyBreed = $('.textBox').val();
        console.log(puppyBreed);
        word = randomWord();
        var term = (puppyBreed + " " + word);

        var data = getEtsyImages(term).done(handleData);
        $("#etsyContainer").empty();
        console.log(word);
        $('#searchTerm').html(term);
    });

    $(".puppies").on("click", function () {   
        var puppyBreed = $(this).attr("title");
        var word = randomWord();
        
        $("#etsyContainer").empty();


        if (puppyBreed == "random") {
            console.log("random selected");
           
            puppyBreed = randomDog();
            var term = (puppyBreed + " " + word);
            getEtsyImages(term).done(handleData);
            $('#searchTerm').html(term);
        }

        else {
            var term = (puppyBreed + " " + word);
            getEtsyImages(term).done(handleData);
            $('#searchTerm').html(term);
        }
    });
});


dogBreeds = [
  "Labrador Retriever", "German Shepherd", "Beagle", "Golden Retriever", "Yorkshire Terrier", "Bulldog", "Boxer",
  "Poodle", "Boxer", "Bulldog", "Rottweiler", "Xoloitzcuintle", "Whippet",
  "Wirehaired", "Affenpinscher", "Afghan Hound", "Aidi", "Airedale Terrier", "Akita", "Klee Kai",
  "Malamute", "Dachsbracke", "Spaniel", "Eskimo Dog", "Foxhound", "Hairless Terrier", "Pit Bull Terrier", "Staffordshire Terrier", "Water Spaniel", "Shepherd Dog",
  "Sennenhund", "Pointer", "Hound", "Cattle Dog", "Kelpie", "Silky Terrier", "Pinscher", "Bavarian Mountain Hound", "Malinois", "puppy", "Elkhound", "bird", "lizard", "pet", "novelty",
  "Bloodhound", "Coonhound", "Boerboel", "Border Collie", "Boston Terrier", "Bull Terrier", "Catalan Sheepdog", "Caucasian Shepherd Dog", "Chesapeake Bay Retriever", "Chinook", "Chow Chow", "Combai",
   "Cretan Hound", "Cumberland Sheepdog", "Dalmatian", "Dutch Shepherd Dog", "Smoushond", "Mastiff", "Setter",
   "Shepherd", "Water Spaniel", "Mountain Dog", "Eurasier", "Lapphund", "Retriever", "Brittany",
   "Great Dane", "Pyrenees", "Harehound", "Greyhound", "Poi Dog", "Hokkaido", "Wolfhound", "King Charles Spaniel",
   "Jindo Dog", "Kyi-Leo", "Husky", "Heeler", "Herder", "King Shepherd",
   "Whippet", "Maltese", " Hairless Dog", "Shar Pei", "Watchdog", "Pekingese", "Pharaoh Hound",
   "ridgeback", "Hunting Dog", "Poodle", "Pug",
];

function randomDog() {
    var randomDog = (dogBreeds[Math.floor(Math.random() * dogBreeds.length)])
    return randomDog;
};

function getEtsyImages(term) {


    //replace with my api key
    api_key = "a1tvo40ptf7rmzd88q7244mm";
    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
                        term + "&limit=12&includes=Images:1&api_key=" + api_key;

    return $.ajax({

        url: etsyURL,
        dataType: 'jsonp',
        type: 'GET'
    });
};

function handleData(data) {
    if (data.count > 0) {
        $.each(data.results, function (i, item) {
            var trimmedDescription = trimAndAddElipses(item.description);
            console.log("data is beeing handled");
            $('#etsyContainer').append("<div class='imgWrapper col-md-4'><a href='" + item.url + "'><img class='etsyImg' src='" + item.Images[0].url_570xN + "' /></a><div class='title'><h4></h4><p>" + trimmedDescription + "</div></div>");
        });
    }
    else {
    
        $('#etsyContainer').append("<h3>No Results, don't stop now though, the etsy needs to be jumbled!</h3>");

        console.log("noResults")
    }
};

function trimAndAddElipses(inputTitle) {
    var titleLength = inputTitle.split(" ").length;
    console.log(titleLength);
    if (titleLength >= 16) {
        var trimmedTitle = inputTitle.substring(0, 45) + ("...");
        console.log("title has been trimmed");
        return trimmedTitle;
    };
};

randomWords = [
  "clothing", "art", "painting", "hat", "cufflinks", "costume", "bed",
  "phone", "pet costume", "clothing", "garland", "beard hat", "art print",
  "journal", "trucker hat", "journal", "bag", "case", "collar", "tent",
  "leash", "bowl", "jacket", "stein", "quilt", "server", "garter", "cup", "decoration", "ornament",
  "kimono", "uniform", "bowl", "belt", "corset", "trash can", "watch", "lighter", "gift", "realism", "surreal",
  "guitar", "ouija board", "spindle", "clip", "toy", "calendar", "stand", "garmet", "jacket", "shoes", "slippers", "knitted",
   "print", "hipster", "personalized", "organic", "custom", "awesome", "funny",
   "rustic", "antique", "abstract", "gamer", "retro", "weathered", "modern",
   "authentic", "handmade", "monogrammed", "crocheted", "recycled", "eco-friendly", "funny", "sterling",
   "louis vuitton", "macabre", "extensions", "amusing", "interesting", "charity",
   "marvel", "monocle", "abstract", "platinum", "rock crystal", "raggedy", "suede",
   "tintype", "givenchy", "shibori", "haskell", "greek", "vintage", "sticker", "tape", "bumper-sticker",
   "vuitton", "art nouveau", "harry potter", "iolite", "mexican silver", "natural", "sign", "label", "LED", "movie"
];

function randomWord() {
    var randomWord = (randomWords[Math.floor(Math.random() * randomWords.length)])
    return randomWord;
};
