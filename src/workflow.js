const workflowMain = {
	name: "构建镜像",
	on: {
		workflow_dispatch: {},
		push: {
			paths: [
				// 放置扫描目录
			],
		},
	},
	jobs: {},
};
const buildJob = {
	"runs-on": "ubuntu-latest",
	name: "test-build-cloudmusic",
	container: {
		image: "bilelmoussaoui/flatpak-github-actions:freesektop-24.08",
		options: "--privileged",
	},
	steps: [
		{
			name: "检出代码",
			uses: "actions/checkout@v2",
			with: {
				submodules: "recursive",
			},
		},
		{
			name: "构建 Flatpak",
			uses: "flatpak/flatpak-github-actions/flatpak-builder@v6",
			with: {
				bundle: "com.netease.CloudMusic.flatpak",
				"manifest-path": "com.netease.CloudMusic/com.netease.CloudMusic.yml",
				"cache-key": "cloudmusic",
			},
		},
		// {
		// 	name: "上传 Artifact",
		// 	uses: "actions/upload-artifact@v4",
		// 	with: {
		// 		name: "com.netease.CloudMusic.flatpak",
		// 		path: "com.netease.CloudMusic.flatpak",
		// 		"compression-level": 0,
		// 	},
		// },
	],
};

module.exports = {
	workflowMain: workflowMain,
	buildJob: buildJob,
};
