const { Triangle, Circle, Square } = require('../shapes');

describe("Triangle Tests", () => {
    test("Rendder a triangle SVG with a green shape color", () => {
        const expectedSVG = '<polygon points="150, 18 244, 182 56, 182" fill="blue" />';
        const triangle = new Triangle('', '', 'blue');
        const actualSVG = triangle.render();
        expect(actualSVG).toEqual(expectedSVG);
    });
});