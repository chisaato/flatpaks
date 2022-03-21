const fs = require("fs-extra");
const klawSync = require("klaw-sync");
const path = require("path");
const workflowData = require("./workflow");
const YAML = require("yaml");

function buildWorkflowMain(appid) {
	let workflowMain = Object.assign({}, workflowData.workflowMain);
	// 清空 jobs
	workflowMain.jobs = {};
	workflowMain.name = `构建 ${appid}`;
	workflowMain.on.push.paths = [];
	// 一个是主要清单目录
	workflowMain.on.push.paths.push(`${appid}/*`);
	// 还有一个是位于 .github 中的 CI 配置
	let appName = appid.split(".").slice(-1)[0].toLowerCase();
	workflowMain.on.push.paths.push(`.github/workflows/${appName}.yml`);
	return workflowMain;
}

function buildJob(appid) {
	let jobs = Object.assign({}, workflowData.buildJob);
	// 用 . 分隔,然后去最后一个的小写
	let appName = appid.split(".").slice(-1)[0].toLowerCase();
	jobs.name = `test-build-${appName}`;
	jobs.steps[1].with.bundle = `${appid}.flatpak`;
	jobs.steps[1].with["manifest-path"] = `${appid}/${appid}.yml`;
	return jobs;
}

let configJsonStr = fs
	.readFileSync(path.join(path.dirname(__filename), "config.json"))
	.toString();
let configJson = JSON.parse(configJsonStr);
configJson.paths.forEach((path) => {
	// 取路径名字作为 job 名字后缀
	let appid = path.path;
	// console.log(JSON.stringify(buildWorkflowMain(appid)));
	let workflowMain = buildWorkflowMain(appid);
	let jobs = buildJob(appid);
	workflowMain.jobs[jobs.name] = jobs;
	// console.log(YAML.stringify(workflowMain));
	let appName = appid.split(".").slice(-1)[0].toLowerCase();
	let workflowFileName = `.github/workflows/${appName}.yml`;
	// 序列化
	YAML.scalarOptions.str.fold.lineWidth = 0;
	let workflowYamlStr = YAML.stringify(workflowMain);
	// 把他们写入文件

	fs.writeFileSync(workflowFileName, workflowYamlStr);
});
