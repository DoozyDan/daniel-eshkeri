/*
░░██╗░░░░██╗██╗░░        ██████╗░███████╗░██████╗░█████╗░░█████╗░░██╗░░░░░░░██╗███████╗██████╗░
░██╔╝░░░██╔╝╚██╗░        ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗░██║░░██╗░░██║██╔════╝██╔══██╗
██╔╝░░░██╔╝░░╚██╗        ██║░░██║█████╗░░╚█████╗░██║░░╚═╝███████║░╚██╗████╗██╔╝█████╗░░██████╦╝
╚██╗░░██╔╝░░░██╔╝        ██║░░██║██╔══╝░░░╚═══██╗██║░░██╗██╔══██║░░████╔═████║░██╔══╝░░██╔══██╗
░╚██╗██╔╝░░░██╔╝░        ██████╔╝███████╗██████╔╝╚█████╔╝██║░░██║░░╚██╔╝░╚██╔╝░███████╗██████╦╝
░░╚═╝╚═╝░░░░╚═╝░░        ╚═════╝░╚══════╝╚═════╝░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░
*/
let editMode = false;
document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();

    const root = document.querySelector(':root');

    const font = db.collection("settings").doc("font");

    font.onSnapshot(doc => {
        const data = doc.data();
        root.style.setProperty('--font', `${data.font}`)
    })

    const colours = db.collection("settings").doc("colours")

    colours.onSnapshot(doc => {
        const data = doc.data();
        root.style.setProperty('--text', `${data.text}`)
        root.style.setProperty('--background', `${data.background}`)
        root.style.setProperty('--background-accent', `${data.backgroundAccent}`)
        root.style.setProperty('--border-colour', `${data.borderColour}`)
        root.style.setProperty('--accent', `${data.accent}`)
        root.style.setProperty('--link-hover', `${data.linkHover}`)
    })

    const editButton = document.querySelector('#editButton');

    //Handle Account Status
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            editButton.remove();
        } else {
            editButton.classList.remove("hidden");
            console.log(user.uid);
            editButton.onclick = () => runEditMode();
        }
    });

    const heroCollection = db.collection("hero");
    const heroHeading = heroCollection.doc("heading");
    heroHeading.get().then((doc) => {
        if (doc.exists) {
            document.querySelector('#heroHeading').innerHTML = doc.data().text;
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const heroImage = heroCollection.doc("image");
    heroImage.onSnapshot((doc) => {
       document.querySelector('#heroImage').src = doc.data().source;
    });

    const socialButtonsCollection = db.collection("socialButtons");
    const socialButtonsContainer = document.querySelector('#socialButtons');
    socialButtonsCollection.onSnapshot((querySnapshot) => {
        socialButtonsContainer.innerHTML = ``;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                socialButtonsContainer.innerHTML += `
                <a href="${doc.data().link}" target="${doc.data().target}" class="fa-brands ${doc.data().icon}"></a>
            `
            });
        });

    const card1Collection = db.collection("card1");
    const card1Heading = card1Collection.doc("heading");
    card1Heading.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        document.querySelector("#card1HeadingCollapsed").innerText = doc.data().text;
    });
    card1Heading.get().then((doc) => {
        if (doc.exists) {
            document.querySelector('#card1Heading').innerHTML = doc.data().text;
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card1Content = card1Collection.doc("content");
    card1Content.get().then((doc) => {
        if (doc.exists) {
            if (doc.data().html.length === 0) {
                document.querySelector('#card1Content').innerHTML = `
                <p>This card has no content.</p>
                `
            } else {
                document.querySelector('#card1Content').innerHTML = doc.data().html;
            }
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card1IconRef = card1Collection.doc("cardIcon");
    card1IconRef.onSnapshot((doc) => {
        document.querySelector('#card1Icon').innerHTML = doc.data().svg;
        document.querySelector('#card1IconExpanded').innerHTML = doc.data().svg;
    })

    const card2Collection = db.collection("card2");
    const card2Heading = card2Collection.doc("heading");
    card2Heading.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        document.querySelector("#card2HeadingCollapsed").innerText = doc.data().text;
    });
    card2Heading.get().then((doc) => {
        if (doc.exists) {
            document.querySelector('#card2Heading').innerHTML = doc.data().text;
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card2Content = card2Collection.doc("content");
    card2Content.get().then((doc) => {
        if (doc.exists) {
            if (doc.data().html.length === 0) {
                document.querySelector('#card2Content').innerHTML = `
                <p>This card has no content.</p>
                `
            } else {
                document.querySelector('#card2Content').innerHTML = doc.data().html;
            }
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card2IconRef = card2Collection.doc("cardIcon");
    card2IconRef.onSnapshot((doc) => {
        document.querySelector('#card2Icon').innerHTML = doc.data().svg;
        document.querySelector('#card2IconExpanded').innerHTML = doc.data().svg;
    })

    const card3Collection = db.collection("card3");
    const card3Heading = card3Collection.doc("heading");
    card3Heading.onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        document.querySelector("#card3HeadingCollapsed").innerText = doc.data().text;
    });
    card3Heading.get().then((doc) => {
        if (doc.exists) {
            document.querySelector('#card3Heading').innerHTML = doc.data().text;
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card3Content = card3Collection.doc("content");
    card3Content.get().then((doc) => {
        if (doc.exists) {
            if (doc.data().html.length === 0) {
                document.querySelector('#card3Content').innerHTML = `
                <p>This card has no content.</p>
                `
            } else {
                document.querySelector('#card3Content').innerHTML = doc.data().html;
            }
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    const card3IconRef = card3Collection.doc("cardIcon");
    card3IconRef.onSnapshot((doc) => {
        document.querySelector('#card3Icon').innerHTML = doc.data().svg;
        document.querySelector('#card3IconExpanded').innerHTML = doc.data().svg;
    })



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
}); //DOMContentLoaded

function runEditMode() {
    const db = firebase.firestore();

    const editButton = document.querySelector('#editButton');
    editButton.insertAdjacentHTML("afterend", '<div class="colour-picker-container"><div><label for="text-colour">Text</label><input type="color" id="text-colour" colorpick-eyedropper-active="false"></div><div><label for="background-colour">Background</label><input type="color" id="background-colour" colorpick-eyedropper-active="false"></div><div><label for="background-accent">Background Accent</label><input type="color" id="background-accent" colorpick-eyedropper-active="false"></div><div><label for="border-colour">Border Colour</label><input type="color" id="border-colour" colorpick-eyedropper-active="false"></div><div><label for="accent">Accent</label><input type="color" id="accent" colorpick-eyedropper-active="false"></div><div><label for="link-hover">Link Hover</label><input type="color" id="link-hover" colorpick-eyedropper-active="false"></div></div>');
    const colours = db.collection("settings").doc("colours");
    colours.get().then((doc) => {
        if (doc.exists) {
            const textInput = document.querySelector('#text-colour');
            const backgroundInput = document.querySelector('#background-colour');
            const backgroundAccentInput = document.querySelector('#background-accent');
            const borderColourInput = document.querySelector('#border-colour');
            const linkHoverInput = document.querySelector('#link-hover');
            const accentInput = document.querySelector('#accent');
            textInput.value = doc.data().text;
            backgroundInput.value = doc.data().background;
            backgroundAccentInput.value = doc.data().backgroundAccent;
            borderColourInput.value = doc.data().borderColour;
            linkHoverInput.value = doc.data().linkHover;
            accentInput.value = doc.data().accent;
            setColours(textInput, backgroundInput, backgroundAccentInput, borderColourInput, linkHoverInput, accentInput);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });

    if (!editButton.classList.contains("done")) {
        editMode = true;
        console.log(editMode)

        editButton.innerText = "Done";
        editButton.classList.add("done");

        const h1s = document.querySelectorAll("h1");
        for(let i = 0; i < h1s.length; i++) {
            if (h1s[i].classList.contains("cE")) {
                h1s[i].addEventListener("mouseover", () => {
                    h1s[i].style.outline = "1px solid lightgrey";
                    h1s[i].style.cursor = "pointer";
                })
                h1s[i].addEventListener("mouseout", () => {
                    h1s[i].style.outline = "none";
                    h1s[i].style.cursor = "default";
                })
                h1s[i].contentEditable = "true";
                h1s[i].addEventListener('focusout', () => {
                    if (h1s[i].id === "heroHeading") {
                        const heroHeading = db.collection("hero").doc("heading");
                        heroHeading.set({
                            text: h1s[i].innerText
                        })
                    }
                    if (h1s[i].id === "card1Heading") {
                        const card1Heading = db.collection("card1").doc("heading");
                        card1Heading.set({
                            text: h1s[i].innerText
                        })
                    }
                    if (h1s[i].id === "card2Heading") {
                        const card2Heading = db.collection("card2").doc("heading");
                        card2Heading.set({
                            text: h1s[i].innerText
                        })
                    }
                    if (h1s[i].id === "card3Heading") {
                        const card3Heading = db.collection("card3").doc("heading");
                        card3Heading.set({
                            text: h1s[i].innerText
                        })
                    }
                })
            }
        }

        const heroImage = document.querySelector('#heroImage');
        heroImage.addEventListener("mouseover", () => {
            heroImage.style.outline = "1px solid lightgrey";
            heroImage.style.cursor = "pointer";
        })
        heroImage.addEventListener("mouseout", () => {
            heroImage.style.outline = "none";
            heroImage.style.cursor = "default";
        })
        const fileupload = document.getElementById("FileUpload1");
        heroImage.onclick = function () {
            fileupload.click();
        };
        fileupload.onchange = function () {
            const file = this.files[0];
            const storageRef = firebase.storage().ref();
            const heroImageRef = storageRef.child('heroImage.jpg');
            const task= heroImageRef.put(file);
            task.then(snapshot => {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    heroImage.classList.remove("loading");

                    const heroImageDoc = db.collection("hero").doc("image");
                    heroImageDoc.set({
                        source: downloadURL.toString()
                    })
                });
            })

            task.on('state_changed', snapshot => {
                heroImage.src = "";
                heroImage.classList.add("loading")
            })
        }

        const socialButtonsContainer = document.querySelector('#socialButtons');
        socialButtonsContainer.addEventListener("mouseover", () => {
            socialButtonsContainer.style.outline = "3px solid lightgrey";
            socialButtonsContainer.style.cursor = "pointer";
        })
        socialButtonsContainer.addEventListener("mouseout", () => {
            socialButtonsContainer.style.outline = "none";
            socialButtonsContainer.style.cursor = "default";
        })
        socialButtonsContainer.onclick = function () {
            if (!document.querySelector('#socialButtonsEditModal')) {
                socialButtonsContainer.insertAdjacentHTML("afterend", "<div id=\"socialButtonsEditModal\">\n" +
                    "                <div id=\"socialButtonsEditModalheader\">|||</div>\n" +
                    "                <div id=\"savedLinks\">\n" +
                    "                    \n" +
                    "                </div>\n" +
                    "                <button id=\"socialButtonsAddNew\">+</button>\n" +
                    "                <button id=\"socialButtonsSaveEdits\">Save</button>\n" +
                    "            </div>");
                dragElement(document.getElementById("socialButtonsEditModal"))
                const savedLinksDiv = document.querySelector('#savedLinks');
                const socialButtonsCollection = db.collection("socialButtons");
                socialButtonsCollection.onSnapshot((querySnapshot) => {
                    savedLinksDiv.innerHTML = "";
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        savedLinksDiv.innerHTML += `
                            <div id="${doc.id}" class="singleLinkDiv">
                                <div>
                                    <label for="linkInput">Link</label>
                                    <input id="linkInput${doc.id}" type="url" placeholder="https://" value="${doc.data().link}">
                                </div>
                                <div>
                                    <label for="iconSelect">Icon</label>
                                    <select name="Icon" id="iconSelect${doc.id}">
                                        <option value="fa-youtube">YouTube</option>
                                        <option value="fa-linkedin-in">LinkedIn</option>
                                        <option value="fa-instagram">Instagram</option>
                                        <option value="fa-twitter-x">Twitter/X</option>
                                        <option value="fa-github">GitHub</option>
                                        <option value="fa-pinterest">Pinterest</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="targetSelect">Open In</label>
                                    <select name="Target" id="targetSelect${doc.id}">
                                        <option value="_self">Same tab</option>
                                        <option value="_blank">New tab</option>
                                    </select>
                                </div>
                                <div>
                                    <button id="bin${doc.id}" class="singleLinkDelete fa fa-trash"></button>
                                </div>
                            </div>
                        `
                        let icon = doc.data().icon;
                        let iconSelectID = "iconSelect" + doc.id;
                        let target = doc.data().target;
                        let targetSelectID = "targetSelect" + doc.id;
                        setTimeout(() => {
                            if (document.querySelector('#socialButtonsEditModal')) {
                                selectItemByValue(document.getElementById(iconSelectID), icon.toString())
                                selectItemByValue(document.getElementById(targetSelectID), target.toString())

                                document.querySelector('#socialButtonsSaveEdits').onclick = function () {
                                    socialButtonsCollection.get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc) => {
                                                // doc.data() is never undefined for query doc snapshots
                                                console.log(doc.id, " => ", doc.data());
                                                let link = document.getElementById("linkInput" + doc.id).value;
                                                let icon = document.getElementById("iconSelect" + doc.id).value;
                                                let target = document.getElementById("targetSelect" + doc.id).value;
                                                const socialButtonsDoc = socialButtonsCollection.doc(doc.id);
                                                socialButtonsDoc.update({
                                                    link: link,
                                                    icon: icon,
                                                    target: target
                                                })
                                            });
                                            document.querySelector('#socialButtonsEditModal').remove();
                                        })
                                        .catch((error) => {
                                            console.log("Error getting documents: ", error);
                                        });
                                }

                                document.querySelector('#socialButtonsAddNew').onclick = function () {
                                    if (savedLinksDiv.childElementCount < 6) {
                                        socialButtonsCollection.add({
                                            icon: "",
                                            link: "",
                                            target: ""
                                        })
                                            .then((docRef) => {
                                                console.log("Document written with ID: ", docRef.id);
                                            })
                                            .catch((error) => {
                                                console.error("Error adding document: ", error);
                                            });
                                    } else {
                                        alert("Max social buttons reached!")
                                    }
                                }

                                document.querySelectorAll('.singleLinkDelete').forEach(item => {
                                    item.addEventListener('click', () => {
                                        const socialButtonsDoc = socialButtonsCollection.doc(item.id.split("bin").pop());
                                        console.log(socialButtonsDoc)
                                        socialButtonsDoc.delete().then(() => {
                                            console.log("Document successfully deleted!");
                                        }).catch((error) => {
                                            console.error("Error removing document: ", error);
                                        });
                                    })
                                });
                            }
                        }, 50)
                    });
                })
            }
        }

        const cardIconsExpanded = document.querySelectorAll('.card-icon-expanded');
        cardIconsExpanded.forEach((item, i) => {
            item.addEventListener("mouseover", () => {
                item.style.outline = "1px solid lightgrey";
                item.style.cursor = "pointer";
            })
            item.addEventListener("mouseout", () => {
                item.style.outline = "none";
                item.style.cursor = "default";
            })

            item.onclick = function () {
                console.log(item.parentNode.firstElementChild)
                item.parentNode.firstElementChild.onclick = function () {
                    if (document.querySelector('#cardIconEditModal')) {
                        document.querySelector('#cardIconEditModal').remove();
                    }
                }
                if (!document.querySelector('#cardIconEditModal')) {
                    item.insertAdjacentHTML("afterend", "<div id=\"cardIconEditModal\">\n" +
                        "                        <div id=\"cardIconEditModalheader\">|||</div>\n" +
                        "                        <label for=\"svgInput\">Enter SVG Code</label>\n" +
                        "                        <input type=\"text\" id=\"svgInput\">\n" +
                        "                        <div id=\"svgPreview\"></div>\n" +
                        "                        <button id=\"cardIconSave\">Save</button>\n" +
                        "                    </div>")
                    dragElement(document.getElementById("cardIconEditModal"))
                    console.log(i)
                    let cardIndexRef = "card" + (i + 1)
                    const cardCollection = db.collection(cardIndexRef);
                    const cardIconRef = cardCollection.doc("cardIcon");
                    const svgInput = document.getElementById("svgInput");
                    cardIconRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            svgInput.value = doc.data().svg;
                            document.querySelector('#svgPreview').innerHTML = svgInput.value;
                            document.querySelector('#svgInput').onkeyup = function () {
                                document.querySelector('#svgPreview').innerHTML = svgInput.value;
                            }
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });

                    document.querySelector('#cardIconSave').onclick = function () {
                        const cardIconRef = cardCollection.doc("cardIcon");
                        cardIconRef.update({
                            svg: svgInput.value
                        })
                        document.querySelector('#cardIconEditModal').remove();
                    }
                }
            }
        });

        const card1Content = document.querySelector('#card1Content');
        card1Content.addEventListener("mouseover", () => {
            card1Content.style.outline = "1px solid lightgrey";
            card1Content.style.cursor = "pointer";
        })
        card1Content.addEventListener("mouseout", () => {
            card1Content.style.outline = "none";
            card1Content.style.cursor = "default";
        })

        card1Content.onclick = function () {
            if (!card1Content.innerHTML.includes("<textarea")) {
                card1Content.innerHTML = "<textarea id='card1TextArea'></textarea><button class='save-button' onclick='saveCard1ContentChanges()'>Save</button>";
                tinyMCE('#card1TextArea');
                const card1Collection = db.collection("card1");
                const card1ContentRef = card1Collection.doc("content");
                card1ContentRef.get().then((doc) => {
                    if (doc.exists) {
                        setTimeout(() => {
                            tinymce.get("card1TextArea").setContent(doc.data().html);
                            if (tinymce.get("card1TextArea").getContent().length) {
                                setTimeout(() => {
                                    tinymce.get("card1TextArea").setContent(doc.data().html);
                                }, 300)
                            }
                        }, 300)
                        console.log("Document data:", doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        }

        const card2Content = document.querySelector('#card2Content');
        card2Content.addEventListener("mouseover", () => {
            card2Content.style.outline = "1px solid lightgrey";
            card2Content.style.cursor = "pointer";
        })
        card2Content.addEventListener("mouseout", () => {
            card2Content.style.outline = "none";
            card2Content.style.cursor = "default";
        })

        card2Content.onclick = function () {
            if (!card2Content.innerHTML.includes("<textarea")) {
                card2Content.innerHTML = "<textarea id='card2TextArea'></textarea><button class='save-button' onclick='saveCard2ContentChanges()'>Save</button>";
                tinyMCE('#card2TextArea');
                const card2Collection = db.collection("card2");
                const card2ContentRef = card2Collection.doc("content");
                card2ContentRef.get().then((doc) => {
                    if (doc.exists) {
                        setTimeout(() => {
                            tinymce.get("card2TextArea").setContent(doc.data().html);
                            if (tinymce.get("card2TextArea").getContent().length) {
                                setTimeout(() => {
                                    tinymce.get("card2TextArea").setContent(doc.data().html);
                                }, 300)
                            }
                        }, 300)
                        console.log("Document data:", doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        }

        const card3Content = document.querySelector('#card3Content');
        card3Content.addEventListener("mouseover", () => {
            card3Content.style.outline = "1px solid lightgrey";
            card3Content.style.cursor = "pointer";
        })
        card3Content.addEventListener("mouseout", () => {
            card3Content.style.outline = "none";
            card3Content.style.cursor = "default";
        })

        card3Content.onclick = function () {
            if (!card3Content.innerHTML.includes("<textarea")) {
                card3Content.innerHTML = "<textarea id='card3TextArea'></textarea><button class='save-button' onclick='saveCard3ContentChanges()'>Save</button>";
                tinyMCE('#card3TextArea');
                const card3Collection = db.collection("card3");
                const card3ContentRef = card3Collection.doc("content");
                card3ContentRef.get().then((doc) => {
                    if (doc.exists) {
                        setTimeout(() => {
                            tinymce.get("card3TextArea").setContent(doc.data().html);
                            if (tinymce.get("card3TextArea").getContent().length) {
                                setTimeout(() => {
                                    tinymce.get("card3TextArea").setContent(doc.data().html);
                                }, 300)
                            }
                        }, 300)
                        console.log("Document data:", doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        }

    } else {
        window.location.reload();
    }
}


function saveCard1ContentChanges() {
    const content = tinymce.get("card1TextArea").getContent();
    const db = firebase.firestore();
    const card1ContentRef = db.collection("card1").doc("content");
    card1ContentRef.set({
        html: content
    }).then(() => {
        card1ContentRef.get().then((doc) => {
            if (doc.exists) {
                tinymce.remove("#card1TextArea")
                document.querySelector('#card1Content').innerHTML = doc.data().html;
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }).catch((err) => {
            console.error(err);
        })
}

function saveCard2ContentChanges() {
    const content = tinymce.get("card2TextArea").getContent();
    const db = firebase.firestore();
    const card2ContentRef = db.collection("card2").doc("content");
    card2ContentRef.set({
        html: content
    }).then(() => {
        card2ContentRef.get().then((doc) => {
            if (doc.exists) {
                tinymce.remove("#card2TextArea")
                document.querySelector('#card2Content').innerHTML = doc.data().html;
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }).catch((err) => {
        console.error(err);
    })
}

function saveCard3ContentChanges() {
    const content = tinymce.get("card3TextArea").getContent();
    const db = firebase.firestore();
    const card3ContentRef = db.collection("card3").doc("content");
    card3ContentRef.set({
        html: content
    }).then(() => {
        card3ContentRef.get().then((doc) => {
            if (doc.exists) {
                tinymce.remove("#card3TextArea")
                document.querySelector('#card3Content').innerHTML = doc.data().html;
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }).catch((err) => {
        console.error(err);
    })
}


function tinyMCE(selector) {
    const uploadInlineImage = (blobInfo) => new Promise((resolve, reject) => {
        const file = blobInfo.blob();

        let date = new Date(); // for published at info
        let docName = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime().toString().substring(2, 10)}`;

        const storageRef = firebase.storage().ref();
        const imgRef = storageRef.child(`${docName}`);

        const task = imgRef.put(file)

        task.on( 'state_changed',
            snapshot => (''),
            error => reject('Error uploading image: ' + error),
            () => {
                console.log('Image uploaded successfully');
                resolve(task.snapshot.ref.getDownloadURL());
            });
    })

    tinymce.init({
        selector: selector,
        plugins: 'anchor accordion autolink autoresize charmap codesample emoticons image link lists advlist media searchreplace table visualblocks wordcount fullscreen insertdatetime preview quickbars',
        toolbar: 'preview | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table insertdatetime | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',

        images_upload_handler: uploadInlineImage
    });
}


function setColours(textInput, backgroundInput, backgroundAccentInput, borderColourInput, linkHoverInput, accentInput) {
    function coloursSet() {
        const db = firebase.firestore();

        const colours = db.collection('settings').doc('colours');

        colours.set({
            text: textInput.value,
            background: backgroundInput.value,
            backgroundAccent: backgroundAccentInput.value,
            borderColour: borderColourInput.value,
            linkHover: linkHoverInput.value,
            accent: accentInput.value
        })
            .then(() => {
                console.log("Successful Change");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    textInput.addEventListener('change', () => {
        coloursSet();
    });

    backgroundInput.addEventListener('change', () => {
        coloursSet();
    });

    backgroundAccentInput.addEventListener('change', () => {
        coloursSet();
    });

    borderColourInput.addEventListener('change', () => {
        coloursSet();
    });

    linkHoverInput.addEventListener('change', () => {
        coloursSet();
    });

    accentInput.addEventListener('change', () => {
        coloursSet();
    });
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function selectItemByValue(elmnt, value){

    for(var i=0; i < elmnt.options.length; i++)
    {
        if(elmnt.options[i].value === value) {
            elmnt.selectedIndex = i;
            break;
        }
    }
}