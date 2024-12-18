export default class EmployeeService{

    static async update(id,object){

    }

    static async delete(id) {

    }

    static async get(id) {
        
    }

    static async getAll() {
        //fetch("http://localhost/employee/getall")

        new Promise(
            (accept,reject)=>
                accept([
                    { id: 1, name: "Bulma Garcia", active: true },
                    { id: 2, name: "Pepper Stark", active: true },
                    { id: 3, name: "Martini Silva", active: true },
                    { id: 4, name: "Sansa Stark", active: true },
                    { id: 5, name: "Roberto Silva", active: true },
                    { id: 6, name: "Rafaela Oliveira", active: true },        
                    { id: 7, name: "Ana Garcia", active: true },
                    { id: 8, name: "Caio Lacerda", active: true },       
                    { id: 9, name: "Lucas Oliveira", active: true },
                    { id: 10, name: "Tony Stark", active: false },
                    { id: 11, name: "Pepper Potts", active: false },
                ])
        )

    }

}
