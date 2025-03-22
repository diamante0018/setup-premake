const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const path = require("path")
const fs = require("fs");

async function main() {
    const version = core.getInput('version', { required: true })
    const user_path = core.getInput('path', { required: false })

    if (user_path[0] == '/' || user_path[0] == '~') {
        throw new Error("Path must be relative to the workspace")
    }

    const path_prefix = "https://github.com/premake/premake-core/releases/download/" + "v" + version + "/premake-" + version
    const premake_path = path.join(process.env.GITHUB_WORKSPACE, user_path)
    if (process.platform == "win32") {
        const premake = await tc.downloadTool(path_prefix + "-windows.zip")
        await tc.extractZip(premake, premake_path)
    }
    else if (process.platform == "darwin") {
        const premake = await tc.downloadTool(path_prefix + "-macosx.tar.gz")
        await tc.extractTar(premake, premake_path)
    }
    else {
        const premake = await tc.downloadTool(path_prefix + "-linux.tar.gz")
        await tc.extractTar(premake, premake_path)

        const premake_exec_path = path.join(premake_path, "premake5");
        fs.chmodSync(premake_exec_path, "755");
    }
    core.addPath(premake_path)
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
