<!-- A simple tool for linking a local development version of Comunica to another local project, like comunica-feature-link-traversal, without publishing either development version to NPM.

Usage:

In the directory of the local development version of base comunica:

`lerna-linker linkSource`

Then, in the directory of your local project that depends on Comunica, run:

`lerna-linker linkTarget`

In case you want to un-link your development version of Comunica from your project, use in your project's directory:

`lerna-linker unlinkTarget ` -->


The lerna-linker tool provides an easy way to link a local development version of [Comunica](https://github.com/comunica/comunica) to another local project (such as [comunica-feature-link-traversal](https://github.com/comunica/comunica-feature-link-traversal)) without the need to publish either development version to NPM. This is particularly useful for testing and development purposes.
### Usage

1. Link the Source

    In the directory of your local development version of the base Comunica project, run:

    ```bash
    lerna-linker linkSource
    ```

2. Link the Target

    In the directory of your local project that depends on Comunica, run:

    ```bash
    lerna-linker linkTarget
    ```

3. Unlink the Target

    If you need to unlink your development version of Comunica from your project, run the following command in your project's directory:

    ```bash
    lerna-linker unlinkTarget
    ```

This tool simplifies the process of linking and unlinking local development versions of Comunica and its dependent projects, enhancing your development workflow.