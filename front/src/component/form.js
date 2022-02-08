import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "../styles/design.css";
import { init } from '@emailjs/browser';
init("user_qBaJ1p4DH5IgvJFBFRIXR");


const Form = () => {

    // creation et initialisation etats 
    const [input, setInput] = useState({
        lastname: "",
        firstname: "",
        gender: "",
        country: "",
        phone: "",
        email: "",
        message: ""

    })

    // function qui permet de changer l'etat des champs
    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // function pour disposer les labels
    function label(champ, nb, nb2) {
        var label = document.querySelectorAll(".div-input label");
        var inputs = document.querySelectorAll(".div-input input");
        var selects = document.querySelectorAll(".div-input select");

        if (champ) {
            label[nb].style.top = "1%"
            label[nb].style.backgroundColor = "rgb(98, 87, 255)";
            label[nb].style.padding = "0.2% 1% 0 1%";
            inputs[nb2].style.borderWidth = "2px"
        }

        if (input.gender) {
            label[2].style.top = "1%"
            label[2].style.backgroundColor = "rgb(98, 87, 255)";
            label[2].style.padding = "0.2% 1% 0 1%";
            selects[0].style.borderWidth = "2px"
        }

        if (input.country) {
            label[3].style.top = "1%"
            label[3].style.backgroundColor = "rgb(98, 87, 255)";
            label[3].style.padding = "0.2% 1% 0 1%";
            selects[1].style.borderWidth = "2px"
        }

        if (input.message) {
            label[6].style.top = "1%"
            label[6].style.backgroundColor = "rgb(98, 87, 255)";
            label[6].style.padding = "0.2% 1% 0 1%";
            document.getElementById("msg").style.borderWidth = "2px"
        }
    }

    label(input.lastname, 0, 0);
    label(input.firstname, 1, 1);
    label(input.phone, 4, 2);
    label(input.email, 5, 3);

    // function qui permet d'envoyer l'email

    const sendEmail = (serviceId, templateId, vars) => {

        document.getElementById ( "btn" ).style.display = "none";
        document.querySelector ( ".form #div-loader div" ).style.display = "block";

        window.emailjs
            .send(serviceId, templateId, vars)
            .then((res) => {
                console.log("success");

                setTimeout(() => {
                    document.getElementById ( "btn" ).style.display = "none";
                    document.querySelector ( ".form #div-loader div" ).style.display = "none";
                    document.querySelector ( ".form #div-loader .span1" ).style.display = "flex";
                    document.querySelector ( ".form #div-loader .span2" ).style.display = "none";
                }, 2000);

               setTimeout(() => {
                    document.getElementById ( "btn" ).style.display = "block";
                    document.querySelector ( ".form #div-loader div" ).style.display = "none";
                    document.querySelector ( ".form #div-loader .span1" ).style.display = "none";
                    document.querySelector ( ".form #div-loader .span2" ).style.display = "none";
                
                }, 6000);

                resetInput (); // appel a la fonction d'initialisation des champs

            }).catch ( 
                ( err ) => {
                     console.log ( "no" ) ;
                    
                        setTimeout(() => {
                            document.getElementById ( "btn" ).style.display = "none";
                            document.querySelector ( ".form #div-loader div" ).style.display = "none";
                            document.querySelector ( ".form #div-loader .span1" ).style.display = "none";
                            document.querySelector ( ".form #div-loader .span2" ).style.display = "flex";            
                        }, 2000);
                    
                        setTimeout(() => {
                            document.getElementById ( "btn" ).style.display = "block";
                            document.querySelector ( ".form #div-loader div" ).style.display = "none";
                            document.querySelector ( ".form #div-loader .span1" ).style.display = "none";
                            document.querySelector ( ".form #div-loader .span2" ).style.display = "none";
                        
                        }, 6000);

                        resetInput (); // appel a la fonction d'initialisation des champs
                } );
    }

    // function pour afficher le logo de succès
    function showLogo ( id, id2 ) {

        setTimeout(() => {
            document.getElementById ( "btn" ).style.display = "none";
            document.querySelector ( ".form #div-loader div" ).style.display = "none";
            document.querySelector ( id ).style.display = "none";
            document.querySelector ( id2 ).style.display = "flex";            
        }, 2000);
    
        setTimeout(() => {
            document.getElementById ( "btn" ).style.display = "block";
            document.querySelector ( ".form #div-loader div" ).style.display = "none";
            document.querySelector ( ".form #div-loader .span1" ).style.display = "none";
            document.querySelector ( ".form #div-loader .span2" ).style.display = "none";
        
        }, 6000);
    }

    // function qui se declenche lors de l'appui sur le bouton envoyer
    const handleSubmit = e => {
        e.preventDefault();

        var regex_text = /^[a-zA-Zéèêï\s]*$/,
            regex_msg = /^[a-zA-Z0-9\s]*$/,
            regex_number = /^[0-9]*$/,
            regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (isVerified(input.lastname, "error_lastname", regex_text, 3)
            && isVerified(input.firstname, "error_firstname", regex_text, 3)
            && isVerified(input.gender, "error_gender", regex_text, 3)
            && isVerified(input.country, "error_country", regex_text, 3)
            && isVerified(input.phone, "error_phone", regex_number, 8)
            && isVerified(input.email, "error_email", regex_email, 5)
            && isVerified(input.message, "error_msg", regex_msg, 2)) 
            {

            sendEmail("service_dg2msmc", "template_v96unjt", {
                lastname: input.lastname,
                firstname: input.firstname,
                gender: input.gender,
                country: input.country,
                phone: input.phone,
                email: input.email,
                message: input.message,
            })
            resetInput (); // appel a la fonction d'initialisation des champs
        }
    }

    // function qui permet de valider un text de caractère
    function isVerified(val, errorId, regex, nb) {

        var err_input = document.getElementById(errorId);

        if (!val) {
            err_input.textContent = "champs vide...";
            err_input.style.animation = "dongle 1s";
            deleteAnimation(err_input);
            return false;
        }
        else if (!val.match(regex)) {
            err_input.textContent = "Format invalide...";
            err_input.style.animation = "dongle 1s";
            deleteAnimation(err_input);
            return false;
        }
        else if (val.length < nb) {
            err_input.textContent = "Au moins " + nb + " caractères...";
            err_input.style.animation = "dongle 1s";
            deleteAnimation(err_input);
        }
        else {
            err_input.textContent = "";
            return true;
        }
    }

    // founction qui permet de retirer l'animation
    function deleteAnimation(id) {

        setTimeout(() => {
            id.style.animation = "none";
        }, 2000);
    }

    // function d'initialiasation des champs
    function resetInput() {
        input.lastname = "";
        input.firstname = "";
        input.gender = "";
        input.country = "";
        input.phone = "";
        input.email = "";
        input.message = "";
    }

    return (
        <div className="form" >
            <h2> Send Mail <span className="bi-pencil-square"></span> </h2>

            <form className="" >

                <div className="div-input" >
                    <input type="text"
                        name="lastname"
                        value={input.lastname}
                        onChange={handleChange}
                    />
                    <label className="n">LastName...</label>
                    <span id="error_lastname" ></span>
                </div>

                <div className="div-input" >
                    <input type="text"
                        name="firstname"
                        value={input.firstname}
                        onChange={handleChange}
                    />
                    <label>FirstName...</label>
                    <span id="error_firstname" ></span>
                </div>

                <div className="div-input" >
                    <select id="gender"
                        name="gender"
                        value={input.gender}
                        onChange={handleChange}
                    >
                        <option selected disabled >  </option>
                        <option value="Masculin"> Masculin </option>
                        <option value="Féminin"> Féminin </option>
                    </select>
                    <label>Choose gender...</label>
                    <span id="error_gender" ></span>
                </div>

                <div className="div-input" >
                    <select id="country"
                        name="country"
                        value={input.country}
                        onChange={handleChange}
                    >
                        <option selected disabled >  </option>
                        <option value="Masculin"> Bénin </option>
                        <option value="Féminin"> France </option>
                    </select>
                    <label>Choose country...</label>
                    <span id="error_country" ></span>
                </div>

                <div className="div-input" >
                    <input type="tel"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                    />
                    <label>Phone Number...</label>
                    <span id="error_phone" ></span>
                </div>

                <div className="div-input" >
                    <input type="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                    />
                    <label>Email...</label>
                    <span id="error_email" ></span>
                </div>

                <div className="div-input" >
                    <textarea cols={10} rows={1}
                        id="msg"
                        name="message"
                        value={input.message}
                        onChange={handleChange}
                    >
                    </textarea>
                    <label>Qu'en pensez-vous ?...</label>
                    <span id="error_msg" ></span>
                </div>

                <button onClick={handleSubmit} id = "btn" >
                     Send Infos 
                </button>
              
            </form>
            <div id = "div-loader">
                    <div></div>
                    <span className = "span1" >Success <span className = "bi-check2-circle" ></span> </span>
                    <span className = "span2" >Failed <span className = "bi-x-circle" ></span> </span>
            </div>
        </div>
    );
}

export default Form;