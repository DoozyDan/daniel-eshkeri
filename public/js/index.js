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

    for(let i = 0; i < cards.length; i++) {
        const thisCardId = cards[i].id;
        cards[i].addEventListener('click', () => {
            location.href = `/${thisCardId}`
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