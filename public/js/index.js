/*
░░██╗░░░░██╗██╗░░        ██████╗░███████╗░██████╗░█████╗░░█████╗░░██╗░░░░░░░██╗███████╗██████╗░
░██╔╝░░░██╔╝╚██╗░        ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗░██║░░██╗░░██║██╔════╝██╔══██╗
██╔╝░░░██╔╝░░╚██╗        ██║░░██║█████╗░░╚█████╗░██║░░╚═╝███████║░╚██╗████╗██╔╝█████╗░░██████╦╝
╚██╗░░██╔╝░░░██╔╝        ██║░░██║██╔══╝░░░╚═══██╗██║░░██╗██╔══██║░░████╔═████║░██╔══╝░░██╔══██╗
░╚██╗██╔╝░░░██╔╝░        ██████╔╝███████╗██████╔╝╚█████╔╝██║░░██║░░╚██╔╝░╚██╔╝░███████╗██████╦╝
░░╚═╝╚═╝░░░░╚═╝░░        ╚═════╝░╚══════╝╚═════╝░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░
*/
document.addEventListener("DOMContentLoaded", event => {

    const cards = document.querySelectorAll('.card');

    cardsMouseOver();
    function cardsMouseOver() {
        for(let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('mouseover', () => {
                for(let j = 0; j < cards.length; j++) {
                    if (cards[j] !== cards[i]) {
                        cards[j].classList.add("shrink");
                    }
                }
            });
            cards[i].addEventListener('mouseout', () => {
                for(let j = 0; j < cards.length; j++) {
                    if (cards[j] !== cards[i]) {
                        cards[j].classList.remove("shrink");
                    }
                }
            });
        }
    }


    const cardExpands = document.querySelectorAll('.card-expand');
    const cardExpandContent = document.querySelectorAll('.card-expand-content');

    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const box = cards[i].getBoundingClientRect()
            // const xCenter = (box.left + box.right) / 2
            // const yCenter = (box.top + box.bottom) / 2
            cardExpands[i].style.left = box.left + "px";
            cardExpands[i].style.top = box.top + "px";
            cardExpands[i].classList.remove("selected-reverse");
            cardExpands[i].classList.add("selected");
            cards[i].style.backgroundColor = "transparent";
            cards[i].querySelector("h1").classList.add("opacity-0");
            cards[i].querySelector("span").classList.add("opacity-0");
            document.querySelector("body").style.overflowY = "hidden";

            setTimeout(() => {
                cardExpandContent[i].classList.add("translateY-0");
                cardExpands[i].classList.add("overflowShow");
                cardExpands[i].querySelector('.back-btn').style.opacity = "1";
                cardExpands[i].querySelector('.back-btn').addEventListener('click', () => {
                    cardExpands[i].classList.remove("selected");
                    cardExpands[i].classList.add("selected-reverse");
                    cards[i].style.backgroundColor = "var(--background)";
                    cardExpandContent[i].classList.remove("translateY-0");
                    cardExpands[i].classList.remove("overflowShow");
                    cards[i].querySelector("h1").classList.remove("opacity-0");
                    cards[i].querySelector("span").classList.remove("opacity-0");
                    document.querySelector("body").style.overflowY = "auto";

                    cardsMouseOver()
                })
            }, 1200)
        })
    }

    // card.forEach(card => {
    //     card.addEventListener('mouseover', () => {
    //         card.classList.add("hover");
    //     });
    // })
    // card.forEach(card => {
    //     card.addEventListener('mouseleave', () => {
    //         card.classList.remove("hover");
    //     });
    // })

}); //DOMContentLoaded