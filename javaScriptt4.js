document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("form-container");

    function createInitialForm() {
        formContainer.innerHTML = "";
        let title = document.createElement("h2");
        title.textContent = "Masukkan Data";

        let nameLabel = document.createElement("label");
        nameLabel.textContent = "Nama: ";
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";

        let choiceLabel = document.createElement("label");
        choiceLabel.textContent = "Jumlah Pilihan: ";
        let choiceInput = document.createElement("input");
        choiceInput.type = "number";
        choiceInput.id = "choiceCount";

        let submitButton = document.createElement("button");
        submitButton.id = "submitInitial";
        submitButton.textContent = "OK";
        submitButton.addEventListener("click", handleFirstSubmit);

        let errorMsg = document.createElement("p");
        errorMsg.id = "error-msg";
        errorMsg.style.color = "red";

        formContainer.appendChild(title);
        formContainer.appendChild(nameLabel);
        formContainer.appendChild(nameInput);
        formContainer.appendChild(document.createElement("br"));
        formContainer.appendChild(choiceLabel);
        formContainer.appendChild(choiceInput);
        formContainer.appendChild(document.createElement("br"));
        formContainer.appendChild(submitButton);
        formContainer.appendChild(errorMsg);
    }

    function handleFirstSubmit() {
        const name = document.getElementById("name").value.trim();
        const choiceCount = parseInt(document.getElementById("choiceCount").value);
        const errorMsg = document.getElementById("error-msg");
        const submitButton = document.getElementById("submitInitial");

        if (!name) {
            errorMsg.textContent = "Nama tidak boleh kosong!";
            return;
        }
        if (isNaN(choiceCount) || choiceCount <= 0) {
            errorMsg.textContent = "Jumlah pilihan harus angka positif!";
            return;
        }

        submitButton.disabled = true;
        createChoiceInputs(name, choiceCount);
    }

    function createChoiceInputs(name, count) {
        // Bersihkan tampilan sebelum menambahkan elemen baru
        formContainer.innerHTML = ""; 
    
        let title = document.createElement("h2");
        title.textContent = "Masukkan Pilihan";
    
        let nameText = document.createElement("p");
        nameText.textContent = "Nama: " + name;
    
        let choiceText = document.createElement("p");
        choiceText.innerHTML = "Jumlah Pilihan: <strong>" + count + "</strong>";
    
        formContainer.appendChild(title);
        formContainer.appendChild(nameText);
        formContainer.appendChild(choiceText);
    
        for (let i = 1; i <= count; i++) {
            let label = document.createElement("label");
            label.textContent = "Pilihan " + i + ": ";
    
            let input = document.createElement("input");
            input.type = "text";
            input.id = "choice" + i;
    
            formContainer.appendChild(label);
            formContainer.appendChild(input);
            formContainer.appendChild(document.createElement("br"));
        }
    
        let submitButton = document.createElement("button");
        submitButton.id = "submitChoices";
        submitButton.textContent = "OK";
        submitButton.addEventListener("click", function () {
            handleChoicesSubmit(name, count);
        });
    
        let errorMsg = document.createElement("p");
        errorMsg.id = "error-msg";
        errorMsg.style.color = "red";
    
        formContainer.appendChild(submitButton);
        formContainer.appendChild(errorMsg);
    }

    
    function handleChoicesSubmit(name, count) {
        let choices = [];
        const errorMsg = document.getElementById("error-msg");

        for (let i = 1; i <= count; i++) {
            let choice = document.getElementById("choice" + i).value.trim();
            if (!choice) {
                errorMsg.textContent = "Pilihan " + i + " tidak boleh kosong!";
                return;
            }
            choices.push(choice);
        }

        createSelectionUI(name, choices);
    }
   
    function createSelectionUI(name, choices) {
        formContainer.innerHTML = ""; // Bersihkan tampilan sebelum menambahkan elemen baru
    
        let title = document.createElement("h2");
        title.textContent = "Pilih Salah Satu";
    
        formContainer.appendChild(title);
    
        choices.forEach((choice, index) => {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "selection";
            radio.value = choice;
            radio.id = "choice" + index;
    
            let label = document.createElement("label");
            label.setAttribute("for", "choice" + index);
            label.textContent = choice;
    
            formContainer.appendChild(radio);
            formContainer.appendChild(label);
            formContainer.appendChild(document.createElement("br"));
        });
    
        let dropdown = document.createElement("select");
        dropdown.id = "dropdown";
    
        choices.forEach(choice => {
            let option = document.createElement("option");
            option.value = choice;
            option.textContent = choice;
            dropdown.appendChild(option);
        });
    
        formContainer.appendChild(dropdown);
        formContainer.appendChild(document.createElement("br"));
    
        let submitButton = document.createElement("button");
        submitButton.id = "submitSelection";
        submitButton.textContent = "OK";
        submitButton.addEventListener("click", function () {
            handleFinalSelection(name, choices);
        });
    
        let errorMsg = document.createElement("p");
        errorMsg.id = "error-msg";
    
        formContainer.appendChild(submitButton);
        formContainer.appendChild(errorMsg);
    }
    

    function disableSection(SectionId){
        const section = document.getElementById(SectionId);
        if (section){
            section.classList.add("disable");
            section
            .querySelectorAll("input, button, select, textarea")
            .forEach((el) => el.disable = true)
        }
    }

    function handleFinalSelection(name, choices) {
        let selectedOption = document.querySelector("input[name='selection']:checked");
        let dropdownSelection = document.getElementById("dropdown").value;
        const errorMsg = document.getElementById("error-msg");

        if (!selectedOption) {
            errorMsg.textContent = "Harap pilih salah satu opsi!";
            return;
        }

        let finalChoice = selectedOption.value || dropdownSelection;

        formContainer.innerHTML = "";
        let title = document.createElement("h2");
        title.textContent = "Hasil Akhir";

        let resultText = document.createElement("p");
        resultText.innerHTML = "Hallo, nama saya <strong>" + name + "</strong>, saya mempunyai sejumlah <strong>" + choices.length + "</strong> pilihan yaitu <strong>" + choices.join(", ") + "</strong>, dan saya memilih <strong>" + finalChoice + "</strong>.";

        formContainer.appendChild(title);
        formContainer.appendChild(resultText);
    }

    createInitialForm();
});