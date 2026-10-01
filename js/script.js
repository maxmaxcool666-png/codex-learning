const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

console.log(nav);
console.log(navLinks);

navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("你點擊了導覽列！");

    const targetId = event.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    console.log(navText[targetId]);

    console.log(targetSection);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
  });
});
window.addEventListener("scroll", function () {
  console.log("你正在捲動網頁！");
  console.log(window.scrollY);
});

const aboutSection = document.querySelector("#about");

console.log(aboutSection.getBoundingClientRect().y);

const student = {
  name: "范祐綸",
  school: "致理科技大學",
};

console.log(student);
console.log(student.name);

const navText = {
  "#about": "你正在查看關於我",
  "#skills": "你正在查看技能",
  "#certifications": "你正在查看證照／認證",
};

console.log(navText);
