// @ts-check
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */

module.exports = async ({ github, context, core }) => {
	const actionRuns = await github.request(
		`GET /repos/{owner}/{repo}/actions/runs`,
		{
			status: "completed",
			repo: context.repo.repo,
			owner: context.repo.owner,
			per_page: 100,
		}
	);
	actionRuns.data.workflow_runs.forEach(async (run) => {
		// 判断 version.updated_at 距离现在是否超过 30 天
		const now = new Date();
		const updatedAt = new Date(run.created_at);
		const diff = now.getTime() - updatedAt.getTime();
		const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
		if (diffDays < 30) {
			console.log(`跳过 ${run.id}，因为 ${diffDays} 天前更新的`);
			return;
		}
		console.log(`删除 Action 运行 ${run.id}`);
		const response = await github.request(
			`DELETE /repos/{owner}/{repo}/actions/runs/{run_id}`,
			{
				run_id: run.id,
				repo: context.repo.repo,
				owner: context.repo.owner,
			}
		);
		console.log(`删除 ${run.id} 的结果: ${response.status}`);
	});
};
