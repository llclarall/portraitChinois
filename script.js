"use strict"

var data
document.addEventListener("DOMContentLoaded", function () {

/* liaison au fichier analogies.json */
  fetch('analogies.json').then(function (response) {
    response.json().then(function (datajson) {
      console.log(datajson);
      data = datajson;
      console.log(data)
      listerAnalogies() 
    })
  })


/* page glissante footer */
var piedDePage = document.querySelector("footer");
piedDePage.style.overflow = "hidden";
var hauteur = piedDePage.clientHeight;
piedDePage.style.height = "5em";

document.querySelector("footer h1").addEventListener("click", function (event) {
  if (piedDePage.style.height == "5em") {
    var animationPiedDePage = piedDePage.animate([{ "height": hauteur + "px" }], { "duration": 500 });
    animationPiedDePage.addEventListener("finish", function () {
      piedDePage.style.height = hauteur + "px";
      window.scrollTo({
        top: document.body.scrollHeight, // fait défiler vers le bas jusqu'à la fin du contenu de la page
        behavior: 'smooth' 
      });
    });
  } else {
    var animationPiedDePage = piedDePage.animate([{ "height": "3em" }], { "duration": 500 });
    animationPiedDePage.addEventListener("finish", function () {
      piedDePage.style.height = "5em";
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
    setTimeout(function () {
      piedDePage.style.height = "5em";
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 490);
  }
});


  /* création section */
  var numCase = 0
  function listerAnalogies() {
    console.log(data)
    data.forEach(function (element) {
      console.log(numCase + " Si j'étais " + element.analogie + ', je serais ' + element.valeurAnalogie);
      var liste = document.querySelector(".liste-analogies")
      liste.innerHTML += '<div class="section"><div class="parent" id=' + element.id + '> <img alt='+ element.alt +' src=' + element.imgFond + ' class="imgFond"> ' + " <section> <h2> Si j’étais <span class='analogie'>" + element.analogie + '</span>,<br> je serais <span class="valeur">' + element.valeurAnalogie + " </span> </h2>  </section> <div class='container' id=" + element.id + " > <p>" + element.texte + "<br> <br>" + "</p>  </div> </div></div>";
      numCase++;
    });
  }



  /* magnétisme entre les sections */
  document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
      smoothScroll(`#${section.id}`);
    });
  });
  
  function smoothScroll(target) {
    const element = document.querySelector(target);
    const position = element.offsetTop;
  
    window.scrollTo({
      top: position,
      behavior: 'smooth' // Défilement fluide vers la section
    });
  }
  

  /* change titre onglet */
  var docTitle = document.title;

  window.addEventListener("blur", () => {
    document.title = "I'll wait for you";
  });
  window.addEventListener("focus", () => {
    document.title = docTitle;
  });



  /*vérification que les champs nécessaires sont remplis avant d'envoyer ledonnées et analogie utilisateur*/
  /* aide d'Emilie Desgranges TPC*/

  document.querySelector('#Envoi').addEventListener('click', function (event) {
    event.preventDefault();  
    if (document.querySelector("#theme").value==='' || document.querySelector("#suggestion").value===''){
    alert('Veuillez remplir les champs "Si j\'étais" et "Je serais".');
      return false;
     }
     if (!document.querySelector("#image").value.includes('.') && document.querySelector("#image").value!=="") {
      alert('Veuillez remplir le champs image avec une URL (.png .jpg .gif ect...)');
      return false;
     }
     if (!document.querySelector("#email").value.includes('@'))  {
      alert('Veuillez remplir le champs email avec une adresse mail');
      return false;
     }
    else {    
    document.querySelector('#user').innerHTML += "<div class='parent'> <div class='imgFond' style='background-image:url(" + document.querySelector('#image').value + ")'> <section> <h2> Si j'étais <span class='analogie'>" + document.querySelector("#theme").value + "</span>, je serais <span class='valeur'>" + document.querySelector("#suggestion").value + "</span> </h2> " + " </section> </div> <div class='container'> <p>  Car " + document.querySelector("#reason").value + " </p> <br><br></div> </div>";
  };
    })


  /* envoi à API */
  document.querySelector('#Envoi').addEventListener('click', function (event) {
    event.preventDefault();
  fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=clara.moubarak&courriel=" + document.querySelector("#email").value + "&message=Si j'étais " + document.querySelector("#theme").value + ", je serais " + document.querySelector("#suggestion").value + " car " + document.querySelector("#reason").value + "<br><br> <img src='" + document.querySelector("#image").value).then(function (response) {
    response.json().then(function (data) {
      if (data.status == "success") {
        document.querySelector("#message").innerHTML = "Bien reçu !";
      } else {
        document.querySelector("#message").innerHTML = "Oops, erreur ";
      }
    })
  })
  })
});

