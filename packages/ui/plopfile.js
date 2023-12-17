module.exports = function (plop) {
    // component generator
    plop.setGenerator('controller', {
        description: 'create new component logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'plop-templates/Template/Template.hbs'
        }, 
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
            templateFile: 'plop-templates/Template/Template.module.css'
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
            templateFile: 'plop-templates/Template/Template.stories.hbs'
        }],
    });
};