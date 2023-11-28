const inquire = require('require');
const fs = require('fs');

const { Triangle, Circle, Square } = require('./lib/shapes');

const questions = [
    {
        type: 'input',
        message: 'What shape would you like your logo to be?',
        name: 'userShape',
        choices: ['Triangle', 'Circle', 'Square'],
    },
    {
        type: 'input',
        message: 'What color do you want your shape to be?',
        name: 'userShapeColor',
        validate: (input) => {
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (regex.test(input)) {
                return true;
            } else throw "Incorrect color choice, must be hexacode."
        }
    },
    {
        type: 'input',
        message: 'What do you want for text in your logo? Must be no more than three characters.',
        name: 'userText',
        validate: (input) => {
            if (input.length <= 3) {
                return true;
            } else throw 'Incorrect input, must be no more than three characters.';
        },
    },
    {
        type: 'input',
        message: 'What color do you want the text to be?',
        name: 'userTextColor',
        validate: (input) => {
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (regex.test(input)) {
                return true;
            } else throw 'Incorrect color choice, must be hexacode.'; 
        },
    },
];

inquirer.prompt(questions).then(answers => {
    if (answers.userShape === "Triangle") {
        return new Triangle(answers.userText, answers.userTextColor, answers.userShapeColor);
    }
    if (answers.userShape === "Circle") {
        return new Circle(answers.userText, answers.userTextColor, answers.userShapeColor);
    }
    if (answers.userShape === 'Square') {
        return new Square(answers.userText, answers.userTextColor, answers.userShapeColor);
    }
}).then(shape => { const svgRender = `epicasino — Today at 5:51 PM
<svg version="1.1"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">

  ${shape.render()}

  ${shape.renderText()}

</svg>`;

fs.writeFile('./lib/svg/${shape.text}.svg', svgRender, (err) =>
{if (err) {
    console.log(error);
    } else console.log(`Generated ${shape.text}.svg`);
    });
});