Az.Morph.init("../dicts", function (err, Morph) {
  document.getElementById("word").addEventListener("keyup", updateMorph, false);
  updateMorph();

  let activeButton = document.querySelectorAll("button");

  activeButton.forEach((element) => {
    element.addEventListener("click", () => {
      activeButton.forEach((elem) => {
        elem.classList.remove("selected");
      });
      element.classList.add("selected");
      updateMorph();
    });
  });
});

function updateMorph() {
  let letiants = Az.Morph(document.getElementById("word").value, {
    typos: 0,
  });
  if (0 < letiants.length && letiants.length < 6) {
    let declination = document.querySelector(".selected").value;
    for (let i = 0; i < letiants.length; i++) {
      if (letiants[i].formCnt) {
        for (let formIdx = 0; formIdx < 6; formIdx++) {
          let form = letiants[i].inflect(formIdx);
          if (form.tag === undefined) {
            document.getElementById("morphResults").innerHTML =
              "<i>Нет вариантов</i>";
          } else if (form.tag.ext.flex[1] === declination) {
            document.getElementById("morphResults").innerHTML = form.word;
          }
        }
      }
    }
  } else {
    document.getElementById("morphResults").innerHTML = "<i>Нет вариантов</i>";
  }
}
