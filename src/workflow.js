const workflowMain = {
	name: "构建镜像",
	on: {
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
		image: "bilelmoussaoui/flatpak-github-actions:gnome-40",
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
			uses: "bilelmoussaoui/flatpak-github-actions/flatpak-builder@v4",
			with: {
				bundle: "com.netease.CloudMusic.flatpak",
				"manifest-path": "com.netease.CloudMusic/com.netease.CloudMusic.yml",
			},
		},
	],
};

module.exports = {
	workflowMain: workflowMain,
	buildJob: buildJob,
};
