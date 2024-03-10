# setup-premake

GitHub action to setup [Premake5][premake-link] on Linux, Windows and macOS.

# Usage

Just add the following lines to the `steps:` list in your GitHub Action YAML file:

```yaml
- uses: diamante0018/setup-premake@main
  with:
    version: "5.0.0-beta2"
```

By default, Premake5 is installed in `.premake` directory relative to the GitHub workspace.
You can optionally change it using the `path` input.

[premake-link]:     https://premake.github.io/
