#!/usr/bin/env node

import yargs from 'yargs';
import { linkPackagesSource, linkPackagesTarget, unlinkPackagesTarget } from './lerna-linker';

yargs
  .command(
    'linkSource', 
    'Link the packages in the source repository',
    async function (argv) {
        await linkPackagesSource();
    })
  .command(
    'linkTarget', 
    'Consume previously linked packages in target repository', 
    async function (argv) {
        await linkPackagesTarget();
    })
  .command(
    'unlinkTarget', 
    'Remove all symlinks in target repository', 
    async function (argv) {
        await unlinkPackagesTarget();
    })
  .demandCommand()
  .help()
  .argv