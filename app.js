const content = document.querySelector(".content");
const link = document.querySelector("a");
const linkIcon = document.querySelector(".btn-icon");
let linkAnimated = false;

// Create quick setter functions for the --x and --y CSS variables on the .hidden-content element.
// Animate changes to these variables smoothly over 0.4 seconds with an easing function of power4.out.
let xTo = gsap.quickTo(".hidden-content", "--x", {
    duration: 0.4,
    ease: "power4.out",
  }),
  yTo = gsap.quickTo(".hidden-content", "--y", {
    duration: 0.4,
    ease: "power4.out",
  });

// Create a paused GSAP timeline named tl.
let tl = gsap.timeline({ paused: true });
// Define an animation to change the --size CSS variable to 75 over 0.75 seconds with a back.out(1.7) easing.
tl.to(".hidden-content", {
  "--size": 75,
  duration: 0.75,
  ease: "back.out(1.7)",
});
// Convert all <p> elements within content into an array.
let hoveringContent = gsap.utils.toArray("p", content);
// Add event listeners to each paragraph.
hoveringContent.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    // Restart the timeline tl when a paragraph is hovered over.
    tl.restart();
  });
  el.addEventListener("mouseleave", () => {
    // Reverse the timeline tl when a hover ends.
    tl.reverse();
  });
});

/***************************************
    Add Mask on First Mouse Movement
***************************************/

// Add an event listener for the first mouse move.
window.addEventListener("mousemove", onFirstMove);

function onFirstMove(e) {
  // Remove the mouse move event listener after the first move.
  window.removeEventListener("mousemove", onFirstMove);
  // Set the initial position and visibility of the hidden content based on the first mouse move event.
  gsap.set(".hidden-content", { autoAlpha: 1, "--x": e.pageX, "--y": e.pageY });
  //Add a new event listener for subsequent mouse moves.
  window.addEventListener("mousemove", (e) => {
    // Update the position of the hidden content to follow the cursor.
    yTo(e.pageY);
    xTo(e.pageX);
  });
}
