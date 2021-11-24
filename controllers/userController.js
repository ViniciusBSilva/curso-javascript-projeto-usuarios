class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }   // constructor (formId, tableId) 

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let values = this.getValues();

            this.getPhoto().then(
                (content) => {

                    values.photo = content;

                    this.addLine(values);

                },
                (e) => {
                    console.error(e)
                }

            );

        });

    }   // onSubmit()

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {

                reject(e);

            };

            fileReader.readAsDataURL(file);

        });

    }   // getPhoto()


    getValues() {

        let user = {};

        [...this.formEl.elements].forEach((field, index) => {

            if (field.name === "gender") {

                user[field.name] ? (field.checked) : field.value;

            } else {

                user[field.name] = field.value;

            }

        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }   // getValues()

    addLine(dataUser) {

        this.tableEl.innerHTML = `
            <tr>
                <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;

    }   // addLine(dataUser)


}   // class UserController 