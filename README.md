
## Lerna-linker

The lerna-linker tool provides an easy way to link local development versions of lerna monorepos without needing to publish the local development versions to NPM. This is particularly useful for local testing and development purposes.

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

## Limitation

This script can only be used to link two repository versions simultaneously. If a different version of the same repository is linked, any previous links for similarly named packages are lost and need to be rebuilt using this tool.
