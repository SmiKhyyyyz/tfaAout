"use strict";
// MENU

const burger = document.querySelector(".burger");
burger.addEventListener('click', () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("menu--active");
    burger.classList.toggle("burger--active");
})

// Canva

document.addEventListener("DOMContentLoaded", function() {

    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '/projets/tfaaout/') {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandomDirection() {
            return (Math.random() < 0.5 ? -1 : 1) * 0.4;
        }

        function getRadius() {
            if (window.innerWidth <= 480) {
                return { r1: 50, r2: 75, r3: 60, r4: 80, r5: 60, r6: 85, r7: 70, r8: 90 };
            } else if (window.innerWidth <= 768) {
                return { r1: 100, r2: 160, r3: 125, r4: 140, r5: 150, r6: 75, r7: 50, r8: 60 };
            } else {
                return { r1: 200, r2: 125, r3: 220, r4: 180, r5: 150, r6: 75, r7: 50, r8: 75 };
            }
        }

        function initializeCircles() {
            const radius = getRadius();
            circles[0].radius = radius.r1;
            circles[1].radius = radius.r2;
            circles[2].radius = radius.r3;
            circles[3].radius = radius.r4;
            circles[4].radius = radius.r5;
            circles[5].radius = radius.r6;
            circles[6].radius = radius.r7;
            circles[7].radius = radius.r8;

            circles.forEach(circle => {
                circle.x = getRandomInt(circle.radius, canvas.width - circle.radius);
                circle.y = getRandomInt(circle.radius, canvas.height - circle.radius);
            });
        }

        const circles = [
            { radius: 200, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.5)' },
            { radius: 300, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.8)' },
            { radius: 250, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.65)' },
            { radius: 200, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.35)' },
            { radius: 250, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.65)' },
            { radius: 400, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.35)' },
            { radius: 250, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.65)' },
            { radius: 400, dx: getRandomDirection(), dy: getRandomDirection(), zIndex: 6, color: 'rgba(141, 169, 196, 0.35)' }
        ];

        function drawCircle(circle) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.closePath();
        }

        function updateCircle(circle) {
            if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
                circle.dx = -circle.dx;
            }
            if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
                circle.dy = -circle.dy;
            }

            circle.x += circle.dx;
            circle.y += circle.dy;
        }

        function explodeCircle(circle) {
            const explodeInterval = setInterval(() => {
                circle.radius += 2;
                circle.opacity -= 0.05;
                if (circle.opacity <= 0) {
                    clearInterval(explodeInterval);
                    const index = circles.indexOf(circle);
                    if (index > -1) {
                        circles.splice(index, 1);
                    }
                }
            }, 20);
        }

        function checkClickOnCircle(x, y) {
            for (const circle of circles) {
                const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
                if (distance < circle.radius) {
                    circle.opacity = 1;
                    explodeCircle(circle);
                    break;
                }
            }
        }

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            checkClickOnCircle(x, y);
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.sort((a, b) => a.zIndex - b.zIndex);
            circles.forEach(circle => {
                if (circle.opacity !== undefined && circle.opacity <= 0) return;
                drawCircle(circle);
                updateCircle(circle);
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            initializeCircles();
        });

        resizeCanvas();
        initializeCircles();
        animate();
    }
});

//Random couleur

document.addEventListener("DOMContentLoaded", function () {

    const hoverColors = ["#C45A2A", "#736B92", "#C74B50", "#E76F61", "#B57EDC", "#9B4F7F"];
    
    const randomColor = hoverColors[Math.floor(Math.random() * hoverColors.length)];
    
    document.documentElement.style.setProperty('--c-hover', randomColor);
});

// GSAP

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".container__text--pres", {
    scrollTrigger: {
        trigger: ".container__text--pres",
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
    },
    opacity: 1,
    x: 0,
    duration: 0.5
});

const elements = gsap.utils.toArray(".comp__el--adobe, .comp__el--web, .comp__el--figma, .comp__el--gpt");

elements.forEach((el, index) => {
    gsap.to(el, {
    scrollTrigger: {
        trigger: el,
        start: "top 95%",
        end: "top 15%",
        toggleActions: "play none none none",
    },
    opacity: 1,
    x: 0,
    duration: 1,
    delay: index * 0.2
    });
});

gsap.to(".container__title", {
    scrollTrigger: {
        trigger: ".container__title",
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
    },
    opacity: 1,
    duration: 0.5
});

gsap.utils.toArray(".title__anim--1, .title__anim--2, .title__anim--3").forEach((element, index) => {
    gsap.to(element, {
        scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
    },
        opacity: 1,
        x: 0,
        duration: 0.3
    });
});


gsap.utils.toArray(".projet--hw, .projet--rux, .projet--dp").forEach((element) => {
    gsap.fromTo(element, 
    {
        opacity: 0,
        x: -100,
    }, 
    {
    scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
    },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
    }
);
});