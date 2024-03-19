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
            document.querySelector('#card1Content').innerHTML = doc.data().html;
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

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
            card1Content.innerHTML = "<textarea id='card1TextArea'></textarea>";
            tinyMCE();
            const card1Collection = db.collection("card1");
            const card1ContentRef = card1Collection.doc("content");
            card1ContentRef.get().then((doc) => {
                if (doc.exists) {
                    document.querySelector('#card1TextArea').innerHTML = doc.data().html;
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    } else {
        window.location.reload();
    }
}


function tinyMCE() {
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
        selector: 'textarea',
        plugins: 'anchor accordion autolink autoresize charmap codesample emoticons image link lists advlist media searchreplace table visualblocks wordcount fullscreen insertdatetime preview quickbars',
        toolbar: 'preview | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table insertdatetime | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',

        images_upload_handler: uploadInlineImage
    });
}