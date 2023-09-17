const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

const toCapitalize = word => word[0].toUpperCase() + word.slice(1).toLowerCase();

class User{
    constructor(obj){
        Object.assign(this, obj);
    }

    render(){
        return `
            <div class="user-info">
                <div class="user-info-initials">
                    <img src="./images/users/${this.img}.png" alt="user">
                    <div>
                        <p>Name: <span class="bold">${this.name}</span></p>
                        <p>Age: <span class="bold">${this.age}</span></p>
                    </div>
                </div>
                <div class="user-role">
                    <img src="./images/roles/${this.role}.png" alt="${this.role}">
                    <p>${toCapitalize(this.role)}</p>
                </div>
            </div>
        `;
    }

    renderCourses(){
    }

    getGrade(value) {
		if (value < 20) {
			return gradation[20];
		} else if (value < 55) {
			return gradation[55];
		} else if (value < 85) {
			return gradation[85];
		} else {
			return gradation[100];
		}
	}
}

class Student extends User{
    constructor(obj){
        super(obj);
    }

    renderCourses(){
        if(this.courses){
            return this.courses
                .map(course =>{
                    let mark = this.getGrade(course.mark);
                    let title = course.title;
                    return `
                        <div class="course">
                            <p>${title} <span class="${mark} score">${mark}</span></p>
                        </div>
                    `;
                })
                .join(``);
        }else{
            return ``;
        }
    }
}

class Lector extends User{
    constructor(obj){
        super(obj);
    }

    renderCourses(){
        if(this.courses){
            return this.courses
                .map(course =>{
                    let studScore = this.getGrade(course.studScore);
                    let score = this.getGrade(course.score);
                    let title = course.title;
                    return `
                        <div class="course">
                            <p>Title: <span class="bold">${title}</span></p>
                            <p>Lector's score: <span class="${score} score">${score}</span></p>
                            <p>Average student's score: <span class="${studScore} score">${studScore}</span></p>
                        </div>
                    `;
                })
                .join(``);
        }else{
            return ``;
        }
    }
} 

class Admin extends User{
    constructor(obj){
        super(obj);
    }

    renderCourses(){
        if(this.courses){
            return this.courses
                .map(course =>{
                    let lector = course.lector;
                    let score = this.getGrade(course.score);
                    let title = course.title;
                    return `
                        <div class="course">
                            <p>Title: <span class="bold">${title}</span></p>
                            <p>Admin's score: <span class="${score} score">${score}</span></p>
                            <p>Lector: <span class="bold">${lector}</span></p>
                        </div>
                    `;
                })
                .join(``);
        }else{
            return ``;
        }
    }
}


const USERS_ROLES = {
    student: obj => new Student(obj),
    admin: obj => new Admin(obj),
    lector: obj => new Lector(obj),}


let userInfo = users
    .map(obj => {

        let userRole = obj.role;

        let user = USERS_ROLES[userRole] ? USERS_ROLES[userRole](obj) : new User(obj);

        return user;
    })
    .map(user => {
        document.write(`
        <div class="container">
            <div class="users">
                <div class="user">
                    ${user.render()}
                    <div class="courses">
                        ${user.renderCourses()}
                    </div>
                </div>
            </div>
        </div>
        `);
        console.log(user);
        return user;
    })
