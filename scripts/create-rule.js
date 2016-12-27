const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2)); // eslint-disable-line import/no-extraneous-dependencies
const ruleBoilerplateGenerator = require('./boilerplate/rule');
const testBoilerplateGenerator = require('./boilerplate/test');
const docBoilerplateGenerator = require('./boilerplate/doc');
const exec = require('child_process').exec;

const ruleName = argv._[0];
const author = argv.author || '$AUTHOR';
const description = argv.description || '$DESCRIPTION';

const rulePath = path.resolve(`src/rules/${ruleName}.js`);
const testPath = path.resolve(`__tests__/src/rules/${ruleName}-test.js`);
const docsPath = path.resolve(`docs/rules/${ruleName}.md`);

// Validate
if (!ruleName) {
  throw new Error('Rule name is required');
} else if (fs.existsSync(rulePath)) {
  throw new Error('Rule already exists!');
}

// Generate file boilerplate
const ruleBoilerplate = ruleBoilerplateGenerator(author, description);
const testBoilerplate = testBoilerplateGenerator(ruleName, author, description);
const docBoilerplate = docBoilerplateGenerator(ruleName);

// Create new files
fs.writeFileSync(rulePath, ruleBoilerplate);
fs.writeFileSync(testPath, testBoilerplate);
fs.writeFileSync(docsPath, docBoilerplate);

// Add the rule to the index
exec([
  './node_modules/jscodeshift/bin/jscodeshift.sh',
  './src/index.js',
  '-t ./scripts/addRuleToIndex.js',
  '-p',
  '--extensions js',
  '--parser flow',
  `--ruleName=${ruleName}`,
  `--rulePath=${rulePath}`,
  ].join(' '),
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
);
