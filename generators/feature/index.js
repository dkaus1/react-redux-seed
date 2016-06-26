const util = require('../util');

module.exports = {
    description: 'Generate a Feature-level, React Component',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your Feature\'s name?',
            validate: function (value) {
                if ((/.+/).test(value)) {
                    return util.featureExists(value) ? 'This feature already exists' : true;
                }

                return 'name is required';
            },
            default: 'MyFeature'
        },
        {
            type: 'confirm',
            name: 'stateless',
            message: 'Make it a Stateless Functional Component?',
            default: true
        },
    ],
    actions: function (data) {
        var actions = [
            // index
            {
                type: 'add',
                path: '../src/{{dashCase name}}/index.js',
                templateFile: './component/index.hbs'
            },

            // test
            {
                type: 'add',
                path: '../src/{{dashCase name}}/{{dashCase name}}.test.jsx',
                templateFile: './component/test.hbs'
            },

            // css
            {
                type: 'add',
                path: '../src/{{dashCase name}}/{{dashCase name}}.css',
                templateFile: './component/css.hbs'
            },

            // store
            {
                type: 'add',
                path: '../src/{{dashCase name}}/{{dashCase name}}.store.js',
                templateFile: './feature/store.hbs'
            }

        ];

        if (data.stateless) {
            actions.push({
                type: 'add',
                path: '../src/{{dashCase name}}/{{dashCase name}}.jsx',
                templateFile: './component/function.hbs'
            });
        } else {
            actions.push({
                type: 'add',
                path: '../src/{{dashCase name}}/{{dashCase name}}.jsx',
                templateFile: './component/class.hbs'
            });
        }

        return actions;
    }
};
