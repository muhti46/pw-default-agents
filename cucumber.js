module.exports = {
  default: {
    require: ["step_definitions/**/*.ts", "support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "html:cucumber-report.html",
      "json:cucumber-report.json",
      "allure-cucumberjs/reporter",
    ],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
    timeout: 30000,
  },
};
