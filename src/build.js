const fs = require("fs-extra");
const klawSync = require("klaw-sync");
const path = require("path");
const workflowData = require("./workflow");
const YAML = require("yaml");

const findStepByUses = (steps, uses) =>
	steps.find((step) => step.uses === uses);

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
	const manifestPath = `${appid}/${appid}.yml`;
	const imageTag = getTagFromManifest(manifestPath);
	jobs.container.image = `bilelmoussaoui/flatpak-github-actions:${imageTag}`;
	// Modify the step with 'uses: flathub/flatpak-github-action@v2'
	const flatpakBuilderStep = findStepByUses(
		jobs.steps,
		"flatpak/flatpak-github-actions/flatpak-builder@v6"
	);
	if (flatpakBuilderStep) {
		flatpakBuilderStep.with.bundle = `${appid}.flatpak`;
		flatpakBuilderStep.with["manifest-path"] = manifestPath;
		flatpakBuilderStep.with["cache-key"] = appName;
	}

	// Modify the step with 'uses: actions/upload-artifact@v3'
	const uploadArtifactStep = findStepByUses(
		jobs.steps,
		"actions/upload-artifact@v4"
	);
	if (uploadArtifactStep) {
		uploadArtifactStep.with.name = `${appid}.flatpak`;
		uploadArtifactStep.with.path = `${appid}.flatpak`;
	}

	return jobs;
}

const getTagFromManifest = (manifestPath) => {
	// 读取并解析这个 YAML 文件
	let manifestContent = fs.readFileSync(manifestPath, "utf8");
	let manifest = YAML.parse(manifestContent);
	// 用模式匹配,分析 manifest 中的 runtime 字段,拼接上版本号
	let type = "";
	switch (manifest.runtime) {
		case "org.freedesktop.Platform":
			type = "freedesktop";
	}
	let version = manifest["runtime-version"];
	return `${type}-${version}`;
};

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
	// YAML.scalarOptions.str.fold.lineWidth = 0;
	let workflowYamlStr = YAML.stringify(workflowMain);
	// 把他们写入文件

	fs.writeFileSync(workflowFileName, workflowYamlStr);
});
